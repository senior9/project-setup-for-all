import { TAcademisSemesterCode, TAcademisSemesterName, TMonths, TacademicSemesterNameCode } from "./academicSemester.type";

export const Months: TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
export const AcademicSemesterName :TAcademisSemesterName[] =[
'Autumn','Summer','Fall'
]
export const AcademicSemesterCode :TAcademisSemesterCode[] =[
'01','02','03'
]

export const academicSemesterNameCodeMapper:TacademicSemesterNameCode ={
  Autumn:'01',
  Summer:'02',
  Fall:'03'
}