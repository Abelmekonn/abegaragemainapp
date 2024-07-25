require('dotenv').config();
const loginService = require('../services/login.service');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
    try {
        console.log('Request body:', req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email and password are required',
            });
        }

        const user = await loginService.logIn({ email, password });

        if (user.status === "fail") {
            return res.status(403).json({
                status: user.status,
                message: user.message,
            });
        }

        const payload = {
            id: user.data.id,
            email: user.data.email,
            firstName: user.data.firstName,
            ...(user.data.role && { role: user.data.role }),  // Include role if available (for employees)
            ...(user.data.lastName && { lastName: user.data.lastName }),  // Include last name if available (for customers)
            ...(user.data.activeStatus && { activeStatus: user.data.activeStatus })  // Include active status if available
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: "24h",
        });

        const sendBack = {
            token: token,
        };

        return res.status(200).json({
            status: "success",
            message: `${user.data.firstName} logged in successfully`,
            data: sendBack,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

module.exports = {
    logIn
};
