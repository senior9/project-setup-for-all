import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";



// Create All Semesters 
const createAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await academicFacultyServices.createAcademicFacultyIntoDb(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'create Academic Faculty Successfully',
        data:result
    })
})


// Get All semisters Rsponse Request 
const getAllSemesters = catchAsync(async(req,res)=>{
    const result = await academicFacultyServices.getAllFacultyIntoDb();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get All  Faculty  successfully",
        data: result,
    })
})

// get Single Semester Using Req Response 
const getSingleFacultyId = catchAsync(async(req,res)=>{
    const {semesterId} = req.params;
    const result = await academicFacultyServices.getSingleFacultyFromDb(semesterId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get  Single  faculty  successfully",
        data: result,
    })

})
// Update Sigle Smester 

const updateSingleFaculty = catchAsync(async(req,res)=>{
    const {semesterId} = req.params;
    const semesterData = req.body;
    const result = await academicFacultyServices.updateFacultyFromDb(semesterId,semesterData);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: "     Faculty Update  successfully",
        data: result,
    })
})

export const AcademisSemesterControllers ={
    createAcademicFaculty,
    getAllSemesters,
    getSingleFacultyId,
    updateSingleFaculty
}