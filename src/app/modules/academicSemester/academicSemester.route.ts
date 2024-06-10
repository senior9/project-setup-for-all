import  express  from 'express';
import { AcademisSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = express.Router();


router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademisSemesterControllers.createAcademicSemester)



export const AcademicSemesterRoutes = router;