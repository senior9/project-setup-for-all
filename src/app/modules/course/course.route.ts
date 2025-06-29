import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { courseValidation, createCourseValidationSchema } from './course.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/',auth(USER_ROLE.admin),CourseControllers.getAllCourses);
router.get('/:id',CourseControllers.getSingleCourse);

router.post("/create-course", validateRequest(createCourseValidationSchema),CourseControllers.createCourse)
router.patch("/:id", validateRequest(courseValidation.updateCourseValidationSchema),CourseControllers.updateCourse)
router.put("/:courseId/assign-faculties",validateRequest(courseValidation.FacultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete("/:courseId/remove-faculties",validateRequest(courseValidation.FacultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)

router.delete('/:id',CourseControllers.deleteCourse);

export const courseRoutes = router;