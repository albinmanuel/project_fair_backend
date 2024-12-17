//1
const express=require('express')

//2. create router
const router=express.Router()

//3. import usercontrol
const userController=require('../Controllers/userController')
const jwtMiddleWare = require('../Middlewares/jwtMiddleWare')
const projectController=require('../Controllers/projectController')
const multerMiddleware = require('../Middlewares/multerMiddleware')

router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/addproject',jwtMiddleWare,multerMiddleware.single('projectImg'),projectController.addProjectAPI)

router.get('/api/getalluserprojects',jwtMiddleWare,projectController.getalluserProjects)

router.get('/api/getparticularuserprojects',jwtMiddleWare,projectController.getauserProjects)

router.get('/api/gethomeprojects',projectController.gethomeProjects)

router.put('/api/editproject/:projectId',jwtMiddleWare,multerMiddleware.single('projectImg'),projectController.editProjectAPI)

router.delete('/api/deleteproject/:projectId',jwtMiddleWare,projectController.deleteProjectAPI)

module.exports=router