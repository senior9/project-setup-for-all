import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder"
import { adminSearchableFields } from "./admin.constant"
import { Admin } from "./admin.model"
import { TadminUpadte } from "./admin.type";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";


const getAdminFromDb = async(query:Record<string,unknown>)=>{
    // User Nice method QueryBuilder 

    const adminQuery = new QueryBuilder(Admin.find(),query).search(adminSearchableFields).filter().sort().paginate().fields();

    const  result = await adminQuery.modelQuery;
    return result;
}

// FInd Admin Id From Db

const getAdminIdFromDb = async(id:string)=>{
    const result = await Admin.findById(id);
    return result;

}

// upadte Admin 

const updateAdminIdFromDb = async(id:string,payload: Partial<TadminUpadte>)=>{
         //Update for Primative and Non Primative Data from Database 

         const {name,...remainingData} = payload;
         const modifiedUpadtedAdminData: Record<string,unknown>={
                ...remainingData ////primative data is remainingsData others is non-primative Data that has an object property 
         }
         //Forname
         if(name && Object.keys(name).length){
            for(const [key,value] of Object.entries(name)){
                modifiedUpadtedAdminData[`name.${key}`] = value;
         }
        }

          const result = await Admin.findOneAndUpdate({id},modifiedUpadtedAdminData,{new:true,runValidators:true});
          return result;

}

//dELETE Admin From Db 

const deleteAdminFromDb = async(id:string)=>{
    // start Session 
    const session = await mongoose.startSession();

    try {

        //start Session 

        session.startTransaction();

        const deleteAdmin = await Admin.findOneAndUpdate({id},{isDeleted:true},{new:true, session});
        if(!deleteAdmin){
            throw new AppError(httpStatus.BAD_REQUEST,'failed to delete Admin');
        }

          // get user _id from deletedAdmin

        const userId = deleteAdmin.user;
        const deleteUser = await User.findOneAndUpdate({userId},{isDeleted:true},{new:true, session});
        if(!deleteUser){
            throw new AppError(httpStatus.BAD_REQUEST,'failed to delete user');
        }
        
        

        await session.commitTransaction();
        await session.endSession();
        return deleteAdmin;
        
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to Delete Admin')
        
    }


}




export const AdminServices = {
    getAdminFromDb,
    getAdminIdFromDb,
    updateAdminIdFromDb,
    deleteAdminFromDb


}