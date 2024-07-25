const bcrypt = require('bcrypt');
const { getCustomerByEmail } = require("./customer.service");
const { getEmployeeByEmail } = require("./employee.service");

async function checkIfEmailExists(email) {
    if (!email) {
        throw new Error('Email must be provided');
    }

    try {
        console.log('Checking if email exists in customer or employee tables:', email);

        const customerRows = await getCustomerByEmail(email);
        console.log('Customer Rows:', customerRows);

        if (customerRows && customerRows.length > 0) {
            return {
                exists: true,
                type: 'customer',
                data: customerRows[0]
            };
        }

        const employeeRows = await getEmployeeByEmail(email);
        console.log('Employee Rows:', employeeRows);

        if (employeeRows && employeeRows.length > 0) {
            return {
                exists: true,
                type: 'employee',
                data: employeeRows[0]
            };
        }

        return {
            exists: false,
            type: null,
            data: null
        };
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error;
    }
}

async function logIn({ email, password }) {
    try {
        const { exists, type, data } = await checkIfEmailExists(email);
        console.log(exists)
        if (exists) {
            return {
                status: 'fail',
                message: 'User not found',
            };
        }

        let passwordMatch;
        let userData = {};

        if (type === 'employee') {
            passwordMatch = await bcrypt.compare(password, data.employee_password_hashed);
            if (passwordMatch) {
                userData = {
                    id: data.employee_id,
                    email: data.employee_email,
                    role: data.company_role_id,
                    firstName: data.employee_first_name,
                    lastName: data.employee_last_name,
                    phone: data.employee_phone,
                };
            }
        } else if (type === 'customer') {
            passwordMatch = await bcrypt.compare(password, data.customer_password_hashed);
            if (passwordMatch) {
                userData = {
                    id: data.customer_id,
                    email: data.customer_email,
                    firstName: data.customer_first_name,
                    lastName: data.customer_last_name,
                    phoneNumber: data.customer_phone_number,
                };
            }
        }

        if (!passwordMatch) {
            return {
                status: 'fail',
                message: 'Incorrect password',
            };
        }

        return {
            status: 'success',
            data: userData,
        };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

module.exports = {
    logIn
};
