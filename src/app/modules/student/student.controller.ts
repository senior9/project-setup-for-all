import { Request, Response } from "express";
import { studentServices } from "./student.service";
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
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await studentServices.getStudentsFromDb();
        res.status(200).json({
            succuess: true,
            message: "student is retrived  successfully",
            data: result
        })
    } catch (error : any) {
        res.status(500).json({
            succuess: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}

// get Student Id : 

const getStudentId = async (req: Request, res:Response )=>{

    try {
        const {studentId} =  req.params;
        const result = await studentServices.getStudentIdFromDb(studentId);
        res.status(200).json({
            succuess: true,
            message: " find student id succuessfully",
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}


export const StudentControllers = {
    // createStudent,
    getAllStudents,
    getStudentId
}