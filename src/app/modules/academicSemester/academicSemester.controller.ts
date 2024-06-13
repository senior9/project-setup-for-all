import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.services";


// Create All Semesters 
const createAcademicSemester = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'create Academic Semester Successfully',
        data:result
    })
})


// Get All semisters Rsponse Request 
const getAllSemesters = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterServices.getAllSemesterIntoDb();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get All  Semesters  successfully",
        data: result,
    })
})

// get Single Semester Using Req Response 
const getSingleSemesterId = catchAsync(async(req,res)=>{
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.getSingleSemester(semesterId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get  Single  Semesters  successfully",
        data: result,
    })

})

export const AcademisSemesterControllers ={
    createAcademicSemester,
    getAllSemesters,
    getSingleSemesterId
}