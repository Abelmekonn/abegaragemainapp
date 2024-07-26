require('dotenv').config();
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            status: "fail",
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: "fail",
                message: "Unauthorized!"
            });
        }

        req.employee_email = decoded.employee_email;
        next();
    });
}

const isAdmin = async (req, res, next) => {
    try {
        const employee_email = req.employee_email;

        if (!employee_email) {
            return res.status(400).send({
                status: "fail",
                message: "Email is undefined!"
            });
        }

        const employee = await employeeService.getEmployeeByEmail(employee_email);
        console.log("emmm")
        console.log(employee)
        if (!employee || !employee[0]) {
            return res.status(404).send({
                status: "fail",
                message: "Employee not found!"
            });
        }

        if (employee[0].company_role_id === 3) {
            next();
        } else {
            return res.status(403).send({
                status: "fail",
                message: "Not an Admin!"
            });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error.message);
        return res.status(500).send({
            status: "fail",
            message: "Internal Server Error"
        });
    }
}

const authMiddleware = {
    verifyToken,
    isAdmin
}

module.exports = authMiddleware;
