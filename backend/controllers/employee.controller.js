// Import service
const employeeService = require('../services/employee.service');

// Create the add employee function
async function createEmployee(req, res, next) {
    try {
        // check if employee exists by email
        const employeeExist = await employeeService.checkIfEmployeeExists(req.body.employee_email);
        if (employeeExist) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }

        // create employee
        const employeeData = req.body;
        const result = await employeeService.createEmployee(employeeData);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({
            message: "Employee created successfully",
            employee: result.employee
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    createEmployee
};
