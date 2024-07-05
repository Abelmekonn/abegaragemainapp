const { error } = require('console');
const orderService=require('../services/order.service');

async function createOrder(req,res,next){
    try{
        const orderData=req.body;
        const order=await orderService.createOrder(orderData);
        if(!order){
            res.status(400).json({
                error:'Failed to add order'
            })
        } else {
            res.status(200).json({
                status:"order created"
            })
        }
    }catch(error){
        res.status(400).json({
            error:"something went wrong"
        })
    }
}

module.exports={
    createOrder
}