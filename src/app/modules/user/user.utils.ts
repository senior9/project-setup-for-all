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
    return lastSTudent?.id ?lastSTudent.id.substring(6) :undefined
}



// Year semisterCode 4 digit number
export const generateStudentId =async (payload: TAcademicSemester)=>{
    // first time 0000

    const currentId = await findLastStudent() || (0).toString();
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;

}