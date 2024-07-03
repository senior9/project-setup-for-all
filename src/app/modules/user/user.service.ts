import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User, } from "./user.model";
import { Tuser } from "./user.type";
import { generateStudentId } from "./user.utils";
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const createStudentIntoDb = async (password: string, payload: TStudent) => {

    const userData: Partial<Tuser> = {};
    // If password is noyt given by user 
    userData.password = password || (config.default_pass as string)

    // Set Student  role 
    userData.role = 'student'

    

    // Find Academic Semister Info 

    const admissionSemester = await AcademicSemester.findById(payload.admissionSmester, );

    // Session use Transction & Rollback 
    const session = await mongoose.startSession();

    try {

     session.startTransaction();
          // set manually generated ID
    userData.id = await generateStudentId(admissionSemester) ;

    // create a User (Start Tansction-1)
    const newUser = await User.create([userData], {session});


    // craete a student 
    if(!newUser.length){ //When i use sesson it must be an array thay why Object.keys(newUser.length removed)
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to create User')
    }
        //  set id, _id as user 
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id //reference _id

        // start transaction - 2 
        const newStudent = await Student.create([payload], {session});
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST,'failed to create Student ')
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;
    }
 catch (error:any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
}

export const userServices = {
     createStudentIntoDb
}