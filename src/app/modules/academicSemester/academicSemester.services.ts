import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester, TSemesterUpdate } from "./academicSemester.type";



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
const getSingleSemesterFromDb = async (_id:string)=>{
    const result = await AcademicSemester.findOne({_id});
    return result;
}

// Upadte Semester 
const updateSemesterFromDb =async(semesterId:string,semesterData:Partial<TSemesterUpdate>)=>{
    const result = await AcademicSemester.findByIdAndUpdate(semesterId,{$set:semesterData},{new:true,runValidators: true});
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllSemesterIntoDb,
    getSingleSemesterFromDb,
    updateSemesterFromDb
}