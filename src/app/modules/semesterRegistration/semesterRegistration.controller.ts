import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { semesterRegistrationServices } from "./semesterRegistration.service"






// Craete All Semester Registration
const createSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Semester Registration created successfully",
        data:result
    })
})
// Get All Semester Registration
const getSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationIntoDb(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Semester Registration get successfully",
        data:result
    })
})
// Get Single  Semester Registration
const getSingleSemesterRegistration = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationIntoDb(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Single Semester Registration get successfully",
        data:result
    })
})
// Update   Semester Registration
const updateSemesterRegistration = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDb(id,req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Single Semester Registration get successfully",
        data:result
    })
})

export const semesterRegistrationControllers ={
    createSemesterRegistration,
    getSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}