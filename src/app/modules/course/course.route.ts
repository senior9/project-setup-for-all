import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { courseValidation, createCourseValidationSchema } from './course.validation';

const router = express.Router();

router.get('/',CourseControllers.getAllCourses);
router.get('/:id',CourseControllers.getSingleCourse);

router.post("/create-course", validateRequest(createCourseValidationSchema),CourseControllers.createCourse)
router.patch("/:id", validateRequest(courseValidation.updateCourseValidationSchema),CourseControllers.updateCourse)
router.put("/:courseId/assign-faculties",validateRequest(courseValidation.FacultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse)
router.delete("/:courseId/remove-faculties",validateRequest(courseValidation.FacultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)

router.delete('/:id',CourseControllers.deleteCourse);

export const courseRoutes = router;