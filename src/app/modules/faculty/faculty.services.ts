import { TFacultyUpdate } from './faculty.type';
import QueryBuilder from "../../builder/QueryBuilder"
import { facultySearchableFields } from "./faculty.contstant"
import { Faculty } from "./faculty.model"
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const getFacultyFromDb = async (query:Record<string,unknown>)=>{
    
    // User Nice method QueryBuilder 

    const facultyQuery = new QueryBuilder(Faculty.find().populate({
        path: 'academicDepartment',
        populate:{
            path: "academicFaculty"
        }
        
    }),query).search(facultySearchableFields).filter().sort().paginate().fields();
    const result = await facultyQuery.modelQuery;
    return result; 

}


// FInd Faculty Id From Db 

const getFacultyIdFromDb = async( _id: string)=>{
    const result = await Faculty.findOne({_id}).populate('user').populate({
        path:'academicDepartment',
        populate:{
            path:"academicFaculty"
        }
    })
    return result;
}

// Update Faculty Id INTO Db 

const updateFacultyIdIntoDb = async(id:string, payload: Partial<TFacultyUpdate>)=>{
    //Update for Primative and Non Primative Data from Database 
    const {name, ...remainingData} = payload;
    const modifiedUpdateFacultyData: Record<string,unknown> ={
        ...remainingData  //primative data is remainingsData others is non-primative Data that has an object property 
        
    }
    // ForName 
    if (name && Object.keys(name).length) {
        for(const [key,value] of Object.entries(name)){
            modifiedUpdateFacultyData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findOneAndUpdate({id},modifiedUpdateFacultyData,{new:true, runValidators:true});
    return result; 
}

// DElete faculty From Data 

const deleteFacultyFromDb = async(id:string)=>{
        // when we remove one data from two dataBase then we use transction
        const session = await mongoose.startSession();
        try {
            //Session Start 
            session.startTransaction();
            const deleteFaculty = await Faculty.findOneAndUpdate({id}, {isDeleted:true},{new:true,session});
            if (!deleteFaculty) {
                throw new AppError(httpStatus.BAD_REQUEST,'Failed To Delete Faculty')
            }
            await session.commitTransaction();
            await session.endSession();
            return deleteFaculty
            
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error('Failed to delete Faculty')
        }
}






// This is controller 
 
export const facultyServices = {
    getFacultyFromDb,
    getFacultyIdFromDb,
    updateFacultyIdIntoDb,
    deleteFacultyFromDb

} 