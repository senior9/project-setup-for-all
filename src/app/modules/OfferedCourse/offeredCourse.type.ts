import { Types } from "mongoose"
import { TDays } from "./offeredCourse.constant";

export type TOfferedCourse ={
    semesterRegistration:Types.ObjectId;
    academicSemester?:Types.ObjectId;
    academicFaculty:Types.ObjectId;
    academicDepartment:Types.ObjectId;
    course:Types.ObjectId;
    faculty:Types.ObjectId;
    maxCapacity:number;
    section:number;
    days:TDays[];
    startTime:string;
    endTime:string
}