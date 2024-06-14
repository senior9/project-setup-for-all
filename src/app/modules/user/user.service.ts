import { TAcademicSemester } from './../academicSemester/academicSemester.type';
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User, } from "./user.model";
import { Tuser } from "./user.type";
import { generateStudentId } from "./user.utils";


const createStudentIntoDb = async (password: string, payload: TStudent) => {

    const userData: Partial<Tuser> = {};
    // If password is noyt given by user 
    userData.password = password || (config.default_pass as string)

    // Set Student  role 
    userData.role = 'student'

    

    // Find Academic Semister Info 

    const admissionSemester = await AcademicSemester.findById(payload.admissionSmester, )

    // set manually generated ID
    userData.id = await generateStudentId(admissionSemester) ;

    // create a User 
    const newUser = await User.create(userData);

    // craete a student 
    if(Object.keys(newUser).length){
        //  set id, _id as user 
        payload.id = newUser.id;
        payload.user = newUser._id //reference _id

        const newStudent = await Student.create(payload);
        return newStudent;
    }

    return newUser;
}

export const userServices = {
     createStudentIntoDb
}