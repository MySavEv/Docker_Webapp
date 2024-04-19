const Message = require('../util/message')

const Employee = require('../database/crud/Employee')
const Payment = require('../database/crud/Payment')
const Order = require('../database/crud/Order')
const StockIngredient = require('../database/crud/Stock_Ingredient')
const Ingredient = require('../database/crud/Ingredient')


const JWTClass = require('../util/jwt')

async function checkIngredientID(req,res,next) {
    const { ingredientID } = req.body;
    if(ingredientID){
        Ingredient.findByID(ingredientID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','ingredientID is not Valid'))
                }
                else
                {
                    next()
                }
            })
    }else{
        next()
    }
}

async function checkStockId(req,res,next) {
    const { stockID } = req.body;
    if(stockID){
        StockIngredient.findByStockID(stockID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','stockID is not Valid'))
                }
                else
                {
                    next()
                }
            })
    }else{
        next()
    }
}

module.exports = {checkIngredientID,checkStockId}