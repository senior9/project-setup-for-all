
// import { TStudent } from "./student.interface";
import { Student } from "./student.model";


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

const getStudentsFromDb = async ()=>{
    const result = await Student.find();
    return result ;
}

const getStudentIdFromDb = async (id:string)=>{
    const result = await Student.findOne({id});
    return result ;
}

// this is controller
export const studentServices ={
    // createStudentDb,
    getStudentsFromDb,
    getStudentIdFromDb
};