const Message = require('../util/message')

const Member = require('../database/crud/Member')
const Coupon = require('../database/crud/Coupon')

function checkUsername(req,res,next){
    const { username , password } = req.body;
    if(!(username && password)){
        res.send().json()
    }
    next()
}

function checkMembetID(req,res,next) {
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
    }else{
        next()
    }
}

module.exports = {checkUsername,checkMembetID,checkCouponID}