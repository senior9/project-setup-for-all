
import { model, Schema } from "mongoose";
import { TCourse, TpreRequisiteCourses } from "./course.type";



// preRequisiteSchema 
const preRequisiteCoursesSchema = new Schema<TpreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})


//course Schema 
const courseSchema = new Schema<TCourse>({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    prefix:{
        type:String,
        required:true,
        trim:true,
    },
    code:{
        type:Number,
        required:true,
        trim:true,
    },
    credits:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
    },
    preRequisiteCourses:[preRequisiteCoursesSchema]
})

// make model 
export const Course = model<TCourse>('Course',courseSchema);
