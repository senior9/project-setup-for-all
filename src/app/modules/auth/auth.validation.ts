import { z } from "zod";

const loginValidationSchema =z.object({
    body:z.object({
        id:z.string({required_error:'ID is required'}),
        password:z.string({required_error:'password must be required'})
    })
})
const changePasswordValidationSchema =z.object({
    body:z.object({
        oldPassword:z.string({required_error:'Old Password required'}),
        newPassword:z.string({required_error:'New password must be required'})
    })
})

const refreshTokenValidationSchema = z.object({
    cookies:z.object({
        refreshToken:z.string({required_error:'refreshtoken is requires'})
    })
})
const forgetPasswordValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:'Id is required'})
    })
})
const resetPasswordValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:'Id is required'}),
        newPassword:z.string({required_error:'user Password is required'}),
    })
})

export const AuthValidation ={
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
}