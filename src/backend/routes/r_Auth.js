const { Router } = require('express')
const pool = require('../database/connect')
const AuthEmployee = require('../database/crud/AuthEmployee')
const AuthMember = require('../database/crud/AuthMember')
const Member = require('../database/crud/Member')
const HashManager = require('../util/bcrypt')
const Message = require('../util/message')
const JWTClass = require('../util/jwt')

const router = Router();

async function check_token(req,res,next){
    if(req.headers['authorization']){
        let token = await req.headers['authorization'].split(' ')[1]
        try {
            let s = JWTClass.verifyToken(token)
            res.status(400);
            res.json(new Message('Fail','You Have Token?'))
        } catch (error) {
            next()
        }
    }
    else
    {
        next()
    }
}

router.post('/verify',(req, res) => {
    if(req.headers['authorization']){
        let token = req.headers['authorization'].split(' ')[1]
        try {
            let data = JWTClass.verifyToken(token)
            res.status(200);
            res.json(new Message('Success','Verify Token Success',data))
        } catch (error) {
            res.status(400);
            res.json(new Message('Fail',error.message))
        }

    }else{
        res.status(400)
        res.json(new Message('Fail','Verify Token Fail'))
    }
});

router.post('/login/member',(req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT username, memberID FROM AuthMember WHERE username = ? AND password = ?`;
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500);
            res.json(new Message('Fail','Server Error!!',err))
            return
        }
        if(result.length != 1){
            res.status(400);
            res.json(new Message('Fail','Login Fail!!'))
            return
        }
        let plainTextToken = result[0]
        plainTextToken['type'] = 'member'
        let token = JWTClass.genToken(plainTextToken)
        result[0]['token'] = token
        res.status(200);
        res.json(new Message('Success',"Login Success",result[0]))
    });
});

router.post('/login/employee', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT username,E.employeeID,email,name,tel,baristaflag,cashierflag,managerflag
                FROM AuthEmployee AS A
                INNER JOIN Employee AS E ON A.employeeID = E.employeeID
                WHERE username = ? AND password = ?`;
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500);
            res.json(new Message('Fail','Server Error!!',err))
            return
        }

        if(result.length != 1){
            res.status(400);
            res.json(new Message('Fail','Login Fail!!',))
            return
        }
        let plainTextToken = result[0]
        plainTextToken['type'] = 'employee'
        plainTextToken.baristaflag = plainTextToken.baristaflag.toString('hex') === '01';
        plainTextToken.cashierflag = plainTextToken.cashierflag.toString('hex') === '01';
        plainTextToken.managerflag = plainTextToken.managerflag.toString('hex') === '01';
        
        console.log(plainTextToken);
        let token = JWTClass.genToken(plainTextToken)
        result[0]['token'] = token
        res.status(200);
        res.json(new Message('Success',"Login Success",result[0]))
    });
    });

router.post('/register/member', check_token , async (req, res) => {
    const { username, password ,gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode} = await req.body;
    AuthMember.findByUsername(username)
        .then(result=>{
            if(result.length >= 1){
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