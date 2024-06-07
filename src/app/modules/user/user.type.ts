export type Tuser = {
    id:string;
    password:string;
    needPasswordChange: boolean;
    role: 'studen' | 'faculty' | 'admin' ;
    status:'in-progress'| 'blocked' ;
    isDelete: boolean;
    
}
export type newUser ={
    password:string;
    role: string;
    id:string;
    
}