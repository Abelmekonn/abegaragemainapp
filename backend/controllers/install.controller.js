// import install service to handel communication with database
const installService=require("../services/install.service")
// create a function to handel the install request
async function install(req,res,next){
    // call the install service to create database table
    const installMessage=await installService.install();
    // return the result of the install service
    if(installMessage.status==200){
        res.status(200).json({
            message:installMessage
        })
    }else{
        res.status(500).json({
            message:installMessage
        })
    }
}
module.exports={
    install
}