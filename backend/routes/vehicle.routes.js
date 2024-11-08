const express = require("express");
const middleware=require("../middlewares/auth.middleware")
const router = express.Router();
const {createVehicle,getVehicles,updateVehicle,getVehicleByVehicleId}=require("../controllers/vehicle.controller")

router.post("/api/vehicle",[middleware.verifyToken,middleware.isAdmin],createVehicle)
router.get(`/api/all-vehicles`,[middleware.verifyToken,middleware.isAdmin],getVehicles)
router.get("/api/vehicle/:vehicleId",getVehicleByVehicleId)
router.put("/api/vehicle/update",[middleware.verifyToken,middleware.isAdmin],updateVehicle)

module.exports = router;
