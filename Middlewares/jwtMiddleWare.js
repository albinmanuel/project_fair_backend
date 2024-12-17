const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    console.log("Inside jwtmiddleware")

    try{
        const token=req.headers['authorization'].slice(7)
        console.log(token)
        if(token){
            jwtverification=jwt.verify(token,process.env.jwtkey)
            console.log(jwtverification)
            req.payload=jwtverification.userId
            next()
        }
        else{
            res.status(404).json("Please provide the token")
        }
    }
    catch(err){
        res.status(401).json("Please login")
    }
}
module.exports=jwtMiddleWare