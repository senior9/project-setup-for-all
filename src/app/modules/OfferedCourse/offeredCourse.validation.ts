import { z } from "zod";
import { Days, regexTime } from "./offeredCourse.constant";



const timeStringSchema=z.string().refine((time)=>{
    return regexTime.test(time);
  },{
    message:'Invaid Time Format , Expected HH:MM in 24 Hours Format '
  })

export const createOfferedCourseValidationSchema = z.object({
    body:z.object({
  semesterRegistration: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  course: z.string(),
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum([...Days] as [string, ...string[]])), // Ensuring non-empty array
  startTime:timeStringSchema ,
  endTime:timeStringSchema,
    }).refine((body)=>{
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end =new Date(`1970-01-01T${body.endTime}:00`);
      return end>start;
    },{
      message:'Start time should be before end time '
    })
})
export const updateOfferedCourseValidationSchema = z.object({
    body:z.object({
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum([...Days] as [string, ...string[]])), // Ensuring non-empty array
  startTime:timeStringSchema,
  endTime: timeStringSchema,
    }).refine((body)=>{
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end =new Date(`1970-01-01T${body.endTime}:00`);
      return end>start;
    },)
})

export const OfferedCourseValidation={
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}