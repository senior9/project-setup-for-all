import { Gurdian, LoaclGurdian, Student, UserName } from './student.interface';
import { Schema, model } from 'mongoose';


// userSchema

const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true }
})
const gurdianSchema = new Schema<Gurdian>({
    fatherName: { type: String, required: true },
    fatherOcupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOcupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
})
const localGurdianSchema = new Schema<LoaclGurdian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    adress: { type: String, required: true },
})



const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: ["female", "male"],
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contacNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
    presentAdress: { type: String, required: true },
    permanentAdress: { type: String, required: true },
    gurdian: gurdianSchema,
    localGurdian: localGurdianSchema,
    profileImg: { type: String },
    isActive: ["active", "inActive"]

})


// 3. Create a Model.
export const StudentModel = model<Student>('StudentModel', studentSchema);


