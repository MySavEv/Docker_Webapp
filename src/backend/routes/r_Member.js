const { Router } = require('express')
const pool = require('../database/connect');
const { update } = require('../database/crud/AuthEmployee');
const Menu = require('../database/crud/Menu')
const Member = require('../database/crud/Member')
const PayMent = require('../database/crud/Payment')
const router = require('./r_Auth');
const Payment = require('../database/crud/Payment');
const router = require('./r_Auth')
const pool = require('../database/connect');
const Message = require('../util/message')
const { verifyTokenEm } = require('../midleware/m_employee')

//edit profile
router.post('/member/update', (req, res) => {
    const { gender, name, emial, tel, street, subdistrict, district, city, zipcode } = req.body;
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

router.post('/member/point', verifyTokenEm, (req, res) => {
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
//see menu
router.get('/member/menu', (req, res) => {
    Menu.findAll().then(result => {
        res.status(400);
    })
})
//check payment
router.get('/member/payment', (req, res) => {
    const { paymentID, orderID, method, amount, status, datetime, successdatetime } = req.body;
    Payment.update(paymentID, orderID, method, amount, status, datetime, successdatetime)
        .then(result => {
            res.status(200)
            res.json(new Message('Success', 'Already Paid'))
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.json(new Message("Fail", 'Have not paid yet'));
        })
})
//exchange coupon
router.post('/member/exchange', (req, res) => {

})


module.exports = router
