import express,{NextFunction, Request, Response} from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationZodSchema } from "../student/student.validation.zod";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationZodSchema } from "../faculty/faculty.validation";
import { createAdminValidationZodSchema } from "../admin/admin.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { userValidationByZod } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();




router.post('/create-student',auth(USER_ROLE.admin),
upload.single('file'),
//middlaware for upload validation
(req:Request,res:Response,next:NextFunction)=>{
req.body=JSON.parse(req.body.data);
next();
} ,validateRequest(createStudentValidationZodSchema), UserControllers.createStudent);
router.post('/create-faculty',auth(USER_ROLE.admin), validateRequest(createFacultyValidationZodSchema), UserControllers.createfaculty);
router.post('/create-admin',
    // auth(USER_ROLE.admin),
    validateRequest(createAdminValidationZodSchema), UserControllers.craeteAdmin);
router.post('/change-status/:id',
    auth(USER_ROLE.admin),
    validateRequest(userValidationByZod.changeStatusValidationSchema), UserControllers.changeStatus);
router.get('/me',
    auth('student','admin','faculty'), UserControllers.getMe);

export const userRoutes = router;