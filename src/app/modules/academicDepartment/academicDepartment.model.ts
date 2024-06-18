import { Schema, model, } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.type";
import AppError from "../../errors/AppError";




const academicDepartmentSchema = new Schema <TAcademicDepartment>({
    name:{
        type:String,
        required:true,
        // unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'academicFaculty',
        required:true
    }
},{
    timestamps:true
})





// validation layer for check if duplicate department Esist or not 

academicDepartmentSchema.pre('save', async function(next){
    const isDeparmentExist =await academicDepartment.findOne({name:this.name})
    if(isDeparmentExist){
        throw new Error('Academic Department already Exist ')
    }
    next();
})

// another validation for if the departernt id isnt exist or not 

academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
    const querId = this.getQuery()
    const isDepartmentIdExist = await academicDepartment.findOne(querId);

    if(!isDepartmentIdExist){
        throw new AppError(404,'Acadmic department id doesnt excist')
    }
    next();

})


export const academicDepartment= model <TAcademicDepartment>('academicDepartment',academicDepartmentSchema);