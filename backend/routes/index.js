const express = require('express');
const router = express.Router();

// Import middleware 
// const authMiddleware = require('../middlewares/auth.middleware');

// Import other routes
const employeeRoute = require('./employee.routes');
const loginRoutes = require('./login.routes');
const installRoutes = require('./install.routes');

// Add install route without authentication middleware
router.use('/install', installRoutes);

// Add employee routes with authentication middleware
router.use(employeeRoute);

// Add login routes without authentication middleware (since it's the login route)
router.use( loginRoutes);

module.exports = router;
