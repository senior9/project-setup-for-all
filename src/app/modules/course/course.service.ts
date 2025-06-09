import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { Course, CourseFaculty } from "./course.model"
import { TCourse, TCourseFaculty } from "./course.type";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


//create Course 
const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

// get All course from Db 
const getAllCourseFromDb = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .fields()
        .sort()
        .paginate()
        .filter();
    const result = await courseQuery.modelQuery;
    return result;
}

//get Single Course From Db 
const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

//update Course 

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
    //Update for Primative and Non Primative Data from Database 
    const { preRequisiteCourses, ...courseRemainingData } = payload;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidators: true, session });
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to update course info ")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePreRequisite = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map((el) => el.course);
            const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in:
                                deletePreRequisite
                        }
                    }
                }

            }, {
                new: true,
                runValidators: true,
                session
            })
            if (!deletePreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "failed to Delete course info ")
            }
            const newPreRequisites = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted);
            const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
            },
                {
                    new: true,
                    runValidators: true,
                    session
                })
            if (!newPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "failed to update course info ")
            }
        }
        const result = await Course.findById(id).populate('preRequisiteCourses.course');
        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Update Courses')
        }
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to update Courses')
    }
}

// delete Course 
const deleteCourseFromDb = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Delete Courses')
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

//assign faculties with course into db 
const assignFacultiesWithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    })
    return result;
}

const removeFacultiesFromCourseFromDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } }
    }, {
        new: true
    })
    return result;
}

export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    updateCourseIntoDb,
    deleteCourseFromDb,
    // other services for course like updateCourseFromDb, etc.
    assignFacultiesWithCourseIntoDb,
    removeFacultiesFromCourseFromDb
}