import {  Model, Types } from "mongoose";
import { TBloodGroup, TGender } from "./faculty.contstant";


// 1. Create an interface representing a document in MongoDB.
export type TUsername = {
    firstName: string;
    middleName:string;
    lastName: string;
}

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name:TUsername;
    gender:TGender;
    dateOfBirth?:Date;
    email:string;
    contactNo: string;
    emergencyContactNo: string;
    presentAdress:string;
    permanentAdress:string;
    profileImage?:string;
    bloodGroup?:TBloodGroup;
    academicDepartment:Types.ObjectId;
    isDeleted: boolean;
} 

export interface FacultyModel extends Model<TFaculty>{
    isUserExist(id:string):Promise <TFaculty | null >
}

export type TFacultyUpdate = Partial<TFaculty>