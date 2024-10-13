import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.services";
import { RequestHandler } from "express";




// get all Faculty 
const getAllFaculties =catchAsync(async(req,res)=>{
    const result = await facultyServices.getFacultyFromDb(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"get All faculty successfully",
        data:result,
    })

})

//  get faculty single Id

const getFacultyId:RequestHandler = catchAsync(async(req,res,next)=>{
    const {id}= req.params;
    const result = await facultyServices.getFacultyIdFromDb(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess:true,
        message:"Single Faculty gettting Succesfully",
        data:result,
    })
})

// Update Faculty 

const updateFaculty:RequestHandler =catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const {faculty} = req.body;
    const result = await facultyServices.updateFacultyIdIntoDb(id,faculty);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Single faculty Update successfully",
        data:result,
    })
})

// Delete faculty
const deleteFaculty:RequestHandler= catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const result = await facultyServices.deleteFacultyFromDb(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Delete faculty Successfully",
        data:result,
    })
})





// Faculty cONTROLLERS  

export const facultyControllers ={
    getAllFaculties,
    getFacultyId,
    updateFaculty,
    deleteFaculty
}