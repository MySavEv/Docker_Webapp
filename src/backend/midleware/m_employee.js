const Message = require('../util/message')

const Employee = require('../database/crud/Employee')

async function checkEmployeeID(req,res,next) {
    const { employeeID } = req.body;
    if(employeeID){
        Employee.findByID(employeeID)
            .then(result=>{
                if(result.length == 0){
                    res.status(400);
                    res.json(new Message('Fail','EmployeeID is not Valid'))
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

module.exports = {checkEmployeeID}