// Import service 
const employeeService=require('../services/employee.service')
// create the add employee 
async function createEmployee(req,res,next){
    // check if employee exists by email
    const employeeExist=await employeeService.checkIfEmployeeExists(req.body.employee_email)
    if(employeeExist){
        res.status(400).json({
            message:"Employee with this email already exists"
        })
    }else{
        // create employee
        try {
            const employeeData=req.body;
            const employee=await employeeService.createEmployee(employeeData)
            if (!employee){
                res.status(400).json({
                    message:"Failed to create employee"
                    })
            }else{
                res.status(200).json({
                    message:"Employee created successfully",
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message:"something wrong"
            })
        }
    }
}

module.exports={
    createEmployee
}