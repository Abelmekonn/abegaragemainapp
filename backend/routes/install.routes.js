const express = require("express");
const router = express.Router();
// import the install controller
const installController = require("../controllers/install.controller");
// create route to handel
router.post("/install", installController.install);
