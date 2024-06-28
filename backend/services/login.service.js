const bcrypt = require('bcrypt');
const employeeService = require("./employee.service");

async function logIn(employeeData) {
    try {
        console.log('Employee data:', employeeData);
        if (!employeeData.email || !employeeData.password) {
            return {
                status: "fail",
                message: "Email and password are required"
            };
        }

        let returnData = {};
        const employee = await employeeService.getEmployeeByEmail(employeeData.email);

        if (!employee || employee.length === 0) {
            return {
                status: "fail",
                message: "Employee does not exist"
            };
        }

        const passwordMatch = await bcrypt.compare(employeeData.password, employee[0].employee_password_hashed);
        if (!passwordMatch) {
            return {
                status: "fail",
                message: "Incorrect password"
            };
        }

        return {
            status: "success",
            data: employee[0]
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: "Internal server error"
        };
    }
}

module.exports = {
    logIn
};
