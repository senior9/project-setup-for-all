
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";




//  creat new student 
const createStudent =catchAsync( async (req, res,) => {

        const { password , student:studentData } = req.body;


        const result = await userServices.createStudentIntoDb(req.file,password,studentData);

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

// create new faculty 

const createfaculty = catchAsync(async(req,res)=>{
    const {password,faculty:facultyData} = req.body;
    const result = await userServices.createFacultyIntoDb(password, facultyData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message: "faculty create successfully",
        data:result
    })
}) 

//create new Admin

const craeteAdmin = catchAsync(async(req,res)=>{
    const {password, admin:adminData} =req.body;
    // console.log(req.body)
    const result = await userServices.createAdminIntoDb(password, adminData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message: "admin create successfully",
        data:result,
    })
})
//change status 
const changeStatus = catchAsync(async(req,res)=>{
   const id = req.params.id
    const result = await userServices.changeStatus(id,req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message: "Status Change successfully",
        data:result,
    })
})
//get Me  only 
const getMe = catchAsync(async(req,res)=>{
    // const token = req.headers.authorization;
    // if(!token){
    //     throw new AppError(httpStatus.NOT_FOUND,'Token not found')
    // }

    const {userId,role} = req.user!;

    const result = await userServices.getMe(userId,role);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message: " User get successfully",
        data:result,
    })
})
export  const UserControllers = {
    createStudent,
    createfaculty,
    craeteAdmin,
    changeStatus,
    getMe
}