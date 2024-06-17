import { z } from "zod";



const academicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error:'Academic Department must be string',
        required_error:'Name is  Required'
    }),
    academicFaculty:z.string({
        invalid_type_error:'Academic Faculty must be string',
        required_error:'faculty is Required'
        
    })
})

const createAcademicDeparmentValidationSchema = z.object({
    body:z.object({
        name:z.string(),
        academicFaculty:z.string(),
        
    })
})
const updateAcademicDeparmentValidationSchema = z.object({
    body:z.object({
        name:z.string().optional(),
        academicFaculty:z.string().optional(),
    })
})

export const AcademicDeparmentValidations = {
     createAcademicDeparmentValidationSchema,
     updateAcademicDeparmentValidationSchema
}

export const academicDeparmentValidation = {
    academicDepartmentValidationSchema
}