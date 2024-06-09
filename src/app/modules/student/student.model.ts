import { TGuardian, TLocalGuardian, TStudent, StudentModel, TUserName } from './student.interface';
import { Schema, model } from 'mongoose';
// import validator from 'validator';

// User Schema
const userNameSchema = new Schema<TUserName>({
    firstName: { 
        type: String, 
        required: [true, "First name is required"], 
        trim: true, 

        //  validation function  if anyone can input ultapalta 
        // validate :{
        //     validator: function(value:string){
        //         const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        //         return firstNameStr === value
        //     },
        //     message :" {VALUE} is not maintain captalize format"
        // }
        // 
    },
    middleName: { type: String, trim: true },
    lastName: { 
        type: String, 
        required: [true, "Last name is required"], 
        trim: true,
        // validate:{
        //     validator: (value:string)=>validator.isAlpha(value),
        //     message:"{VALUE} is not perfectl correct "
        // }
    }
});

// Guardian Schema
const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: [true, "Father's name is required"], trim: true },
    fatherOccupation: { type: String, required: [true, "Father's occupation is required"], trim: true },
    fatherContactNo: { type: String, required: [true, "Father's contact number is required"], trim: true },
    motherName: { type: String, required: [true, "Mother's name is required"], trim: true },
    motherOccupation: { type: String, required: [true, "Mother's occupation is required"], trim: true },
    motherContactNo: { type: String, required: [true, "Mother's contact number is required"], trim: true }
});

// Local Guardian Schema
const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: [true, "Local guardian's name is required"], trim: true },
    occupation: { type: String, required: [true, "Local guardian's occupation is required"], trim: true },
    contactNo: { type: String, required: [true, "Local guardian's contact number is required"], trim: true },
    address: { type: String, required: [true, "Local guardian's address is required"], trim: true }
});

// Student Schema
// const studentSchema = new Schema<Student>({
    const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: [true, "ID is required"], unique: true, trim: true },
    user:{
        type:Schema.Types.ObjectId,
        required: [true, "ID is required"],
        unique:true,
        ref:'User',
    },
    name: {
        type: userNameSchema,
        required: [true, "Name is required"]
    },
    gender: {
        type: String,
        enum: {
            values: ["female", "male", "other"],
            message: "{VALUE} is not supported"
        },
        required: [true, "Gender is required"]
    },
    dateOfBirth: { type: String, trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, trim: true },
    contactNo: { type: String, required: [true, "Contact number is required"], trim: true },
    emergencyContactNo: { type: String, required: [true, "Emergency contact number is required"], trim: true },
    bloogGroup: {
        type: String,
        enum: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        trim: true
    },
    presentAddress: { type: String, required: [true, "Present address is required"], trim: true },
    permanentAddress: { type: String, required: [true, "Permanent address is required"], trim: true },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian information is required"]
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian information is required"]
    },
    profileImg: { type: String, trim: true },
    isDeleted:{
        type:Boolean,
        default:false
    },
    
},{toJSON: {
    virtuals: true,
  },
});
//  Creatinf Middleware 

studentSchema.pre('save', function(){
    
})







// creating custom static method 

studentSchema.statics.isUserExist = async function(id:string){
    const existingUser = await Student.findOne({id:id});
    return existingUser;
}
// custom static method end



// creating instance Method 
// studentSchema.methods.isUserExist =async function(id:string){
//     const existingUser = await Student.findOne({id:id});
//     return existingUser; 
// }

// Create the Student model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
