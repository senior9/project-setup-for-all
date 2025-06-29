import { z } from "zod";

// EnrolledCourse main validation
 const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const EnrolledCourseValidation={
    createEnrolledCourseValidationZodSchema
}