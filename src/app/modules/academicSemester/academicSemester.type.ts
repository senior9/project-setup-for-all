
export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type TAcademisSemesterName = 'Autumn'|'Summer'|'Fall';
export type TAcademisSemesterCode = '01'|'02'|'03';


export type TAcademicSemester = {
    name:TAcademisSemesterName;
    code:TAcademisSemesterCode;
    year:string;
    startMonth:TMonths;
    endMonth:TMonths;

}

// academicSemester Name Code 

    
export type TacademicSemesterNameCode ={
  [key:string]:string
}

//  update Semester Data 
export type TSemesterUpdate = Partial<TAcademicSemester>;