import { Request, Response } from "express";
import { studentServices } from "./student.service";




const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;



        // controller calling 

        const result = await studentServices.createStudentDb(studentData);

        // respond send 
        res.status(200).json({
            succuess: true,
            message: "student create successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
    }

}
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await studentServices.getStudentsFromDb();
        res.status(200).json({
            succuess: true,
            message: "student is retrived  successfully",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}


export const StudentControllers = {
    createStudent,
    getAllStudents
}