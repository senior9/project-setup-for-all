import { Model, Types } from "mongoose";
import { TBloodGroup, TGender } from "./admin.constant";

// 1. Create an interface representing a document in MongoDB.
export type TUserName ={
    firstName:string;
    middleName:string;
    lastName:string
} 


export type TAdmin = {
    id:string;
    user: Types.ObjectId;
    designation: string;
    name:TUserName;
    gender:TGender;
    dateOfBirth?:Date;
    email:string,
    contactNo:string;
    emergencyContactNo: string;
    presentAdress:string;
    permanentAdress:string;
    profileImage?: string;
    bloodGroup?: TBloodGroup;
    isDeleted: boolean;
}

export interface AdminModel extends Model<TAdmin>{
    isUserExist(id:string):Promise<TAdmin | null >
}
export type TadminUpadte = Partial<TAdmin>