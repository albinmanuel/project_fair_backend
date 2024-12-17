const mongoose=require('mongoose')

const projects=require('../Models/projectSchema')

exports.addProjectAPI=async(req,res)=>{
    console.log("Inside addProjectAPI");
    
    const{title,language,github,website,overview}=req.body
    const projectImg=req.file.filename
    const userId=req.payload
    console.log(projectImg)
    console.log({title,language,github,website,overview,userId})

    try{
       const project=await projects.findOne({github})
       if(project){
        res.status(401).json("Project already exists")
       }
       else{
        const newProject= new projects({title,language,github,website,overview,projectImg,userId})
        await newProject.save()
        res.status(200).json(newProject)
    }

    }
    
    catch(err){
        res.status(405).json("Error",err)
    }
}

exports.getalluserProjects=async(req, res)=>{
    console.log("Inside All Projects");
    try {
        const allProjects=await projects.find()
        res.status(200).json(allProjects);
    } catch (err) {
        res.status(404).json("Error",err)
    }
    
}

exports.getauserProjects=async(req, res)=>{
    const userId=req.payload
    console.log("Inside the user Projects");
    try {
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects);
    } catch (err) {
        res.status(404).json("Error",err)
    }
    
}

exports.gethomeProjects=async(req, res)=>{

    console.log("Inside home Projects");
    try {
        const userProjects=await projects.find().limit(3)
        res.status(200).json(userProjects);
    } catch (err) {
        res.status(404).json("Error",err)
    }
    
}

exports.editProjectAPI=async(req,res)=>{
    console.log("Inside editProjectAPI");
    
    const{title,language,github,website,overview,projectImg}=req.body
    const updatedImg=req.file?req.file.filename:projectImg
    const userId=req.payload
    const {projectId}=req.params
    console.log(projectImg)
    console.log({title,language,github,website,overview,userId})

    try{
        console.log("Inside try");
        
       const project=await projects.findByIdAndUpdate(
        {_id:projectId},
        {
            title:title,
            language:language,
            github:github,
            website:website,
            overview:overview,
            projectImg:updatedImg
        }
       )
       await project.save()
        res.status(200).json(project)

    }
    
    catch(err){
        res.status(405).json("Error",err)
    }
}

exports.deleteProjectAPI=async(req,res)=>{
    console.log("Inside delete API");
    const{projectId}=req.params
    try {
        const project=await projects.findByIdAndDelete({_id:projectId})
        res.status(200).json(project)
    } catch (error) {
        res.status(404).json(err)
    }
    
}