import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


// Craete All course
const createCourse = catchAsync(async(req, res)=>{
    const result = await CourseServices.createCourseIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Course created successfully",
        data:result
    })
})

//get All course 
const getAllCourses = catchAsync(async(req,res)=>{
    const result = await CourseServices.getAllCourseFromDb();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Get All course successfully",
        data:result,
    })
})

// get Single Course 

const getSingleCourse = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CourseServices.getSingleCourseFromDb(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Single course gettting Succesfully",
        data:result,
    })
})

//delete course 

const deleteCourse = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await CourseServices.deleteCourseFromDb(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Course delete succesfully",
        data:result,
    })
})

export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
}