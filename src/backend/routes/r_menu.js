const { Router } = require('express')
const router = Router();
const pool = require('../database/connect');

const Menu = require('../database/crud/Menu')
const MenuIngredeint = require('../database/crud/Menu_Ingredeint')

const Message = require('../util/message')

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

module.exports = router