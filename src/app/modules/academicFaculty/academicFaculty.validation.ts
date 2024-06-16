import { z } from "zod";



const academicFacultyValidationSchema = z.object({
    name: z.string({
        invalid_type_error:'Academic FAculty must be string'
    })
})

const createAcademicFacultyValidationSchema = z.object({
    body:z.object({
        name:z.string(),
    })
})
const updateAcademicFacultyValidationSchema = z.object({
    body:z.object({
        name:z.string().optional()
    })
})

export const AcademicFacultyValidations = {
     createAcademicFacultyValidationSchema,
     updateAcademicFacultyValidationSchema
}

export const academicFacultyValidation = {
    academicFacultyValidationSchema
}