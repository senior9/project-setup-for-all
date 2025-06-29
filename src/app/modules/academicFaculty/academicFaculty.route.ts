import  express  from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';




const router = express.Router();


router.post('/create-academic-faculties',validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty);

// get Route 
router.get('/',AcademicFacultyControllers.getAllFaculties);

// Get Single Semister 
router.get('/:facultyId',AcademicFacultyControllers.getSingleFacultyId);

// Upadte Faculty Data 
router.patch('/:facultyId', validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateSingleFaculty);



export const AcademicFacultyRoutes = router;