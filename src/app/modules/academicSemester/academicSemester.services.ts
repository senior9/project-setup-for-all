import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester } from "./academicSemester.type";



const createAcademicSemesterIntoDb = async(payload: TAcademicSemester)=>{



if(academicSemesterNameCodeMapper[payload.name]!==payload.code){
    throw new Error('Semester code Invalid')
}


    const result = await AcademicSemester.create(payload);
    return result;
}


export const AcademicSemesterServices ={
    createAcademicSemesterIntoDb
}