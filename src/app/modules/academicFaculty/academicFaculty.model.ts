import { Schema, model } from "mongoose";
import { TacademicFaculty } from "./academicFaculty.type";



const academicFacultySchema = new Schema<TacademicFaculty>({
    name:{
     type:String,
     required:true,
     unique:true
    }

},{
    timestamps:true
})


export const AcademicFaculty = model <TacademicFaculty>('academicFaculty',academicFacultySchema)