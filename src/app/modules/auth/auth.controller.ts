
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthService } from "./auth.services"
import config from "../../config"


const loginUser =catchAsync(async(req,res)=>{
    const result =await AuthService.loginUser(req.body);
    const {refreshToken,accessToken,needsPasswordChange} = result;
    res.cookie('refreshToken',refreshToken,{
        secure: config.node_env==='production',
        httpOnly:true,
    })
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'User Logged in successfully',
        data:{accessToken,needsPasswordChange}
    })
})
const changePassword =catchAsync(async(req,res)=>{
    const {...passwordData} =req.body;
    // console.log(req.user)
    const result =await AuthService.changePassword(req.user!,passwordData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'password changed in successfully',
        data:result
    })
})
const refreshToken =catchAsync(async(req,res)=>{
    const {refreshToken} = req.cookies
     const result =await AuthService.refreshToken(refreshToken);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'User Logged in successfully',
        data:result
    })
})
const forgetPassword =catchAsync(async(req,res)=>{
    const userId = req.body.id;
     const result =await AuthService.forgetPassword(userId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'Reset Link generatede in successfully',
        data:result
    })
})
const resetPassword =catchAsync(async(req,res)=>{
    const token = req.headers.authorization
     const result =await AuthService.resetPassword(req.body,token as string);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        succuess:true,
        message:'Password Reset successfully',
        data:result
    })
})

export const AuthController={
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}