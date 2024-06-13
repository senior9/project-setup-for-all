import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester } from "./academicSemester.type";



const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {


    // Error handling craete academis Semister 
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Semester code Invalid')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

// Get All Semester From Db Use Find Query  
const getAllSemesterIntoDb = async ()=>{
    const result = await AcademicSemester.find();
    return result;
}

// Get Single Semester From Query  Using FindOne
const getSingleSemester = async (_id:string)=>{
    const result = await AcademicSemester.findOne({_id});
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllSemesterIntoDb,
    getSingleSemester
}