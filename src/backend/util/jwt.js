var jwt = require('jsonwebtoken');
const config = require('./config')

class JWTClass{

    static genToken(data){
        return jwt.sign(data,config.jwt_privateKey, { expiresIn: 60 });
    }

    static verifyToken(token){
        try {
            return jwt.verify(token, config.jwt_privateKey)
        } catch (error) {
            throw error
        }
    }
}

module.exports = JWTClass