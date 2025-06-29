/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User, } from "./user.model";
import { TUser } from "./user.type";
import { generatedAdminId, generatedFacultyId, generateStudentId } from "./user.utils";
import mongoose, { Error } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from "../faculty/faculty.type";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.type";
import { Admin } from "../admin/admin.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";



// Create user  student 

const createStudentIntoDb = async (file:any,password: string, payload: TStudent) => {

    const userData: Partial<TUser> = {};
    // If password is noyt given by user 
    userData.password = password || (config.default_pass as string)

    // Set Student  role 
    userData.role = 'student'
    //set email for student
    userData.email=payload.email

    

    // Find Academic Semister Info 

    const admissionSemester = await AcademicSemester.findById(payload.admissionSmester, );

    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }

    // Session use Transction & Rollback 
    const session = await mongoose.startSession();

    try {

     session.startTransaction();
          // set manually generated ID
    userData.id = await generateStudentId(admissionSemester) ;

    //upload image  cloudinary 
        const imageName= `${userData?.id}+${payload?.name?.firstName}`;
        const path = file?.path

        const {secure_url} = await sendImageToCloudinary(imageName,path);
        

    // create a User (Start Tansction-1)
    const newUser = await User.create([userData], {session});


    // craete a student 
    if(!newUser.length){ //When i use sesson it must be an array thay why Object.keys(newUser.length removed)
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to create User')
    }
        //  set id, _id as user 
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id //reference _id
        payload.profileImg =secure_url //set ima

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

// Create Faculty 

const createFacultyIntoDb = async(password:string,payload:TFaculty)=>{
    const userData:Partial<TUser>={};
    // If password is not given by user 
    userData.password = password || (config.default_pass as string);
    // Set Faculty role
    userData.role = 'faculty';
    //set email for faculty
    userData.email=payload.email

    //find academis department onfo 

    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);
    if(!academicDepartment){
        throw new Error('Academic department not found')
    }

    //Session Use transaction and Rollback 

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // set manually generated Id 

        userData.id = await generatedFacultyId() ;
        //create a user (Start Tansction-1)

        const newUser = await User.create([userData], {session});

        //Create a faculty 
        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to user create')
        }
        //set id, _id as user
        payload.id = newUser[0].id;
        payload.user= newUser[0]._id;

     // create daculty transication -2

        const newFaculty = await Faculty.create([payload],{session});
        if(!newFaculty.length){
            throw new AppError(httpStatus.BAD_REQUEST,'Faild  to create Department ');
        }
        await session.commitTransaction();
        await session.endSession();

        return newFaculty;

        } catch (error:any) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error(error);
        }

}


// create  Admin 

const createAdminIntoDb = async(password:string, payload:TAdmin)=>{
    const userData:Partial<TUser>={};
    
  //if password is not given , use deafult password

  userData.password = password || (config.default_pass as string);

  // set Admin role 
    userData.role = 'admin';
    //set email for student
    userData.email=payload.email
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //set generated Id 
        userData.id =await generatedAdminId();

// create a user (transaction-1)
    const newUser = await User.create([userData],{session});

//Create Admin 

if(!newUser.length){
    throw new AppError(httpStatus.BAD_REQUEST,'failed to created new admin')
}
// set Id , _id as a user 
// console.log(payload);
if (!payload) throw new Error('Payload is undefined')
payload.id = newUser[0].id;
payload.user = newUser[0]._id;

// create a admin transaction- 2 

const newAdmin = await Admin.create([payload],{session});
if(!newAdmin.length){
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to create new admin')
}

await session.commitTransaction();
await session.endSession();
return newAdmin;


    } catch (error:any) {
await session.abortTransaction();
await session.endSession();
 throw new Error(error)
    }
}
//change status
const changeStatus = async(id:string,payload:{status:string})=>{
    const result = await User.findByIdAndUpdate(id,payload,{
        new:true
    })
    return result;


}
//get me details
const getMe = async(userId:string,role:string)=>{
    
    // const decoded = verifyToken(token,config.jwt_access_token as string);
    // const {userId,role} = decoded;
    // // console.log(userId,role);
    let result = null;
    if(role ==='student'){
        result = await Student.findOne({id:userId}).populate('user').populate({
        path: 'academicDepartment', /// very very important point 
        populate: {
            path: 'academicFaculty'  /// very very important point 
        }
    }).populate('admissionSmester');
    }
    if(role ==='admin'){
        result = await Admin.findOne({id:userId}).populate('user')
    }
    if(role ==='faculty'){
        result = await Faculty.findOne({id:userId}).populate('user')
    }
    return result;


}


export const userServices = {
     createStudentIntoDb,
     createFacultyIntoDb,
     createAdminIntoDb,
     changeStatus,
     getMe
}