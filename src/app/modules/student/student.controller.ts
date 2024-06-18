import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import Joi from "joi"
// import studentValidationSchema from "./student.validation";
// import {z} from "zod"



// //  creat new student 
// const createStudent = async (req: Request, res: Response) => {
//     try {
        
//         // creating Schema validation using Zod
        
//         // const studentValidationByZod = z.object({
            
//         // })





//         const { student: studentData } = req.body;
        
//         //data validation using Joi
//         // const {error,value} = studentValidationSchema.validate(studentData);



//         // controller calling 

//         const result = await studentServices.createStudentDb(studentData);

//         // if(error){
//         //     res.status(500).json({
//         //         succuess: true,
//         //         message: "Typical mistake",
//         //         error: error.details
//         //     })
//         // }

        

//         // respond send 
//         res.status(200).json({
//             succuess: true,
//             message: "student create successfully",
//             data: result
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             succuess: true,
//             message: error.message || "Typical mistake",
//             error: error
//         })
//     }

// }





//  get all students 
const getAllStudents = catchAsync(async (req, res) => {
   
        const result = await studentServices.getStudentsFromDb();
        sendResponse(res,{
            statusCode: httpStatus.OK,
            succuess: true,
            message: " Get All  student  successfully",
            data: result,
        })
    

    // Toimur amoler catch error  -> Mandad amoler method 

        // res.status(500).json({
        //     succuess: false,
        //     message: error.message || "something went wrong",
        //     error: error
        // })

    // catch error use next function -> update method 
    
})

// get Student Id : 

const getStudentId:RequestHandler = catchAsync(async (req, res, next )=>{

    
        const {studentId} =  req.params;
        const result = await studentServices.getStudentIdFromDb(studentId);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            succuess: true,
            message: "get Single student  successfully",
            data: result,
        })

})
const updateStudentId:RequestHandler = catchAsync(async (req, res, next )=>{

    
        const {studentId} =  req.params;
        const {student} = req.body
        const result = await studentServices.updateStudentIdIntoDb(studentId,student);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            succuess: true,
            message: " Single student Update successfully",
            data: result,
        })

})

const deleteStudent = catchAsync(async (req , res)=>{
        const {studentId }= req.params;
        const result = await studentServices.deleteStdFromDb(studentId);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            succuess: true,
            message: "Delete  student successfully",
            data: result,
        })

   
})


export const StudentControllers = {
    // createStudent,
    getAllStudents,
    getStudentId,
    updateStudentId,
    deleteStudent
}