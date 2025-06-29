
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
export const createToken = (
    payload: { userId: string, role: string },
    secrect: string,
    expiresIn: string
) => {

    return jwt.sign(payload, secrect, {
        expiresIn
    } as SignOptions)
}

export const verifyToken = (token:string,secrect:string)=>{
    return jwt.verify(token, secrect) as JwtPayload
}