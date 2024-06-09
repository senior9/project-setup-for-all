// import { Student } from './student.model';
// import { StudentMethod } from './student.interface';
import {  Model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    
}

export type TUserName ={
    firstName: string;
    middleName: string;
    lastName:string
  }
export type TLocalGuardian = {
    name: string;
    occupation : string;
    contactNo: string;
    address : string
}

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
};


// for creating static method 

export interface StudentModel extends Model<TStudent> {
  isUserExist(id:string):Promise<TStudent |null >
}
// static method end



// Custom instance method 
// Instance method
// export type StudentMethod = {
//   isUserExist(id:string):Promise<TStudent | null >
// };
// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>;
// Instance method end 


