import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";



// Create All Semesters 
const createAcademicDepartment = catchAsync(async(req,res)=>{
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'create Academic Department Successfully',
        data:result
    })
})


// Get All semisters Rsponse Request 
const getAllDepartments = catchAsync(async(req,res)=>{
    const result = await academicDepartmentServices.getAllDepartmentIntoDb();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get All  Department  successfully",
        data: result,
    })
})

// get Single Semester Using Req Response 
const getSingleDepartmentId = catchAsync(async(req,res)=>{
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.getSingleDepartmentFromDb(departmentId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: " Get  Single  Department  successfully",
        data: result,
    })

})
// Update Sigle Smester 

const updateSingleDepartment = catchAsync(async(req,res)=>{
    const {departmentId} = req.params;
    const departmentData = req.body;
    const result = await academicDepartmentServices.updateDepartmentFromDb(departmentId,departmentData);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        succuess: true,
        message: "     Department Update  successfully",
        data: result,
    })
})

export const AcademicDepartmentControllers ={
    createAcademicDepartment,
    getAllDepartments,
    getSingleDepartmentId,
    updateSingleDepartment
}