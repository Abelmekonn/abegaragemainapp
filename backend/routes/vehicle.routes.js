const express = require("express");
const middleware=require("../middlewares/auth.middleware")
const router = express.Router();
const {createVehicle,getVehicles,updateVehicle,getVehicleByCustomerId}=require("../controllers/vehicle.controller")

router.post("/api/vehicle",[middleware.verifyToken,middleware.isAdmin],createVehicle)
router.get(`/api/all-vehicles`,[middleware.verifyToken,middleware.isAdmin],getVehicles)
router.get(`/api/vehicle/:customerId`,[middleware.verifyToken,middleware.isAdmin],getVehicleByCustomerId)
router.put("/api/vehicle/update",[middleware.verifyToken,middleware.isAdmin],updateVehicle)

module.exports = router;
