// import bycrpt for hashing th input password to the database
const bycrpt=require('bcrypt')
// import query function from d.config file
const conn=require('../config/db.config')
// function to check if employee exist in database
async function checkIfEmployeeExists(email){
    const query="SELECT * FROM employee WHERE employee_email=?";
    const row =await conn.query(query,[email]);
    if (row.length>0){
        return true;
    }
    return true;
}
// function to handel create employee
async function createEmployee(employee){
    let createEmployee={}
    try {
        // generate salt and hash the password
        const salt=await bycrpt.genSalt(10);
        // hash password
        const hashedPassword=await bycrpt.hash(employee.employee_password,salt);
        // create insert query
        const query= "INSERT INTO employee (employee_email,active_employee) VALUE (?,?)";
        const row=await conn.query(query,[employee.employee_email,employee.active_employee]);
        if (row.affectedRows!==1){
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee table" };
        }
        // get id from inserted row
        const employee_id=row.insertId;
        // insert the remaining data to employee_info,employee_pass,employee_role
        // Insert into employee_info table
        const queryEmployeeInfo = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
        const [rowEmployeeInfo] = await conn.query(queryEmployeeInfo, [employee_id, employee.employee_first_name, employee.employee_last_name, employee.employee_phone]);
        if (rowEmployeeInfo.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_info table" };
        }
        // Insert into employee_pass table
        const queryEmployeePass = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
        const [rowEmployeePass] = await conn.query(queryEmployeePass, [employee_id, hashedPassword]);
        if (rowEmployeePass.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_pass table" };
        }

        // Insert into employee_role table
        const queryEmployeeRole = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
        const [rowEmployeeRole] = await conn.query(queryEmployeeRole, [employee_id, employee.company_role_id]);
        if (rowEmployeeRole.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_role table" };
        }
        createEmployee={
            employee_id:employee_id
        }
    } catch (error) {
        console.log(error)
    }
    return createdEmployee;
}
module.exports={
    createEmployee,
    checkIfEmployeeExists
}