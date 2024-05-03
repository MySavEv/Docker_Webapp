const pool = require('../database/connect');
const Menu = require('../database/crud/Menu')
const Member = require('../database/crud/Member')
const Payment = require('../database/crud/Payment');
const Message = require('../util/message')
const Order = require('../database/crud/Order')
const Mempon = require('../database/crud/Mempon')

const { verifyTokenMem } = require('../midleware/m_member')
const { checkCouponID} = require('../midleware/m_member')

const { Router } = require('express')
const router = Router();
const Coupon = require('../database/crud/Coupon');

//edit profile
router.post('/member/profile',verifyTokenMem, (req, res) => {
    const { memberID} = req.body;
    Member.findByID(memberID)
        .then(result => {
            res.status(200);
            res.json(new Message('Success', 'Profile',result));
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(new Message("Fail", err));
        })
});

//edit profile
router.post('/member/update',verifyTokenMem, (req, res) => {
    const { memberID,gender, name, emial, tel, street, subdistrict, district, city, zipcode } = req.body;
    Member.edit_profile(gender, name, emial, tel, street, subdistrict, district, city, zipcode, memberID)
        .then(result => {
            res.status(200);
            res.json(new Message('Success', 'Updated'));
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(new Message("Fail", err));
        })
});

router.post('/member/point', verifyTokenMem, (req, res) => {
    const { memberID, points } = req.body;
    Member.findByID(memberID)
        .then(result => {
            if (result.length != 1) {
                res.status(400);
                res.json(new Message('Fail', 'adad'))

            }
            else {
                res.json(new Message('Success', 'Have points', { points: result[0].points }))
            }
        })
});

//check order
router.get('/member/order', verifyTokenMem ,(req, res) => {
    const { memberID} = req.body;
    const sql = `SELECT customerID, orderID,memberID ,employeeID,couponID,datetime,discount,subtotal,total_price,status
                FROM \`Order\` AS ord
                NATURAL JOIN Customer`;
    pool.query(sql,[memberID],async (err,result1)=>{
        console.log(result1[0]['orderID']);
        for(i in result1){
            await Payment.findByOrderID(result1[i]['orderID'])
            .then(result2=>{
                result1[i]['payment'] = result2
                console.log(result1);
            })
        }
        res.status(200);
        res.json(new Message('Success','Order for you',result1))
    })
})

router.get('/member/coupon',verifyTokenMem,async (req,res)=>{
    try {
        const { memberID } = req.body
        const sql = `SELECT MP.couponID, type, discount, description, expire_date , COUNT(*) AS total
                    FROM Mempon AS MP
                    INNER JOIN Coupon AS C ON MP.couponID= C.couponID
                    WHERE MP.memberID = ?
                    GROUP BY MP.couponID`
        pool.query(sql,[memberID],(err,result)=>{
            if(err){
                res.status(500)
                res.json(new Message('Fail','Server Error'))
            }else{
                res.status(200)
                res.json(new Message('Success','Coupon For member',result))
            }
        })
        // console.log(result);
    } catch (error) {
        res.status(500)
        res.json(new Message('Fail','Server Error'))
    }
})

//exchange coupon
router.post('/member/exchange', verifyTokenMem , checkCouponID,async (req, res) => {
    try {
        const { memberID , couponID} = req.body;
        if(!couponID){
            res.status(400);
            res.json(new Message('Fail','Require couponID'))
            return
        }else{
            var mempoint = await Member.findPointByID(memberID);
            var coupon = await Coupon.findByID(couponID);
            
            if(coupon[0].reqpoints > mempoint[0].points){
                res.status(400);
                res.json(new Message('Fail','Not enough points!!'))
                return;
            }else{
                const sql = `UPDATE Member SET points = points - ? WHERE memberID = ?`
                pool.query(sql,[coupon[0].reqpoints,mempoint[0].memberID],(err,result)=>{
                    if(err){
                        res.status(400);
                        res.json(new Message('Fail','Some Thing Error!!',err))
                    }else{
                        Mempon.create(memberID,couponID,new Date())
                        .catch(err=>{
                            console.log(err);
                        })
                        
                        res.status(200);
                        res.json(new Message('Success','Exchange Coupon Success!!'))
                    }
                    
                })
            }
        }

        
        
        
        
        
    } catch (err) {
        res.status(500);
        res.json(new Message('Fail','Plase Check Database server!!',err))
    }

})


module.exports = router
