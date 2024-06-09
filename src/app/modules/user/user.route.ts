import express from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationZodSchema } from "../student/student.validation.zod";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();




router.post('/create-student', validateRequest(createStudentValidationZodSchema), UserControllers.createStudent);

export const userRoutes = router;