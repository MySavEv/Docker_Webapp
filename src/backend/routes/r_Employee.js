const { Router } = require('express')
const router = require('./r_Auth')
const pool = require('../database/connect');

const Message = require('../util/message')
const Employee = require('../database/crud/Employee')
const Menu = require('../database/crud/Menu')
const Order = require('../database/crud/Order')
const OrderDetail = require('../database/crud/OrderDetail')
const Coupon = require('../database/crud/Coupon')
const Mempon = require('../database/crud/Mempon')
const Customer = require('../database/crud/Customer')
const Member = require('../database/crud/Member')
const {checkMembetID,checkCouponID} = require('../midleware/m_member')
const {checkMenuID} = require('../midleware/m_menu')
const {checkEmployeeID} = require('../midleware/m_employee')


router.post('/employee/addorder', checkMembetID , checkCouponID , checkMenuID , checkEmployeeID ,async (req, res) => {
    const {employeeID, couponID, datetime, menus , memberID} = req.body
    if(memberID && employeeID){
        Customer.create(memberID,'Member')
            .then(async result=>{
                let customerID = await result.insertId;
                Order.create(customerID,employeeID,couponID,datetime,0,0,0,'Wait Payment')
                    .then(async result=>{
                        let orderId = await result.insertId;
                        var subprice = 0;
                        var discount = 0;
                        for(i in menus){
                            await Menu.findByMenuID(menus[i])
                                .then(result=>{
                                    let menu = result[0]
                                    OrderDetail.create(menu.menuID,orderId,1,menu.price)
                                    subprice += menu.price;
                                })
                        }
                        if(couponID){
                            await Coupon.findByID(couponID)
                                .then(result=>{
                                    let type = result[0].type;
                                    if(type == 1){
                                        discount = result[0].discount;
                                    }else{
                                        discount = (result[0].discount * subprice) / 100.0;
                                    }
                                })
                        }
                        let total_price = await subprice-discount < 0? 0:subprice-discount;
                        Order.update(orderId,{subtotal:subprice,discount:discount,total_price:total_price})
                            .then(result=>{
                                console.log(orderId);
                            })
                            .catch(err=>{
                                res.status(400);
                                res.json(new Message('Fail',err))
                            })
                        res.status(200);
                        res.json(new Message('Success','Add Order Success'))
                    })
                    .catch(err=>{
                        Customer.delete(customerID)
                        res.status(400);
                        res.json(new Message('Fail',err))
                    })
            })
            .catch(err=>{
                res.status(400);
                res.json(new Message('Fail',err))
            })
    }
    
});


module.exports = router