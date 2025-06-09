import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RequestHandler } from "express";
import { OfferedCourseServices } from "./offeredCourse.service";



// Craete All course
const createOfferedCourse = catchAsync(async(req, res)=>{
    const result = await OfferedCourseServices.createOfferedCourseIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Offered Course created successfully",
        data:result
    })
})

//get All course 
const getAllOfferedCourses = catchAsync(async(req,res)=>{
    const result = await OfferedCourseServices.getAllOfferedCourseFromDb(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Get All Offered  course successfully",
        data:result,
    })
})

// get Single Course 

const getSingleOfferedCourse = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDb(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Single offered course gettting Succesfully",
        data:result,
    })
})

// update Course

const updateOfferedCourse:RequestHandler =catchAsync(async(req,res)=>{
    const {id} = req.params;
    // const {course}= req.body;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDb(id,req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Offered Course  Update successfully",
        data:result,
    })
})

const deleteOfferCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await OfferedCourseServices.deleteOfferedCourseFromDb(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Offered Course delete succesfully",
        data:result,
    })
})

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse,
    deleteOfferCourse
}