const Message = require('../util/message')

const JWTClass = require('../util/jwt')
const Menu = require('../database/crud/Menu')

async function verifyTokenManager(req,res,next) {
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        try {
            let result = JWTClass.verifyToken(token);
            if(result['type'] != 'employee' && result.managerflag)
                throw new Error('Authen Fail Require Type Emploee & Manager')
            if(!result.managerflag){
                res.status(400);
                res.json(new Message('Fail','Authen Fail Not Manager'))
            }
            else
            {
                req.body['employeeID'] = result.employeeID;
                next()
            }
        } catch (error) {
            res.status(400);
            res.json(new Message('Fail',error.message))
        }
    }else{
        res.status(400);
        res.json(new Message('Fail','Authen Fail'))
    }
}

module.exports = {verifyTokenManager}