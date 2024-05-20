import { Student } from "./student.interface";
import { StudentModel } from "./student.model";


const createStudentDb =async (student:Student)=>{

   const result =  await StudentModel.create(student);
   return result;
}

const getStudentsFromDb = async ()=>{
    const result = await StudentModel.find();
    return result ;
}

// this is controller
export const studentServices ={
    createStudentDb,
    getStudentsFromDb,
};