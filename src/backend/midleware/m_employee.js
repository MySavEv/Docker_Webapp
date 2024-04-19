const Message = require('../util/message')

const Employee = require('../database/crud/Employee')
const Payment = require('../database/crud/Payment')
const Order = require('../database/crud/Order')

const JWTClass = require('../util/jwt')

async function checkEmployeeID(req,res,next) {
    const { employeeID } = req.body;
    if(employeeID){
        Employee.findByID(employeeID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','EmployeeID is not Valid'))
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

async function checkPaymentID(req,res,next) {
    const { paymentID } = req.body;
    if(paymentID){
        Payment.findByPaymentID(paymentID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','paymentID is not Valid'))
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

async function checkOrderID(req,res,next) {
    const { orderID } = req.body;
    if(orderID){
        Payment.findByOrderID(orderID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','orderID is not Valid'))
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

async function checkStockID(req,res,next) {
    const { orderID } = req.body;
    if(orderID){
        Payment.findByOrderID(orderID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','orderID is not Valid'))
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

async function verifyTokenEm(req,res,next) {
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        try {
            let result = JWTClass.verifyToken(token);
            if(result['type'] != 'employee')
                throw new Error('Authen Fail Require Type Emploee')
            req.body['employeeID'] = result.EmployeeID;
            next()
        } catch (error) {
            res.status(400);
            res.json(new Message('Fail',error.message))
        }
    }else{
        res.status(400);
        res.json(new Message('Fail','Authen Fail'))
    }
}

module.exports = {checkEmployeeID,verifyTokenEm,checkPaymentID,checkOrderID}