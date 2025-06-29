import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.type";
import { User } from "../modules/user/user.model";

//make custom  Request for attached User in request field 


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!')
        }

        // if the token is invalid

        const decoded = jwt.verify(token, config.jwt_access_token as string) as JwtPayload;
        const {role,userId,iat} = decoded;
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
            if(user.passwordChangeAt && User.isJwtIssuedBeforeChanged(user.passwordChangeAt,iat as number)){
                
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!')
            }

            //
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!')
        }
        req.user = decoded as JwtPayload;
        next();

    })
}

export default auth;