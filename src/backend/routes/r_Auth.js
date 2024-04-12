const { Router } = require('express')
const pool = require('../database/connect')
const AuthEmployee = require('../database/crud/AuthEmployee')
const AuthMember = require('../database/crud/AuthMember')
const Member = require('../database/crud/Member')
const HashManager = require('../util/bcrypt')
const Message = require('../util/message')

const router = Router();

router.post('/login/member', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT username, memberID FROM AuthMember WHERE username = ? AND password = ?`;
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
                res.status(500).send('Error creating user');
            } else {
                let msg = new Message(200,"success",result)
                res.json(msg).status(200)
            }
        });
    });

router.post('/login/employee', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT username, memberID FROM AuthEmployee WHERE username = ? AND password = ?`;
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
                res.status(500)
                res.json(new Message('Fail',err))
            } else {
                let msg = new Message(200,"success",result)
                res.status(200)
                res.json(msg)
            }
        });
    });

router.post('/register/member', async (req, res) => {
    const { username, password ,gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode} = await req.body;
    AuthMember.findByUsername(username)
        .then(result=>{
            if(result.length >= 1){
                console.log(464646546645);
                res.status(400);
                res.json(new Message('Fail','Username valid'))
                return
            }

            Member.create(gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode)
                .then(async result=>{
                    let memberID = result.insertId
                    let hashPassword = await HashManager.hash(password);
                    AuthMember.create(username,memberID,hashPassword)
                        .then(result=>{
                            res.status(200);
                            res.json(new Message('Success','Register Complete'))
                        })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400)
                    res.json(new Message("Fail",err))
                })
        })
});


module.exports = router