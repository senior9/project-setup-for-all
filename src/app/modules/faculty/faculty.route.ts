import express from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { UpdateFacultyValidationZodSchema } from './faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';



const router =express.Router();


router.get('/',auth(USER_ROLE.admin),facultyControllers.getAllFaculties);
router.get('/:id',facultyControllers.getFacultyId);


router.patch('/:id',validateRequest(UpdateFacultyValidationZodSchema), facultyControllers.updateFaculty)

router.delete('/:id', facultyControllers.deleteFaculty);

export const facultyRoutes = router;


