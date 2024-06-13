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

academicSemesterSchema.pre('save', async function(next){
    const isSemesterExist = await AcademicSemester.findOne({
        name: this.name,
        year : this.year
    })
    if(isSemesterExist){
        throw new Error('Semester Already Exist!!')
    }
    next();
})

export const AcademicSemester = model <TAcademicSemester>('AcademicSemester',academicSemesterSchema)