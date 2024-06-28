const bcrypt = require('bcrypt');
const { dbConnectionPool, query } = require('../config/db.config');

// Function to check if employee exists in database
async function checkIfEmployeeExists(email) {
    const sql = "SELECT * FROM employee WHERE employee_email = ?";
    const rows = await query(sql, [email]);
    return rows.length > 0;
}

// Function to handle creating an employee
async function createEmployee(employee) {
    let createdEmployee = {};
    let conn;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
        conn = await dbConnectionPool.getConnection();
        await conn.beginTransaction();

        const queryEmployee = "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
        const [rowEmployee] = await conn.query(queryEmployee, [employee.employee_email, employee.active_employee]);
        if (rowEmployee.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee table" };
        }
        const employee_id = rowEmployee.insertId;

        const queryEmployeeInfo = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
        const [rowEmployeeInfo] = await conn.query(queryEmployeeInfo, [employee_id, employee.employee_first_name, employee.employee_last_name, employee.employee_phone]);
        if (rowEmployeeInfo.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_info table" };
        }

        const queryEmployeePass = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
        const [rowEmployeePass] = await conn.query(queryEmployeePass, [employee_id, hashedPassword]);
        if (rowEmployeePass.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_pass table" };
        }

        const queryEmployeeRole = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
        const [rowEmployeeRole] = await conn.query(queryEmployeeRole, [employee_id, employee.company_role_id]);
        if (rowEmployeeRole.affectedRows !== 1) {
            await conn.rollback();
            return { success: false, message: "Failed to insert into employee_role table" };
        }

        await conn.commit();
        createdEmployee = { employee_id };
    } catch (error) {
        if (conn) {
            await conn.rollback();
            conn.release();
        }
        console.error(error);
        return { success: false, message: error.message };
    } finally {
        if (conn) {
            conn.release();
        }
    }
    return { success: true, employee: createdEmployee };
}

// A function to get employee by email   
async function getEmployeeByEmail(email) {
    const sql = `
        SELECT 
            e.*, ei.*, ep.*, er.*
        FROM employee e
        INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
        INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
        INNER JOIN employee_role er ON e.employee_id = er.employee_id
        WHERE e.employee_email = ?
    `;
    const [results] = await query(sql, [email]);
    return results[0];
}

module.exports = {
    createEmployee,
    checkIfEmployeeExists,
    getEmployeeByEmail
};
