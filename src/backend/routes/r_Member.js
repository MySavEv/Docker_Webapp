const { Router } = require('express')
const router = require('./r_Auth')
const pool = require('../database/connect');

const Message = require('../util/message')
const Member = require('../database/crud/Member')

router.post('/member/update', (req, res) => {
    const { memberID, gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode } = req.body;
    Member.update(memberID, gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode)
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

router.post('/member/point', (req, res) => {
    const { memberID, points } = req.body;
    Member.findByID(memberID)
        .then(result => {
            if (result.length != 1) {
                res.status(400);
                res.json(new Message('Fail', 'adad'))
                
            }
            else
            {
                res.json(new Message('Success', 'Have points', {points:result[0].points}))
            }
        })
})

module.exports = router