const Message = require('../util/message')

const Member = require('../database/crud/Member')
const Coupon = require('../database/crud/Coupon')
const JWTClass = require('../util/jwt')


function checkUsername(req,res,next){
    const { username , password } = req.body;
    if(!(username && password)){
        res.send().json()
    }
    next()
}

function checkMemberID(req,res,next) {
    const {memberID} = req.body;
    if(memberID){
        Member.findByID(memberID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','MemberID is not Valid'))
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

function checkCouponID(req,res,next) {
    const {couponID} = req.body;
    if(couponID){
        Coupon.findByID(couponID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','couponID is not Valid'))
                }
                else
                {
                    next()
                }
            })
            .catch(err=>{
                res.status(500);
                res.json(new Message('Fail','Plase Check DdataBase Server'))
            })
    }else{
        next()
    }
}

async function verifyTokenMem(req,res,next) {
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        try {
            let result = JWTClass.verifyToken(token);
            if(result['type'] != 'member')
                throw new Error('Authen Fail : Require Type Member')
            req.body['memberID'] = result.memberID;
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

module.exports = {checkUsername,checkMemberID,checkCouponID,verifyTokenMem}