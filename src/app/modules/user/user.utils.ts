import { TAcademicSemester } from "../academicSemester/academicSemester.type";
import { User } from "./user.model";

// find last Student 
const findLastStudent= async()=>{
    const lastSTudent = await User.findOne(
        {role:'student'},
        {id:1,_id:0}
    ).sort({
        createdAt:-1
    })
    .lean()
    return lastSTudent?.id ?lastSTudent.id :undefined
}



// Year semisterCode 4 digit number
export const generateStudentId =async (payload: TAcademicSemester)=>{



    // first time 0000

    let  currentId = (0).toString(); //default Student id 0000
    const lastSTudentId = await findLastStudent() ;  // call database 

    const lastStudentSemesterCode = lastSTudentId?.substring(4,6); //01
    const lastStudentYear = lastSTudentId?.substring(0,4); //2023
    const currentSemesterCode = payload.code;
    const currentStudentYear = payload.year;
    if(lastSTudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentStudentYear){
        currentId = lastSTudentId.substring(6) //0001
    }



    let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;

}