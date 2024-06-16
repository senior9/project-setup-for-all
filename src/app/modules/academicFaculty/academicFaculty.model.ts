import { Schema, model } from "mongoose";
import { TacademicFaculty } from "./academicFaculty.type";



const academicFacultySchema = new Schema<TacademicFaculty>({
    name:{
     type:String,
     required:true,
     unique:true
    }

})


export const academicFaculty = model <TacademicFaculty>('academicFaculty',academicFacultySchema)