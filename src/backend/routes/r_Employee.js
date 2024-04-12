const { Router } = require('express')
const router = require('./r_Auth')
const pool = require('../database/connect');

const Message = require('../util/message')
const Employee = require('../database/crud/Employee')
const Menu = require('../database/crud/Menu')
const Order = require('../database/crud/Order')
const OrderDetail = require('../database/crud/OrderDetail')

// men = [1,2]

router.post('/employee/addorder', async (req, res) => {
    const {customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status,menus} = req.body    
    Order.create(customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status)
        .then(result=>{
            let orderID = result.insertId
            for(i in menus){
                Menu.findByMenuID(menus[i])
                    .then(result=>{
                        let mid = result[0].menuID
                        let price = result[0].price
                        OrderDetail.create(mid,orderID,1,price)
                    })
                    .catch(err=>{
                        res.status(400);
                        res.json(new Message('Fail',err))
                    })
            }

            res.status(200);
            res.json(new Message('Success','Complete'))
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail',err))
        })
});


module.exports = router