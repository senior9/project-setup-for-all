import { z } from "zod";
import { userStatus } from "./user.constant";
import { string } from "joi";

// Define the Zod schema for validation
const userZodValidationSchema = z.object({
    
    // id: z.string(), //server handle this

    password: z.string({
    invalid_type_error:'Password must be string'
    }).max(20,{message:'PAssword ant be more than 20 character'}).optional(),

    
    // needPasswordChange: z.boolean().optional().default(true), //don't need 
    // role: z.enum(['student', 'faculty', 'admin']), // its depend fromm api end point 
    // status: z.enum(['in-progress', 'blocked']).default('in-progress'), // no need to validate 
    // isDelete: z.boolean().optional().default(false) // // no need to validate 
  });

  const changeStatusValidationSchema = z.object({
    body:z.object({
      status:z.enum([...userStatus] as [string,...string[]])
    })
  })
  export const userValidationByZod = {
    userZodValidationSchema,
    changeStatusValidationSchema
  }