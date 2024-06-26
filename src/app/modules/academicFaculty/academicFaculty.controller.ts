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
const getAllFaculties = catchAsync(async(req,res)=>{
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
    const {facultyId} = req.params;
    const result = await academicFacultyServices.getSingleFacultyFromDb(facultyId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get  Single  faculty  successfully",
        data: result,
    })

})
// Update Sigle Smester 

const updateSingleFaculty = catchAsync(async(req,res)=>{
    const {facultyId} = req.params;
    const facultyData = req.body;
    const result = await academicFacultyServices.updateFacultyFromDb(facultyId,facultyData);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: "     Faculty Update  successfully",
        data: result,
    })
})

export const AcademicFacultyControllers ={
    createAcademicFaculty,
    getAllFaculties,
    getSingleFacultyId,
    updateSingleFaculty
}