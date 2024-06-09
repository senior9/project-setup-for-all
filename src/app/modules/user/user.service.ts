import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User, } from "./user.model";
import { Tuser } from "./user.type";


const createStudentDb = async (password: string, studentData: TStudent) => {

    const userData: Partial<Tuser> = {};
    // If password is noyt given by user 
    userData.password = password || (config.default_pass as string)

    // Set Student  role 
    userData.role = 'student'

    // set manually generated ID
    userData.id = '203010001' 

    // create a User 
    const newUser = await User.create(userData);

    // craete a student 
    if(Object.keys(newUser).length){
        //  set id, _id as user 
        studentData.id = newUser.id;
        studentData.user = newUser._id //reference _id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }

    return newUser;
}

export const userServices = {
    createStudentDb
}