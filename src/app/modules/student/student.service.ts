
// import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudentUpdate } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchAbleFields } from "./student.constant";


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

const getStudentsFromDb = async (query:Record<string,unknown>) => {
    // const searchAbleFields =['email','name.firstName','presentAdress'];
    // let searchTerm= '';
    // const queryObject = {...query} //copy Query 

//     if(query?.searchTerm){
//         searchTerm=query?.searchTerm as string
//     }

//     // takeout SearchQuery for chaining method for use filtering thats why define search query in different memory
// const searchQuery = Student.find({
//     $or:searchAbleFields.map((field)=>({
//         [field]:{$regex:searchTerm,$options:'i'}
//     }))
// })

//filtering
// const excludeFields = ['searchTerm','sort','limit','page','fields'];
// excludeFields.forEach((el)=>delete queryObject[el]);
// console.log(query, queryObject) 

// // use query for filtering data
//     const filterQuery = searchQuery.find(queryObject).populate('user').populate({
//         path: 'academicDepartment', /// very very important point 
//         populate: {
//             path: 'academicFaculty'  /// very very important point 
//         }
//     }).populate('admissionSmester');

    // sorting method use chaining
//     let sort = '-createdAt';
//     if (query.sort) {
//         sort = query.sort as string;
//     }
//    const sortQuery = filterQuery.sort(sort);

//    //limit method use chaining
//     let limit = 1;
//     let page =1;
//     let skip = 0 ;
//     if (query.limit) {
//         limit = query.limit as number;
//     }

//     // pagination use chaining 
//     if (query.page) {
//         page = query.page as number
//         skip = (page -1)*limit as number
//     }
//     const paginateQuery = sortQuery.skip(skip)

//     const limitQuery =  paginateQuery.limit(limit);


    // fields filtering by chaining

    // let fields ='-__v' ;
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    // }

    // const fieldsFiltering = await limitQuery.select(fields);

    // return fieldsFiltering;

// User QUeryBuilder

const studentQuery = new QueryBuilder(Student.find().populate('user').populate({
    path: 'academicDepartment', /// very very important point 
    populate: {
        path: 'academicFaculty'  /// very very important point 
    }
}).populate('admissionSmester'),query).search(searchAbleFields).filter().sort().paginate().fields();

const result = await studentQuery.modelQuery;
return result;

}

const getStudentIdFromDb = async (id: string) => {
    // Find student from another method -> aggregate([{$match:{id}}])
    const result = await Student.findById( id ).populate('user').populate({
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
    const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, { new: true, runValidators: true })
    return result;
}

const deleteStdFromDb = async (id: string) => {
    // when we remove one data from two dataBase then we use transction
    const session = await mongoose.startSession();

    try {
        // SESSION START 
        session.startTransaction()
        const deleteStudent = await Student.findByIdAndUpdate( id , { isDeleted: true }, { new: true, session });
        if (!deleteStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student ')
        }

        // get user id from deleted student 
        
        const userId = deleteStudent.user;

        const deleteUser = await User.findByIdAndUpdate( userId , { isDeleted: true }, { new: true, session });
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