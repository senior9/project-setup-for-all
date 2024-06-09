export type Tuser = {
    id:string;
    password:string;
    needPasswordChange: boolean;
    role: 'student' | 'faculty' | 'admin' ;
    status:'in-progress'| 'blocked' ;
    isDelete: boolean;
    
}
