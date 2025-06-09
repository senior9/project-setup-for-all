import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import { RequestHandler } from "express";


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
    const result = await CourseServices.getAllCourseFromDb(req.query);
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

// update Course

const updateCourse:RequestHandler =catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    // const {course}= req.body;
    const result = await CourseServices.updateCourseIntoDb(id,req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Course  Update successfully",
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

//assign faculties

const assignFacultiesWithCourse = catchAsync(async(req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDb(courseId,faculties);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Faculty Assign succesfully",
        data:result,
    })
})

//remove faculties
const removeFacultiesFromCourse = catchAsync(async(req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDb(courseId,faculties);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Faculty Assign succesfully",
        data:result,
    })
})

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}