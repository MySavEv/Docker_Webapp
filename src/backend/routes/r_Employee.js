const { Router } = require('express')
const router = Router();
const pool = require('../database/connect');

const Message = require('../util/message')
const Employee = require('../database/crud/Employee')
const Payment = require('../database/crud/Payment')
const Menu = require('../database/crud/Menu')
const Order = require('../database/crud/Order')
const OrderDetail = require('../database/crud/OrderDetail')
const Coupon = require('../database/crud/Coupon')
const Mempon = require('../database/crud/Mempon')
const Customer = require('../database/crud/Customer')
const Member = require('../database/crud/Member')
const WithdrawHistory = require('../database/crud/Withdraw_History')
const StockIngredient = require('../database/crud/Stock_Ingredient')
const Ingredient = require('../database/crud/Ingredient')


const {checkMemberID,checkCouponID} = require('../midleware/m_member')
const {checkMenuID, checkMenuIngredientID} = require('../midleware/m_menu')
const {checkEmployeeID,verifyTokenEm,checkPaymentID,checkOrderID} = require('../midleware/m_employee');
const {checkIngredientID,checkStockId} = require('../midleware/m_ingredient');
const MemPon = require('../database/crud/Mempon');

//Employees order menus for customers.
router.post('/employee/addorder',verifyTokenEm, checkCouponID , checkMenuID , checkMemberID,async (req, res) => {
    const {employeeID, couponID, menus , memberID , method} = req.body
    if((memberID) && (employeeID)){
        const nowdate = new Date().toISOString().slice(0, 19).replace('T', ' ')
        Customer.create(memberID,'Member')
            .then(async result=>{
                let customerID = await result.insertId;
                Order.create(customerID,employeeID,couponID,nowdate,0,0,0,'Wait Payment')
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
                            console.log(listpon);
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


                        Order.update(orderId,{subtotal:subprice,discount:discount,total_price:total_price})
                            .then(result=>{
                                Payment.create(orderId,method,total_price,'pending',nowdate)
                                    .then(result=>{
                                        res.status(200);
                                        res.json(new Message('Success','Add Order Success'))
                                    })
                                    .catch(err=>{
                                        res.status(400);
                                        res.json(new Message('Fail',err))
                                    })
                            })
                            .catch(err=>{
                                res.status(400);
                                res.json(new Message('Fail',err))
                            })
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
    }else{
        const nowdate = new Date().toISOString().slice(0, 19).replace('T', ' ')
        Customer.create(null,'Guest')
            .then(async result=>{
                let customerID = await result.insertId;
                Order.create(customerID,employeeID,couponID,nowdate,0,0,0,'Wait Payment')
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
                        let total_price = subprice
                        

                        Order.update(orderId,{subtotal:subprice,discount:discount,total_price:total_price})
                            .then(result=>{
                                Payment.create(orderId,method,total_price,'pending',nowdate)
                                    .then(result=>{
                                        res.status(200);
                                        res.json(new Message('Success','Add Order Success'))
                                    })
                                    .catch(err=>{
                                        res.status(400);
                                        res.json(new Message('Fail',err))
                                    })
                            })
                            .catch(err=>{
                                res.status(400);
                                res.json(new Message('Fail',err))
                            })
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

// After Confirm Payment will Add Member points 10% of total_price from Order
router.post('/employee/payment/confirm',verifyTokenEm,checkOrderID,(req,res)=>{
    try {
        const { orderID } = req.body
        const sql = `UPDATE Member AS M
                    INNER JOIN Customer AS C ON M.memberID = C.memberID
                    INNER JOIN \`Order\` AS O ON C.customerID = O.customerID
                    INNER JOIN Payment AS P ON P.orderID = O.orderID
                    SET M.points = M.points + (O.total_price * 0.1), P.status = 'complete', P.successdatetime = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',O.status = 'success'
                    WHERE O.orderID = ? AND P.status != 'success'` ;

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

router.post('/employee/profile',verifyTokenEm, (req, res) => {
    const { employeeID } = req.body;
    Employee.findByID(employeeID)
        .then(result => {
            res.status(200);
            res.json(new Message('Success', 'Employee Profile',result));
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(new Message("Fail", err));
        })
});

// After Confirm Payment will Add Member points 10% of total_price from Order
router.post('/employee/withdraw',verifyTokenEm,checkIngredientID,checkStockId,(req,res)=>{
    const { employeeID ,ingredientID ,comment} = req.body;
    
    const sql = `SELECT * 
                FROM Ingredient AS I
                INNER JOIN Stock_Ingredient AS S ON I.ingredientID = S.ingredientID
                WHERE I.ingredientID = ? AND S.stock_quantity > 0
                ORDER by expire_date ASC`
    pool.query(sql,[ingredientID],(err,result)=>{
        if(err){
            res.status(400);
            res.json(new Message('Fail',err.message));
            return;
        }

        if(result.length == 0){
            res.status(400);
            res.json(new Message('Fail','Not Have Stock'));
            return
        }

        let wd = result[0];

        const sql2 = `UPDATE Ingredient AS I
                    SET I.quantity = I.quantity + ?
                    WHERE ingredientID = ?`
        pool.query(sql2,[wd.stock_quantity,ingredientID],(err,result)=>{
            if(err){
                res.status(400);
                res.json(new Message('Fail',err.message));
            }else{
                WithdrawHistory.create(employeeID,ingredientID,wd.stockID,comment,new Date().toISOString().slice(0, 19).replace('T', ' '))
                    .then(result=>{
                        pool.query(`UPDATE Stock_Ingredient 
                                    SET stock_quantity = null
                                    WHERE stockID = ?`,[wd.stockID],(err,result)=>{
                                        if(err){
                                            res.status(400);
                                            res.json(new Message('Fail',err.message));
                                        }else{
                                            res.status(200);
                                            res.json(new Message('Success','Withdraw Successful'));
                                        }
                                    })
                    })
                    .catch(err=>{
                        res.status(400);
                        res.json(new Message('Fail',err.message));
                    })
                
                
            }
        })
    })
})

module.exports = router