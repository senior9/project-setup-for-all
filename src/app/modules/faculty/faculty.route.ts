import express from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { UpdateFacultyValidationZodSchema } from './faculty.validation';



const router =express.Router();


router.get('/',facultyControllers.getAllFaculties);
router.get('/:facultyId',facultyControllers.getFacultyId);


router.patch('/:facultyId',validateRequest(UpdateFacultyValidationZodSchema), facultyControllers.updateFaculty)

router.delete('/:facultyId', facultyControllers.deleteFaculty);

export const facultyRoutes = router;


