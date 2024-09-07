import { AcademicDepartment } from "./academicDepartment.model";
import { TAcademicDepartment, TAcademicDepartmentUpdate } from "./academicDepartment.type";


const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment ) => {

    const result = await AcademicDepartment.create(payload);
    return result;
}

// Get All Semester From Db Use Find Query  
const getAllDepartmentIntoDb = async ()=>{
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
}

// Get Single Semester From Query  Using FindOne
const getSingleDepartmentFromDb = async (_id:string)=>{
    const result = await AcademicDepartment.findOne({_id}).populate('academicFaculty');
    return result;
}

// Upadte Semester 
const updateDepartmentFromDb =async(departmentId:string,payload:Partial<TAcademicDepartmentUpdate>)=>{

    const result = await AcademicDepartment.findByIdAndUpdate(departmentId,{$set:payload},{new:true,runValidators: true});
    return result;
}


export const academicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getAllDepartmentIntoDb,
    getSingleDepartmentFromDb,
    updateDepartmentFromDb
}