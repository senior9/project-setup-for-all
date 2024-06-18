
// import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudentUpdate } from "./student.interface";


// const createStudentDb =async (student:TStudent)=>{

//     // built in Static method 
//    const result =  await Student.create(student);
// //    return result;

// // static method
//    if(await Student.isUserExist(student.id)){
//     throw new Error('User already exist ')
//    }

// //    static method end

// //  Instance  method start 
// // const studentStaticMethod = new Student(student); //create instance method

// //  if(await studentStaticMethod.isUserExist(student.id)){
// //     throw new Error('User already exist ')
// //  }



// // const result = await studentStaticMethod.save();  // built in instance method 
// return result ;

// //  Instance method close
// }

const getStudentsFromDb = async () => {
    const result = await Student.find().populate('user').populate({
        path: 'academicDepartment', /// very very important point 
        populate: {
            path: 'academicFaculty'  /// very very important point 
        }
    }).populate('admissionSmester');
    return result;
}

const getStudentIdFromDb = async (id: string) => {
    // Find student from another method -> aggregate([{$match:{id}}])
    const result = await Student.findOne({ id }).populate('user').populate({
        path: 'academicDepartment', /// very very important point 
        populate: {
            path: 'academicFaculty'  /// very very important point 
        }
    }).populate('admissionSmester');
    return result;
}
const updateStudentIdIntoDb = async (id: string, payload: Partial<TStudentUpdate>) => {

    //Update for Primative and Non Primative Data from Database 

    const { name, localGuardian, guardian, ...remainingData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingData //primative data is remainingsData others is non-primative Data that has an object property 
    }

    // For name 
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    // For gurdian
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    // For locaGurdian
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    console.log(modifiedUpdatedData);
    // Find student from another method -> aggregate([{$match:{id}}])
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true })
    return result;
}

const deleteStdFromDb = async (id: string) => {
    // when we remove one data from two dataBase then we use transction
    const session = await mongoose.startSession();

    try {
        // SESSION START 
        session.startTransaction()
        const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student ')
        }

        const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user ')
        }

        await session.commitTransaction();
        await session.endSession();
        return deleteStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('falied to delete student ')
    }

}

// this is controller
export const studentServices = {
    // createStudentDb,
    getStudentsFromDb,
    getStudentIdFromDb,
    updateStudentIdIntoDb,
    deleteStdFromDb
};