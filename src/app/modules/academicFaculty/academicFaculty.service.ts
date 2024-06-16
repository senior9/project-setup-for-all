import { academicFaculty } from "./academicFaculty.model";
import { TAcademicFacultyUpdate, TacademicFaculty } from "./academicFaculty.type";


const createAcademicFacultyIntoDb = async (payload: TacademicFaculty ) => {

    const result = await academicFaculty.create(payload);
    return result;
}

// Get All Semester From Db Use Find Query  
const getAllSemesterIntoDb = async ()=>{
    const result = await academicFaculty.find();
    return result;
}

// Get Single Semester From Query  Using FindOne
const getSingleSemesterFromDb = async (_id:string)=>{
    const result = await academicFaculty.findOne({_id});
    return result;
}

// Upadte Semester 
const updateSemesterFromDb =async(semesterId:string,payload:Partial<TAcademicFacultyUpdate>)=>{

    const result = await academicFaculty.findByIdAndUpdate(semesterId,{$set:payload},{new:true,runValidators: true});
    return result;
}


export const academicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllSemesterIntoDb,
    getSingleSemesterFromDb,
    updateSemesterFromDb
}