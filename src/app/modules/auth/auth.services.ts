import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.type";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmails";



const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByCustomId(payload.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found')
    }
    /// user is already  deleted or not 
    const isDeleteduser = user?.isDelete;
    if (isDeleteduser) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }
    // /// user is already  BLOCKED or In progress 
    const userStatus = user?.status
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }

    //checking id Password is wrong or right 

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password didnt matched ")
    }
    //grant acess : Send AccessToken and RefreshToken


    // Create Access Token and  sent to trhe client 
    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_token as string, config.jwt_access_token_expires_in as string);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_token as string, config.jwt_refresh_token_expires_in as string);



    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needPasswordChange
    }
}

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const user = await User.isUserExistByCustomId(userData.userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found')
    }
    /// user is already  deleted or not 
    const isDeleteduser = user?.isDelete;
    if (isDeleteduser) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }
    // /// user is already  BLOCKED or In progress 
    const userStatus = user?.status
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }

    //checking id Password is wrong or right 

    if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password didnt matched ")
    }

    // hash new password 
    const hashNewPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_round));
    // console.log(hashNewPassword)

    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    }, {
        password: hashNewPassword,
        needPasswordChange: false,
        passwordChangeAt: new Date(),
    },)
    return null;
}

const refreshToken = async (token: string) => {
    // if the token is invalid
    const decoded =verifyToken(token,config.jwt_refresh_token as string)
    const { userId, iat } = decoded;
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found')
    }
    /// user is already  deleted or not 
    const isDeleteduser = user?.isDelete;
    if (isDeleteduser) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }
    // /// user is already  BLOCKED or In progress 
    const userStatus = user?.status
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }

    //if hack someone stole my jwt 
    if (user.passwordChangeAt && User.isJwtIssuedBeforeChanged(user.passwordChangeAt, iat as number)) {

        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!')
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_token as string, config.jwt_access_token_expires_in as string);
    return{
        accessToken
    }

}
const forgetPassword = async (userId: string) => {
    // if the user is invalid
     const user = await User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found')
    }
    /// user is already  deleted or not 
    const isDeleteduser = user?.isDelete;
    if (isDeleteduser) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }
    // /// user is already  BLOCKED or In progress 
    const userStatus = user?.status
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const resetToken = createToken(jwtPayload, 
        config.jwt_access_token as string, 
        '10m');
    const resetUILink = `${config.reset_password_link}?id=${user.id}&token=${resetToken}`;
    
    sendEmail(user.email,resetUILink);
    // console.log(resetUILink);
}


const resetPassword = async (payload:{id:string,newPassword:string},token:string) => {
    // if the user is invalid
     const user = await User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found')
    }
    /// user is already  deleted or not 
    const isDeleteduser = user?.isDelete;
    if (isDeleteduser) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
    }
    // /// user is already  BLOCKED or In progress 
    const userStatus = user?.status
    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }
     // if the token is invalid
    const decoded = verifyToken(token,config.jwt_access_token as string)
    // console.log(decoded);
    if(payload.id !== decoded.userId){
        // console.log(payload.id,decoded.userId)
        throw new AppError(httpStatus.FORBIDDEN,'you dont have any access to reset password')
    }
    // hash new password 
    const hashNewPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_round));
    // console.log(hashNewPassword)

    await User.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role
    }, {
        password: hashNewPassword,
        needPasswordChange: false,
        passwordChangeAt: new Date(),
    },)

}

export const AuthService = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}