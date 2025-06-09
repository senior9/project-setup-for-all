export type TDays = 'Sat' |'Sun'|'Mon'|'Tue'| 'Wed'|'Thu'|'Fri';
export const Days = ['Sat' ,'Sun','Mon','Tue', 'Wed','Thu','Fri'];
export const regexTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ ;

export type TSchedule = {
    days:TDays[];
    startTime:string;
    endTime:string;
}


