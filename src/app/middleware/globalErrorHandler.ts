import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";



const globalErrorHandler:ErrorRequestHandler = (error,req,res,next)=>{



    let statusCode = error.statusCode ||500;
    let  message =   error.message ||'Somethign went wrong ';
    

let errorSources:TErrorSources =[{
    path:'',
    message:'Something Went Wrong'
}]




if(error instanceof ZodError){
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message= simplifiedError?.message;
    errorSources= simplifiedError?.errorSources
}else if(error?.name ==='ValidationError'){
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message= simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
}else if(error?.name ==='CastError'){
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message= simplifiedError?.message;
    errorSources= simplifiedError.errorSources;
}else if(error?.code ===11000){
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message= simplifiedError?.message;
    errorSources= simplifiedError.errorSources;
}

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // error,
        stack:config.node_env ==='development'? error?.stack :null,

    })
}
export default globalErrorHandler; 