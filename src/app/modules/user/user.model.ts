
import { Schema, model } from "mongoose";
import { Tuser } from "./user.type";
import config from "../../config";
import bcrypt from 'bcrypt'


const userSchema = new Schema <Tuser>({
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
        required:false
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


//  Pre save middle ware/hook: work on craete () or save() 
userSchema.pre('save', async function(next){
    const user =this ;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round),);
    next();
})

// Post save middle ware 
userSchema.post('save', function(doc, next){
    doc.password ='';
    next();
})

export  const User = model <Tuser>('User', userSchema);

