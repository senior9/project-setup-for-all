import { z } from "zod";


const preRequisiteCourseValidationSchema =z.object({
    course:z.string(),
    isDeleted:z.boolean().optional()
})
const updatePreRequisiteCourseValidationSchema =z.object({
    course:z.string().optional(),
    isDeleted:z.boolean().optional()
})


export const createCourseValidationSchema = z.object({
    body:z.object({
    title:z.string(),
    prefix:z.string(),
    code:z.number(),
    credits:z.number(),
    preRequisiteCourses :z.array(preRequisiteCourseValidationSchema),
    isDelete:z.boolean().optional(),
    })
})
export const updateCourseValidationSchema = z.object({
    body:z.object({
    title:z.string().optional(),
    prefix:z.string().optional(),
    code:z.number().optional(),
    credits:z.number().optional(),
    preRequisiteCourses :z.array(updatePreRequisiteCourseValidationSchema).optional(),
    isDelete:z.boolean().optional()
    })
})
export const FacultiesWithCourseValidationSchema =z.object({
    body:z.object({
        faculties:z.array(z.string())
    })
})
export const courseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    FacultiesWithCourseValidationSchema
}