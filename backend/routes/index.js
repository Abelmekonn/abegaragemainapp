// install.routes.js
const express = require("express");
const { install } = require("../services/install.service");

const router = express.Router();

router.get("/install", async (req, res) => {
    const result = await install();
    res.status(result.status).json({ message: result.message });
});

module.exports = router;
