// install.routes.js
const express = require("express");
// import instal service
const { install } = require("../services/install.service");
// import router from express
const router = express.Router();

router.get("/install", async (req, res) => {
    const result = await install();
    res.status(result.status).json({ message: result.message });
});
// import employee route
const employeeRoute=require("./employee.routes")
// add employe router
router.use(employeeRoute);
// export router
module.exports = router;
