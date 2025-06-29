import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";


const creatEnrollmentCourse = catchAsync(async(req,res)=>{

const result = await EnrolledCourseServices.createEnrolledCourseIntoDb();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:"Course delete succesfully",
        data:result,
    })
})

export const EnrolledCourseContollers ={
creatEnrollmentCourse,
}