
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



//  creat new student 
const createStudent =catchAsync( async (req, res,) => {

        const { password , student:studentData } = req.body;


        const result = await userServices.createStudentDb(password,studentData);

        // if(error){
        //     res.status(500).json({
        //         succuess: true,
        //         message: "Typical mistake",
        //         error: error.details
        //     })
        // }

        
        //  this method was mandan amoler -> Deprycated Method  i mean mandad amoler 
        // respond send 
        // res.status(200).json({
        //     succuess: true,
        //     message: "student create successfully",
        //     data: result
        // })

        //SendResponse Modified and try to uptoDate and  readble code   -> up-to-date

        sendResponse(res,{
            statusCode: httpStatus.OK,
            succuess: true,
            message: "student create successfully",
            data: result,
        })

})
export  const UserControllers = {
    createStudent
}