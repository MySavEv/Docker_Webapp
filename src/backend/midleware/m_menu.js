const Message = require('../util/message')

const Menu = require('../database/crud/Menu')
const MenuIngredeint = require('../database/crud/Menu_Ingredeint')
const StockIngredient = require('../database/crud/Stock_Ingredient')

async function checkMenuID(req,res,next) {
    const {menus} = req.body;
    if(menus && !Array.isArray(menus)){
        Menu.findByID(menus)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','couponID is not Valid'))
                }
                else
                {
                    next()
                }
            })
    }else if(Array.isArray(menus)){
        let list = []
        for(i in menus){
            await Menu.findByMenuID(menus[i])
                .then(result=>{
                    list.push(result[0])
                })
        }
        if(list.includes(undefined)){
            res.status(400);
            res.json(new Message('Fail','some couponID is not Valid'))
        }else{
            next()
        }
    }else{
        next()
    }
}

async function checkMenuIngredientID(req,res,next) {
    const {Ingredients} = req.body;
    if(Ingredients && !Array.isArray(Ingredients)){
        MenuIngredeint.findByIngredientID(Ingredients)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','couponID is not Valid'))
                }
                else
                {
                    next()
                }
            })
    }else if(Array.isArray(Ingredients)){
        let list = []
        for(i in Ingredients){
            await MenuIngredeint.findByIngredientID(Ingredients[i])
                .then(result=>{
                    list.push(result[0])
                })
        }
        if(list.includes(undefined)){
            res.status(400);
            res.json(new Message('Fail','some couponID is not Valid'))
        }else{
            next()
        }
    }else{
        next()
    }
}



module.exports = {checkMenuID,checkMenuIngredientID}