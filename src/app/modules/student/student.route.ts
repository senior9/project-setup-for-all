import  express  from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation.zod";


const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/',StudentControllers.getAllStudents);
router.get('/:id',StudentControllers.getStudentId )

router.patch('/:id',validateRequest(updateStudentValidationSchema),StudentControllers.updateStudentId )

router.delete('/:id', StudentControllers.deleteStudent);

export const  studentRoutes = router;