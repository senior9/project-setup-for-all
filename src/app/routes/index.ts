import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { adminRoutes } from "../modules/admin/admin.route";




const router = Router();


const moduleRoutes =[
    {
        path:'/users',
        route: userRoutes
    },
    {
        path:'/students',
        route: studentRoutes
    },
    {
        path:'/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path:'/academic-faculties',
        route:AcademicFacultyRoutes
    },
    {
        path:'/academic-departments',
        route:AcademicDepartmentRoutes
    },
    {
        path:'/faculties',
        route:facultyRoutes
    },
    {
        path:'/admins',
        route:adminRoutes
    },
    
]

moduleRoutes.forEach(route =>router.use(route.path, route.route));


export default router;