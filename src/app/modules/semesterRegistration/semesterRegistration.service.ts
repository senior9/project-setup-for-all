import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.type";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationIntoDb = async(payload:TSemesterRegistration)=>{

    const academicSemester = payload?.academicSemester;

    // if thee are  any upcoming or ongoing semester already exist or not 

    const isThereAnyUpcomingOrOngoingSemester =await SemesterRegistration.findOne({
        $or:[
            {status:RegistrationStatus.UPCOMING},
            {status:RegistrationStatus.ONGOING}
        ],
    })

    if(isThereAnyUpcomingOrOngoingSemester){
         throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is alreay a ${isThereAnyUpcomingOrOngoingSemester.status}`
        )
    }


    //check if the semester is Exist or not 

    const isAcademicsemesterExist = await AcademicSemester.findById(academicSemester);
    if(!isAcademicsemesterExist){
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This academicSemester not Found !'
        )
    }
    const isSemesterRegistrationExist = SemesterRegistration.findOne({
        academicSemester
    })
    if(!isSemesterRegistrationExist){
        throw new AppError(
            httpStatus.CONFLICT,
            'This semester is already exist '
        )
    }
const result = await SemesterRegistration.create(payload);
return result;
}

// get all Semester Registration
const getAllSemesterRegistrationIntoDb = async(query:Record<string,unknown>)=>{
const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester')
,query).filter().paginate().sort().fields()
const result = await semesterRegistrationQuery.modelQuery;
return result;
}
// Get Single Registration 
const getSingleSemesterRegistrationIntoDb = async(id:string)=>{

const result = await SemesterRegistration.findById(id);

return result;


}
const updateSemesterRegistrationIntoDb = async(id:string,payload:Partial<TSemesterRegistration>)=>{
 // check if the requested Semester id is Exist or not 

 const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
 const requestedSemesterStatus = payload?.status;
    if(!isSemesterRegistrationExist){
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This semester is not found  '
        )
    }


    // if the requested semester is already ended, we will not update anything 
    const currentSemesterStatus = isSemesterRegistrationExist.status;
    if(currentSemesterStatus===RegistrationStatus.ENDED){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This requested Semester alreay  ${currentSemesterStatus}`
        )
    }

    // if the  current status is upcoming you cant update to ended 
    if(currentSemesterStatus ===RegistrationStatus.UPCOMING && requestedSemesterStatus===RegistrationStatus.ENDED){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You cant Change Semester status from ${currentSemesterStatus} to ${requestedSemesterStatus} `
        )
    }
    // if the  current status is Ongoing  you cant update to Upcoming  
    if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedSemesterStatus===RegistrationStatus.UPCOMING){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You cant Change Semester status from ${currentSemesterStatus} to ${requestedSemesterStatus} `
        )
    }
    const result = await SemesterRegistration.findByIdAndUpdate(id,payload,{
        new:true,
        runValidators:true
    })
    return result;
}


export const semesterRegistrationServices ={
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationIntoDb,
    getSingleSemesterRegistrationIntoDb,
    updateSemesterRegistrationIntoDb
}