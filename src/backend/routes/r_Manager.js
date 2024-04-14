const pool = require('../database/connect');
const Menu = require('../database/crud/Menu')
const Member = require('../database/crud/Member')


const { verifyTokenManager } = require('../midleware/m_Manager')

const router = require('./r_Auth');
const Coupon = require('../database/crud/Coupon');

//edit profile
router.post('/manager/1', verifyTokenManager,(req, res) => {
    
});


router.post('/manager/editmenu',(req,res)=>{
    
})
module.exports = router
