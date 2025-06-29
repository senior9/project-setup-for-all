import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { EnrolledCourseContollers } from "./enrolledCourse.controller";

const router = express.Router();

router.post('/create-enrolled-course',validateRequest(EnrolledCourseValidation.createEnrolledCourseValidationZodSchema),EnrolledCourseContollers.creatEnrollmentCourse)



export const EnrollmentCourse = router;