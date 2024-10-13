import { Course } from "./course.model"
import { TCourse } from "./course.type";


//create Course 
const createCourseIntoDb = async(payload:TCourse)=>{
    const result = await Course.create(payload);
    return result;
};

// get All course from Db 
const getAllCourseFromDb = async()=>{
    const result = await Course.find();
    return result;
}

//get Single Course From Db 
const getSingleCourseFromDb = async(id:string)=>{
    const result = await Course.findById(id);
    return result;
}

// delete Course 
const deleteCourseFromDb = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id,{isDeleted:true},{new:true});
    return result; 
}

export const  CourseServices = {
 createCourseIntoDb,
 getAllCourseFromDb,
 getSingleCourseFromDb,
 deleteCourseFromDb,
 // other services for course like updateCourseFromDb, etc.
}