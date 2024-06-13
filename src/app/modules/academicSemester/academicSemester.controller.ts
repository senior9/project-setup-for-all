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
    const result = await AcademicSemesterServices.getSingleSemesterFromDb(semesterId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get  Single  Semesters  successfully",
        data: result,
    })

})
// Update Sigle Smester 

const updateSingleSmester = catchAsync(async(req,res)=>{
    const {semesterId} = req.params;
    const semesterData = req.body;
    const result = await AcademicSemesterServices.updateSemesterFromDb(semesterId,semesterData);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: "     Semesters Update  successfully",
        data: result,
    })
})

export const AcademisSemesterControllers ={
    createAcademicSemester,
    getAllSemesters,
    getSingleSemesterId,
    updateSingleSmester
}