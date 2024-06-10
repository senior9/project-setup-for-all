import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.services";


const createAcademicSemester = catchAsync(async(req,res,next)=>{
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'create Academic Semester Successfully',
        data:result
    })
})

export const AcademisSemesterControllers ={
    createAcademicSemester
}