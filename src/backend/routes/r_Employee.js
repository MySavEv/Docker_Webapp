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

const {checkMemberID,checkCouponID} = require('../midleware/m_member')
const {checkMenuID} = require('../midleware/m_menu')
const {checkEmployeeID,verifyTokenEm,checkPaymentID,checkOrderID} = require('../midleware/m_employee');
const MemPon = require('../database/crud/Mempon');

//Employees order menus for customers.
router.post('/employee/addorder',verifyTokenEm, checkCouponID , checkMenuID , checkMemberID, checkEmployeeID ,async (req, res) => {
    const {employeeID, couponID, menus , memberID} = req.body
    if(memberID && employeeID){
        Customer.create(memberID,'Member')
            .then(async result=>{
                let customerID = await result.insertId;
                Order.create(customerID,employeeID,couponID,new Date().toISOString().slice(0, 19).replace('T', ' '),0,0,0,'Wait Payment')
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
                            const listpon = await MemPon.findByMemberCouponID(memberID,couponID)
                            if(listpon.length != 0){
                                await Coupon.findByID(couponID)
                                .then(result=>{
                                    let type = result[0].type;
                                    if(type == 1){
                                        discount = result[0].discount;
                                    }else{
                                        discount = (result[0].discount * subprice) / 100.0;
                                    }
                                })
                            }else{
                                res.status(400);
                                res.json(new Message('Fail','Members do not have coupons.'))
                                return
                            }
                        }
                        let total_price = await subprice-discount < 0? 0:subprice-discount;
                        console.log(total_price);
                        Order.update(orderId,{subtotal:subprice,discount:discount,total_price:total_price})
                            .then(result=>{
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

//List of Menu 
router.get('/employee/menus',(req,res)=>{
    Menu.findAll()
        .then(result=>{
            res.status(200);
            res.json(new Message('Success','List of Menu',result))
        })
        .catch(err=>{
            res.status(400);
            res.json(new Message('Fail','Can\'t find List Menu',err))
        })
})

// After Confirm Payment will Add Member points 10% of total_price from Order
router.post('/employee/payment/confirm',verifyTokenEm,checkOrderID,(req,res)=>{
    try {
        const { orderID } = req.body
        const sql = `UPDATE Member AS M
                    INNER JOIN Customer AS C ON M.memberID = C.memberID
                    INNER JOIN \`Order\` AS O ON C.customerID = O.customerID
                    INNER JOIN Payment AS P ON P.orderID = O.orderID
                    SET M.points = M.points + (O.total_price * 0.1), P.status = 'complete', P.successdatetime = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                    WHERE O.orderID = ? AND P.status != 'complete'` ;

        pool.query(sql,[orderID],(err,result)=>{
            if(err){
                res.status(400);
                res.json(new Message('Fail','Payment failed',err));
            }
            else
            {
                
                res.status(200);
                res.json(new Message('Success','Confirm Payment Successful'))
            }
        })
    } catch (error) {
        res.status(500);
        res.json(new Error('Fail','Server Error',err))
    }
})


module.exports = router