//1. import mongoose
const mongoose=require('mongoose')

//2. get connection
const connectionString=process.env.connectionString

//3. define connection
mongoose.connect(connectionString).then(res=>{
    console.log('pFairApp connected with mongoose')
}).catch(err=>{
    console.log("error",+err)
})