const { Router } = require('express')
const router = Router();
const pool = require('../database/connect');

const Menu = require('../database/crud/Menu')
const Coupon = require('../database/crud/Coupon')
const MenuIngredeint = require('../database/crud/Menu_Ingredeint')

const Message = require('../util/message');
const Ingredient = require('../database/crud/Ingredient');

//see menu
router.get('/menu', (req, res) => {
    Menu.findAll()
    .then(async result=>{
        for(i in result){
            result[i].ingredeints = await MenuIngredeint.findByMenuID(result[i].menuID)
        }
        res.status(200);
        res.json(new Message('Success','List Menu',result))
    })
})

router.get('/coupon', (req, res) => {
    Coupon.findAll()
    .then(async result=>{
        res.status(200);
        res.json(new Message('Success','List Coupon',result))
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','SomeThing Err'))
    })
})

router.get('/ingredient', (req, res) => {
    Ingredient.findAll()
    .then(async result=>{
        res.status(200);
        res.json(new Message('Success','List Ingredient',result))
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','SomeThing Err'))
    })
})

router.get('/ingredient/info', (req, res) => {
    const {ingredientID} = req.query;
    Ingredient.findByID(ingredientID)
    .then(async result=>{
        res.status(200);
        res.json(new Message('Success','Info Ingredient',result[0]))
    })
    .catch(err=>{
        res.status(400);
        res.json(new Message('Fail','SomeThing Err'))
    })
})
module.exports = router