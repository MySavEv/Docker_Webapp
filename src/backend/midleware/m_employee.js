const Message = require('../util/message')

const Employee = require('../database/crud/Employee')

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

async function verifyTokenEm(req,res,next) {
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        try {
            let result = JWTClass.verifyToken(token);
            if(result['type'] != 'employee')
                throw new Error('Authen Fail Require Type Emploee')
            req.body['employeeID'] = result.EmployeeID;
            console.log(req.body);
        } catch (error) {
            res.status(400);
            res.json(new Message('Fail',error.message))
        }
    }else{
        res.status(400);
        res.json(new Message('Fail','Authen Fail'))
    }
}

module.exports = {checkEmployeeID,verifyTokenEm}