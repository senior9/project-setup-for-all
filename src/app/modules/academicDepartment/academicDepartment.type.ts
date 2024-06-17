import { Types } from "mongoose";

export type TAcademicDepartment ={
    name:string;
    academicFaculty:Types.ObjectId;
}

//  update Semester Data 
export type TAcademicDepartmentUpdate = Partial<TAcademicDepartment>;