import express from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { UpdateFacultyValidationZodSchema } from './faculty.validation';



const router =express.Router();


router.get('/',facultyControllers.getAllFaculties);
router.get('/:id',facultyControllers.getFacultyId);


router.patch('/:id',validateRequest(UpdateFacultyValidationZodSchema), facultyControllers.updateFaculty)

router.delete('/:id', facultyControllers.deleteFaculty);

export const facultyRoutes = router;


