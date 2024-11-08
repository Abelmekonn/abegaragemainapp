const express = require("express");
const middleware=require("../middlewares/auth.middleware")
const router = express.Router();
const {createService,deleteService,getAllServices,updateService,getServiceById} =require('../controllers/service.controller')

router.post('/api/service',[middleware.verifyToken,middleware.isAdmin],createService);
router.get('/api/services',[middleware.verifyToken,middleware.isAdmin],getAllServices);
router.get(`/api/service/:id`,getServiceById);
router.put(`/api/service/update/:serviceId`,[middleware.verifyToken,middleware.isAdmin],updateService);
router.delete(`/api/service/delete/:serviceId`,[middleware.verifyToken,middleware.isAdmin],deleteService);

module.exports = router;
