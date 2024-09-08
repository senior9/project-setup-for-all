import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.type";
import { BloodGroup, Gender } from "./admin.constant";


// UserNameSchema 
const UserNameSchema = new Schema<TUserName>({
    firstName:{
        type:String,
        required:[true,"FirstName is required"],
        trim:true,
    },
    middleName:{
        type:String,
        trim:true
    },
    lastName:{ 
        type: String, 
        required:[true,"Last name is required"],
        trim: true 
    }
})

// Admin Schema
const adminSchema = new Schema <TAdmin,AdminModel >({
    id:{type:String, required:[true,"ID is required"], unique:true, trim:true},
    user:{
        type:Schema.Types.ObjectId,
        required:[true, "user Id is required"],
        unique:true,
        ref:'User'
    },
    name:{
        type:UserNameSchema,
        required:[true, 'Name is required'],
        trim:true
    },
    designation:{
        type:String,
        required:[true, 'designation is required'],
    },
    gender:{
        type:String,
        enum:{
            values:Gender,
            message: '{VALUE} is not a valid gender',
        },
        required:[true,'gender is required'],
    },
    dateOfBirth:{
        type:Date
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    contactNo:{
        type:String,
        required:[true,"contactNo is required"],
    },
    emergencyContactNo:{
        type:String,
        required:[true,"emergencyContactNo is required"],
    },
    bloodGroup:{
        type:String,
        enum:{
            values:BloodGroup,
            message:'{VALUE} is not a valid bloodGroup'
        },
        required:[true,"bloodGroup is required"],

    },
    presentAdress:{
        type:String,
        required:[true,"presentAdress is required"],
    },
    permanentAdress:{
        type:String,
        required:[true,"permanentAdress is required"]
    },
    profileImage:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{toJSON:{
    virtuals:true
}

});

// Virtual
adminSchema.virtual('fullName').get(function(){
    return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
});

//  Filterout Deleted Documents 
adminSchema.pre('find', function(next){
 this.find({isDeleted:{$ne:true}});
 next();
})

adminSchema.pre('findOne', function(next){
    this.findOne({isDeleted:{$ne:true}});
    next();
});

adminSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
    next();
})

// Check If User Exist or not 
adminSchema.statics.isUserExist= async function(id:string){
    const existingUser = await Admin.findOne({id:id});
    return existingUser;
}


// create Admin Model 

export const Admin= model<TAdmin, AdminModel>('Admin',adminSchema) 