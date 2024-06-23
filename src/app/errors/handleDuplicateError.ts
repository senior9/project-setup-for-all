import { TErrorSources, TGenericErrorResponse } from './../interface/error';



const handleDuplicateError = (error:any):TGenericErrorResponse=>{
const match = error.message.match(/"([^"]*)"/);
 // The extracted value will be in the first capturing group
 const extractedMessage = match && match[1];
const errorSources:TErrorSources = [
    {
        path:'',
        message:`${extractedMessage} is alreday exist`
    }
]

const statusCode =400;

return{
    statusCode,
    message:' Duplicate Error',
    errorSources,
}

}
export default handleDuplicateError;