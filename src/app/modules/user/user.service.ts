import config from "../../config";
import { TStudent } from "../student/student.interface";
import { User, } from "./user.model";
import { newUser } from "./user.type";


const createStudentDb = async (password: string, student: TStudent) => {

    const user: newUser = {};
    // If password is noyt given by user 
    user.password = password || (config.default_pass as string)

    // Set Student  role 
    user.role = 'sudent'

    // set manually generated ID
    user.id = '203010001' 

    // create a User 
    const result = await User.create(user);

    // craete a student 
    if(Object.keys(result).length){
        //  set id, _id as user 
        student.id = result.id;
        student.user = result.id
    }

    return result;
}

export const userServices = {
    createStudentDb
}