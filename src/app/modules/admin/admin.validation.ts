import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";


const UserNameValidationSchema = z.object({
    firstName:z.string().min(1).max(20).refine((value)=>/^[A-Z]/.test(value),{
        message:'First Name start with Capital letter'
    }),
    middleName: z.string(),
    lastName: z.string(),
});

export const createAdminValidationZodSchema = z.object({
    body:z.object({
        password:z.string().max(20) ,
        faculty:z.object({
            designation:z.string(),
            name:UserNameValidationSchema,
            gender:z.enum([...Gender] as [string,...string[]]),
            dateOfBirth:z.string().optional(),
            email:z.string().email(),
            contactNo:z.string(),
            emergencyContactNo:z.string(),
            bloodGroup:z.enum([...BloodGroup] as [string, ...string[]]),
            presentAdress:z.string(),
            permanentAdress:z.string(),
            profileImage:z.string(),
        })
    })

});


const UpdateUserNameValidationSchema = z.object({
    firstName:z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});


export const UpdateAdminValidationZodSchema = z.object({
    body:z.object({
        password:z.string().max(20) ,
        faculty:z.object({
            designation:z.string().optional(),
            name:UpdateUserNameValidationSchema,
            gender:z.enum([...Gender] as [string,...string[]]).optional(),
            dateOfBirth:z.string().optional(),
            email:z.string().email().optional(),
            contactNo:z.string().optional(),
            emergencyContactNo:z.string().optional(),
            bloodGroup:z.enum([...BloodGroup] as [string, ...string[]]).optional(),
            presentAdress:z.string().optional(),
            permanentAdress:z.string().optional(),
            profileImage:z.string().optional(),
        })
    })

});

export const AdminValidation = {
    createAdminValidationZodSchema,
    UpdateAdminValidationZodSchema
}