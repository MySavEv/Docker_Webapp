const pool = require('../database/connect');
const Menu = require('../database/crud/Menu');
const Message = require('../util/message');
const Employee = require('../database/crud/Employee');
const MenuIngredient = require('../database/crud/Menu_Ingredeint');
const StockIngredient = require('../database/crud/Stock_Ingredient');
const StockManagement = require('../database/crud/Stock_Management');
const Ingredient = require('../database/crud/Ingredient');


const { verifyTokenManager } = require('../midleware/m_manager');
const { checkMenuIngredientID } = require('../midleware/m_menu');

const { Router } = require('express');
const { checkStockId } = require('../midleware/m_ingredient');
const router = Router();


router.post('/manager/stock/list', verifyTokenManager,(req, res) => {
    StockIngredient.findAll()
        .then(r=>{
            res.status(200);
            res.json(new Message('Success','List of Stock',r));
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to List Stock'))
        })
});

router.post('/manager/stock/history', verifyTokenManager,(req, res) => {
    StockManagement.findAll()
        .then(r=>{
            res.status(200);
            res.json(new Message('Success','List of Stock',r));
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to List Stock'))
        })
});

router.post('/manager/ingredient/list', verifyTokenManager,(req, res) => {
    Ingredient.findAll()
        .then(r=>{
            res.status(200);
            res.json(new Message('Success','List of Stock',r));
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to List ingredient'))
        })
});

router.post('/manager/ingredient/add', verifyTokenManager,(req, res) => {
    const {name, unit, quantity, pic} = req.body;

    Ingredient.create(name, unit, quantity, pic)
    .then(r=>{
        res.status(200);
        res.json(new Message('Success','Add ingredient',r));
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','Fail to Add ingredient',err))
    })

});

router.post('/manager/ingredient/drop', verifyTokenManager,(req, res) => {
    const {ingredientID} = req.body;

    Ingredient.delete(ingredientID)
    .then(r=>{
        res.status(200);
        res.json(new Message('Success','Drop ingredient',r));
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','Fail to Drop ingredient',err))
    })

});

router.post('/manager/ingredient/edit', verifyTokenManager,(req, res) => {
    const {ingredientID, name, unit, quantity, pic} = req.body;

    Ingredient.update(ingredientID, name, unit, quantity, pic)
    .then(r=>{
        res.status(200);
        res.json(new Message('Success','edit ingredient',r));
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','Fail to edit Stock',err))
    })

});



router.post('/manager/stock/add', verifyTokenManager,(req, res) => {
    const { employeeID,ingredientID ,stock_quantity,expire_date,comment} = req.body;
    if(!(ingredientID && stock_quantity && expire_date)){
        res.status(400);
        res.json(new Message('Fail','Fail to Add Stock Data Valid'))
    }else{
        StockIngredient.create(ingredientID,stock_quantity,'Available',new Date(),expire_date)
        .then(result=>{
            let stockid = result.insertId;
            StockManagement.create(employeeID,stockid,'In',stock_quantity,comment,new Date().toISOString().slice(0, 19).replace('T', ' '))
                .then(result=>{
                    res.status(200);
                    res.json(new Message('Success','Add Stock Successful'));
                })
                .catch(async err=>{
                    try {
                        await StockIngredient.delete(stockid)
                    } catch (error) {
                        
                    }
                    res.status(400);
                    res.json(new Message('Fail','Fail to Add StockManagement',err))
                })
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to Add Stock',err))
        })
    }

    
});

router.post('/manager/stock/drop', verifyTokenManager,checkStockId,(req, res) => {
    const { employeeID ,stockID,stock_quantity,comment} = req.body;
    pool.query(`UPDATE Stock_Ingredient
                SET stock_quantity = null, status = null , expire_date = null
                WHERE stockID = ?`,[stockID],(err,result)=>{
                    if(err){
                        res.status(400);
                        res.json(new Message('Fail',err.message))
                    }else{
                        StockManagement.create(employeeID,stockID,'Drop',stock_quantity,comment,new Date().toISOString().slice(0, 19).replace('T', ' '))
                            .then(result=>{
                                res.status(200);
                                res.json(new Message('Success','Add Stock Successful'));
                            })
                            .catch(err=>{
                                res.status(400);
                                res.json(new Message('Fail','Fail to Add Stock'))
                            })
                    }
                })
});


router.post('/manager/menu/add',verifyTokenManager,checkMenuIngredientID,(req,res)=>{
    const { name, description, category, price, pic, status ,ingredients} = req.body;
    if(!ingredients){
        res.status(400);
        res.json(new Message('Fail','Fail to Add Menu require ingredientid'))
        return
    }

    Menu.create(name, description, category, price, pic, status)
        .then(async result=>{
            if(Array.isArray(ingredients)){
                for(i in ingredients){
                    await MenuIngredient.create(result.insertId,ingredients[i][0],ingredients[i][1])
                }
            }else{
                MenuIngredient.create(result.insertId,ingredients[0],ingredients[1])
            }

            res.status(200);
            res.json(new Message('Succss','Add Menu'))
            
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to Edit Menu'))
        })
})

router.post('/manager/menu/edit',verifyTokenManager,(req,res)=>{
    const { menuID, name, description, category, price, pic, status} = req.body;
    Menu.update(menuID, name, description, category, price, pic, status)
        .then(result=>{
            res.status(200);
            res.json(new Message('Succss','Edit Menu'))
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to Edit Menu'))
        })
})

router.post('/manager/employee/list',verifyTokenManager,(req,res)=>{
    const { menuID, name, description, category, price, pic, status } = req.body;
    Employee.findAll()
        .then(result=>{
            res.status(200);
            res.json(new Message('Success','Employee List',result))
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Fail to List Employee'))
        })
})

module.exports = router
