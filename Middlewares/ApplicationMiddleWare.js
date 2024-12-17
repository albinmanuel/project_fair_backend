const ApplicationMiddleWare=(req,res,next)=>{
    console.log("Inside ApplicationmMiddleWare")
    next()
}
module.exports=ApplicationMiddleWare