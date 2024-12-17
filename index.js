//1. Loading .env
require('dotenv').config()  //Loads .env file contents into process.env by default.

//2. import express folder from node modules
const express=require('express')

//6. import cors
const cors=require('cors')

//8. import db
const db=require('./DB/connection')
const router=require('./Routes/router')
// const ApplicationMiddleWare = require('./Middlewares/ApplicationMiddleWare')

//3. create an application using express
const pFairApp=express()

//7. middleware configuration
pFairApp.use(cors())
pFairApp.use(express.json())
// pFairApp.use(ApplicationMiddleWare)
pFairApp.use(router)

//export image to frontend
pFairApp.use('/uploads',express.static('./uploads'))

//4. port creation
const PORT=4000 || process.env.PORT

//5. server run
pFairApp.listen(PORT,()=>{
    console.log('serverApp running on port ' +PORT)
})

//http://localhost:3000/
pFairApp.get('/',(req,res)=>{
    res.send('Welcome to Project Fair Backend')
})