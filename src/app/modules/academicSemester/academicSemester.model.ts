import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.type";
import {  AcademicSemesterCode,  AcademicSemesterName, Months } from "./academicSemester.constant";





const academicSemesterSchema = new Schema <TAcademicSemester>({
    name:{
        type:String,
        required:true,
        enum:AcademicSemesterName
    },
    code:{
        type:String,
        required:true,
        enum:AcademicSemesterCode
    },
    year:{
        type:String,
        required:true
    },
    startMonth:{
        type:String,
        enum:Months,
        required:true
    },
    endMonth:{
        type:String,
        required:true,
        enum:Months
    }


})

export const AcademicSemester = model <TAcademicSemester>('AcademicSemester',academicSemesterSchema)