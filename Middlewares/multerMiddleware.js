const multer=require('multer')    
console.log("multer")

const storage=multer.diskStorage({

    
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`projectImg-${file.originalname}`)
    }
});

const multerMiddleware=multer({
    storage
})

module.exports=multerMiddleware