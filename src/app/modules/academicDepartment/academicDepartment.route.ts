import  express  from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDeparmentValidations } from './academicDepartment.validations';




const router = express.Router();


router.post('/create-academic-department',validateRequest(AcademicDeparmentValidations.createAcademicDeparmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment);

// get Route 
router.get('/', AcademicDepartmentControllers.getAllDepartments);

// Get Single Semister 
router.get('/:departmentId',AcademicDepartmentControllers.getSingleDepartmentId);

// Upadte Department Data 
router.patch('/:departmentId', validateRequest(AcademicDeparmentValidations.updateAcademicDeparmentValidationSchema),AcademicDepartmentControllers.updateSingleDepartment);



export const AcademicDepartmentRoutes = router;