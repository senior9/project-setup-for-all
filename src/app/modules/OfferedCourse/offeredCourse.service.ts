import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { OfferedCourse } from "./offeredCourse.model";
import { TOfferedCourse } from "./offeredCourse.type";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeconflict } from "./offeredCourse.utils";
import { RegistrationStatus } from "../semesterRegistration/semesterRegistration.constant";
import mongoose from "mongoose";



//create Course 
const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, endTime, startTime } = payload

    //cheeck semeister registration id exist or not 

    const isSemesterRegistrationExist = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester Register Not Found'
        )
    }

    const academicSemester = isSemesterRegistrationExist.academicSemester;

    //cheeck academicFaculty registration id exist or not 

    const isAcademicFaculty = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFaculty) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic Faculty Register Not Found'
        )
    }
    //cheeck academicDepartment registration id exist or not 

    const isAcademicDepartment = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartment) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic Department Register Not Found'
        )
    }
    //cheeck academicDepartment registration id exist or not 

    const isCourse = await Course.findById(course);
    if (!isCourse) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Course Register Not Found'
        )
    }
    //cheeck academicDepartment registration id exist or not 

    const isFaculty = await Faculty.findById(faculty);
    if (!isFaculty) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'faculty Register Not Found'
        )
    }


    //check if the department is belong to the faculty 
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    })
    // console.log(academicFaculty,academicDepartment);
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This ${isAcademicDepartment.name} is not belong to this ${isAcademicFaculty.name}`
        )
    }

    // check same offer course in same section in same registrer semester 
    const isSameOfferedCourseExistWithSameRegisterSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        section,
        course
    })
    if (isSameOfferedCourseExistWithSameRegisterSemesterWithSameSection) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Offered Course with same section already exist`)
    }

    //get the shedules of the faculty 

    const assignedShedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');

    const newShedule = {
        days,
        startTime,
        endTime
    };

    if (hasTimeconflict(assignedShedules, newShedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `The faculty  is not avilable at this time! Choose other time or date`)
    }

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;
};

// get All course from Db 
const getAllOfferedCourseFromDb = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(OfferedCourse.find().populate('semesterRegistration'), query)
        .fields()
        .sort()
        .paginate()
        .filter();
    const result = await courseQuery.modelQuery;
    return result;
}

//get Single Course From Db 
const getSingleOfferedCourseFromDb = async (id: string) => {
    const result = await OfferedCourse.findById(id).populate('semesterRegistration');
    return result;
}

//update Course 

const updateOfferedCourseIntoDb = async (id: string, payload: Pick<TOfferedCourse, 'days' | 'startTime' | 'endTime' | 'faculty'>) => {
    const { faculty, days, startTime, endTime } = payload;

    //checked offered Course avilable or not 
    const isOfferedCourseExist = await OfferedCourse.findById(id);
    if (!isOfferedCourseExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `Offered coursed not Found `)
    };
    // check faculty exist or not 
    const isFacultyExist = await Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `faculty not Found `)
    };

    //get the shedules of the faculty 
    const semesterRegistration = isOfferedCourseExist.semesterRegistration;

    //validation for semester registration status 

    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

    if (semesterRegistrationStatus?.status !== RegistrationStatus.UPCOMING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `you cant update  this  ${semesterRegistrationStatus?.status} semester `)
    }

    const assignedShedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');

    const newShedule = {
        days,
        startTime,
        endTime
    };

    if (hasTimeconflict(assignedShedules, newShedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `The faculty  is not avilable at this time! Choose other time or date`)
    }
    const result = await OfferedCourse.findByIdAndUpdate(id,
        payload, {
        new: true
    })
    return result;
}

// delete Course 
const deleteOfferedCourseFromDb = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const isOfferedCourseExist = await OfferedCourse.findById(id);
        if (!isOfferedCourseExist) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                `Offered coursed not Found `)
        };
        //get the shedules of the faculty 
        const semesterRegistration = isOfferedCourseExist.semesterRegistration;

        //validation for semester registration status 

        const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration).select('status');

        if (semesterRegistrationStatus?.status !== RegistrationStatus.UPCOMING) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                `you cant delete  this  ${semesterRegistrationStatus?.status} semester `)
        }

        const result = await OfferedCourse.findByIdAndDelete(id);
        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Delete Offered Courses')
        }
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete Courses')
    }
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDb,
    getAllOfferedCourseFromDb,
    getSingleOfferedCourseFromDb,
    updateOfferedCourseIntoDb,
    deleteOfferedCourseFromDb
}