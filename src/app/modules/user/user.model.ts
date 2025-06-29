
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.type";
import config from "../../config";
import bcrypt from 'bcrypt'
import { userStatus } from "./user.constant";


const userSchema = new Schema <TUser,UserModel>({
    id :{
        type: String,
        required: true,
        unique:true
    },
    email :{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        select:0
    },
    needPasswordChange:{
        type:Boolean,
        default:true,

    },
    passwordChangeAt:{
        type:Date,

    },
    role:{
        type:String,
        enum:['student','faculty','admin']
    },
    status:{
        type:String,
        enum:userStatus,
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

userSchema.statics.isUserExistByCustomId=async function(id:string){
return await User.findOne({id}).select('+password')
}
userSchema.statics.isPasswordMatched= async function(plainTextPassword,hashTextPassword){
    return await bcrypt.compare(plainTextPassword,hashTextPassword);
}
userSchema.statics.isJwtIssuedBeforeChanged=function(passwordChangedTimeStamps:Date,jwtIssuedTimeStamps:number){
const passwordChangedTime = new Date(passwordChangedTimeStamps).getTime()/1000;
return passwordChangedTime>jwtIssuedTimeStamps ;
}

export  const User = model <TUser,UserModel>('User', userSchema);

