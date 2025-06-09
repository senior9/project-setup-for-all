import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { createOfferedCourseValidationSchema, OfferedCourseValidation } from './offeredCourse.validation';
import validateRequest from '../../middleware/validateRequest';


const router = express.Router();

router.post("/create-offered-course", validateRequest(createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse)

router.get('/',OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id',OfferedCourseControllers.getSingleOfferedCourse);


router.patch("/:id", validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),OfferedCourseControllers.updateOfferedCourse)


router.delete("/:id",OfferedCourseControllers.deleteOfferCourse)

export const offeredCourseRoutes = router;