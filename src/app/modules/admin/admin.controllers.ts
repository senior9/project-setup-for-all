import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";
import { RequestHandler } from "express";



// get all Admin 
const getAllAdmin = catchAsync(async(req,res)=>{
    const result = await AdminServices.getAdminFromDb(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"get All admin successfully",
        data:result,
    })
})

// get Admin Single Id From Db 
const getAdminId:RequestHandler = catchAsync(async(req,res,next)=>{
    const {adminId}= req.params
    const result = await AdminServices.getAdminIdFromDb(adminId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message:"Single Admin gettting Succesfully",
        data:result,
    })
})
//update Admin 

const updateAdmin:RequestHandler= catchAsync(async(req,res,next)=>{
    const {adminId}= req.params;
    const { admin} = req.body;
    const result = await AdminServices.updateAdminIdFromDb(adminId,admin);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'Admin update succesfully',
        data:result
    })
})

// delete Admin from database 

const deleteAdmin:RequestHandler= catchAsync(async(req,res,next)=>{
    const {adminId}= req.params;
    const result = await AdminServices.deleteAdminFromDb(adminId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'Admin delete succesfully',
        data:result,
    })
})



//Admin Controllers 
export const AdminControllers ={
    getAllAdmin,
    getAdminId,
    updateAdmin,
    deleteAdmin


}