import express from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationZodSchema } from "../student/student.validation.zod";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationZodSchema } from "../faculty/faculty.validation";
import { createAdminValidationZodSchema } from "../admin/admin.validation";

const router = express.Router();




router.post('/create-student', validateRequest(createStudentValidationZodSchema), UserControllers.createStudent);
router.post('/create-faculty', validateRequest(createFacultyValidationZodSchema), UserControllers.createfaculty);
router.post('/create-admin', validateRequest(createAdminValidationZodSchema), UserControllers.craeteAdmin);

export const userRoutes = router;