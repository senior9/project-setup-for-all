
import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router =express.Router();

router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.loginUser)
router.post('/change-password',auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),validateRequest(AuthValidation.changePasswordValidationSchema),AuthController.changePassword)
router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidationSchema),AuthController.refreshToken)
router.post('/forget-password',validateRequest(AuthValidation.forgetPasswordValidationSchema),AuthController.forgetPassword)
router.post('/reset-password',validateRequest(AuthValidation.resetPasswordValidationSchema),AuthController.resetPassword)

export const AuthRoutes = router;