import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUsername } from "./faculty.type";
import { BloodGroup, Gender } from "./faculty.contstant";


// UserNameSchema 

const UserNameSchema = new Schema<TUsername>({
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



// Faculty Schema
const facultySchema = new Schema <TFaculty,FacultyModel >({
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
    academicDepartment:{
        type:Schema.Types.ObjectId,
        required:[true,"academicDepartment is required"],
        ref:'User'
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
facultySchema.virtual('fullName').get(function(){
    return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
});


//  Filterout Deleted Documents 
facultySchema.pre('find', function(next){
    this.find({isDeleted:{$ne:true}});
    next();
})
facultySchema.pre('findOne', function(next){
    this.find({isDeleted:{$ne:true}});
    next();
})
facultySchema.pre("aggregate", function(next){
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
    next();
});

// Check If User Exist or not 

facultySchema.statics.isUserExist = async function(id: string){
    const existingUser = await Faculty.findOne({id:id});
    return existingUser;
}


// Create the Faculty Model 
export const Faculty = model<TFaculty, FacultyModel>('Faculty',facultySchema)
