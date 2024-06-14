// import bcrypt for hashing the input password to the database
const bcrypt = require('bcrypt');
// import query function from db.config file
const { query } = require('../config/db.config');

// function to check if employee exist in database
async function checkIfEmployeeExists(email) {
    const sql = "SELECT * FROM employee WHERE employee_email = ?";
    const rows = await query(sql, [email]);
    return rows.length > 0;
}

// function to handle creating an employee
async function createEmployee(employee) {
    let createdEmployee = {};
    try {
        // generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

        // create a connection
        const conn = await query.getConnection();
        try {
            // Start a transaction
            await conn.beginTransaction();

            // Insert into employee table
            const queryEmployee = "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
            const [rowEmployee] = await conn.query(queryEmployee, [employee.employee_email, employee.active_employee]);
            if (rowEmployee.affectedRows !== 1) {
                await conn.rollback();
                return { success: false, message: "Failed to insert into employee table" };
            }
            const employee_id = rowEmployee.insertId;

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

            // Commit the transaction
            await conn.commit();
            createdEmployee = { employee_id };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
    return { success: true, employee: createdEmployee };
}

module.exports = {
    createEmployee,
    checkIfEmployeeExists
};
