import  express  from 'express';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';


const router = express.Router();

router.post('/create-semester-registration',validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration);

router.get('/',semesterRegistrationControllers.getSemesterRegistration);

router.get('/:id',semesterRegistrationControllers.getSingleSemesterRegistration);

router.patch('/:id', validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema),semesterRegistrationControllers.updateSemesterRegistration);


export const semesterRegistrationRoutes = router;