module.exports = (req,res,next) => {
    const { username , password } = req.body;
    if(!(username && password)){
        res.send().json()
    }
    next()
}

