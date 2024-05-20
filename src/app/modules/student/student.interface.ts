import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type Gurdian = {
    fatherName: string;
    fatherOcupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOcupation: string;
    motherContactNo: string;
    
}

export type UserName ={
    firstName: string;
    middleName: string;
    lastName:string
  }
export type LoaclGurdian = {
    name: string;
    occupation : string;
    contactNo: string;
    adress : string
}

export type Student ={
    id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  contacNo: string;
  emergencyContactNo: string;
  bloodGroup:"A+"|"A-"|"B+"|"B-"|"O+"|"O-"|"AB+"|"AB-";
  presentAdress:string;
  permanentAdress:string;
  email: string;
  gurdian : Gurdian;
  localGurdian : LoaclGurdian;
  profileImg?: string;
  isActive: "active" | "inActive" ;
  
}