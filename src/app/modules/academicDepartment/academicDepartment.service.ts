import { academicDepartment } from "./academicDepartment.model";
import { TAcademicDepartment, TAcademicDepartmentUpdate } from "./academicDepartment.type";


const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment ) => {

    const result = await academicDepartment.create(payload);
    return result;
}

// Get All Semester From Db Use Find Query  
const getAllDepartmentIntoDb = async ()=>{
    const result = await academicDepartment.find();
    return result;
}

// Get Single Semester From Query  Using FindOne
const getSingleDepartmentFromDb = async (_id:string)=>{
    const result = await academicDepartment.findOne({_id});
    return result;
}

// Upadte Semester 
const updateDepartmentFromDb =async(departmentId:string,payload:Partial<TAcademicDepartmentUpdate>)=>{

    const result = await academicDepartment.findByIdAndUpdate(departmentId,{$set:payload},{new:true,runValidators: true});
    return result;
}


export const academicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getAllDepartmentIntoDb,
    getSingleDepartmentFromDb,
    updateDepartmentFromDb
}