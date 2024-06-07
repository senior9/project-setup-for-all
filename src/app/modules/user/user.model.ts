
import { Schema, model } from "mongoose";
import { Tuser } from "./user.type";


const useSchema = new Schema <Tuser>({
    id :{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    needPasswordChange:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        enum:['student','faculty','admin']
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:'in-progress'
    },
    isDelete:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

export  const User = model <Tuser>('user', useSchema);

