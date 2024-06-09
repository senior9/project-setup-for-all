import { Response } from "express";

type Tresponse <T>  ={
    statusCode : number;
    succuess:boolean;
    message?: string;
    data:T
}

const sendResponse =<T> (res:Response,data:Tresponse<T>)=>{
    res.status(data?.statusCode).json({
        succuess: data.succuess,
        message: data.message,
        data : data.data
    })
}
export default sendResponse ;