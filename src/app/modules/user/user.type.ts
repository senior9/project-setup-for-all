/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
    id:string;
    password:string;
    email:string;
    needPasswordChange: boolean;
    passwordChangeAt?:Date;
    role: 'student' | 'faculty' | 'admin' ;
    status:'in-progress'| 'blocked' ;
    isDelete: boolean;
    
}

export interface UserModel extends Model<TUser> {
 isUserExistByCustomId(id:string):Promise<TUser>;
 isPasswordMatched(plainTextPassword:string,hashTextPassword:string):Promise<boolean>;
 isJwtIssuedBeforeChanged(passwordChangedTimeStamps:Date,jwtIssuedTimeStamps:number):boolean;
}

export type TUserRole = keyof typeof USER_ROLE;