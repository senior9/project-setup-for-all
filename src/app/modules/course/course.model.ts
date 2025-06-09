
import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TpreRequisiteCourses } from "./course.type";



// preRequisiteSchema 
const preRequisiteCoursesSchema = new Schema<TpreRequisiteCourses>({
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course',
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

},
{
    _id: false,
  },)


//course Schema 
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
//make assign faculty course model 

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
     type:Schema.Types.ObjectId,
      ref:'Course',
      unique:true
  },
  faculties:[  {
     type:Schema.Types.ObjectId,
      ref:'Faculty',
  }],
})


// make model 
export const Course = model<TCourse>('Course',courseSchema);

// make course faculty  model 
export const CourseFaculty = model<TCourseFaculty>('CourseFaculty',courseFacultySchema);
