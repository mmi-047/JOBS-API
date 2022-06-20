const Job = require('../models/Job')

const User = require('../models/User')


const getAllJob = async (req,res)=>{
    
    const jobs = await Job.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(200).json({jobs,count: jobs.length})
}
const getJob = async (req,res)=>{
    const {
        user:{userID},
    params:{id:JobId}}= req

    const job = await Job.findOne({
        _id:JobId,
        createdBy:userID
    })
    if(!job){
        return res.status(404).json({msg:`No Job wit id ${JobId}`})
    }
    res.status(200).json({job})
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(201).json({ job })
  }
// const createJob = async (req,res)=>{
//     req.body.createdBy = req.user.userId
//     const job = await Job.create(req.body)
//     res.json({job},201)
// }
const updateJob = async (req,res)=>{
    const {
        body:{company,position},
        user:{userID},
    params:{id:JobId}}= req

    if (company===''||position==='') {
        return res.status(400).json({msg:'company or position cannot be empty'})
    }
    const job = await Job.findByIdAndUpdate(
        {_id:JobId,createdBy:userID},
        req.body,
        {new:true,runValidator:true}
        )

    if(!job){
        return res.status(404).json({msg:`No Job wit id ${JobId}`})
    }
    res.status(200).json({job})
}
const deleteJob = async (req,res)=>{
    const {
        user:{userID},
    params:{id:JobId}}= req
    const job = await Job.findOneAndRemove({
        _id:JobId,
        createdBy:userID
    })
    if(!job){
        return res.status(404).json({msg:`No Job wit id ${JobId}`})
    }
    res.status(200).json({msg:{success:true}})
    }
module.exports = {
    getAllJob,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}