import  express  from 'express';
import { AcademisSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = express.Router();


router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademisSemesterControllers.createAcademicSemester);

// get Route 
router.get('/', AcademisSemesterControllers.getAllSemesters);

// Get Single Semister 
router.get('/:semesterId',AcademisSemesterControllers.getSingleSemesterId);

// Upadte Semester Data 
router.patch('/:semesterId', validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),AcademisSemesterControllers.updateSingleSmester);



export const AcademicSemesterRoutes = router;