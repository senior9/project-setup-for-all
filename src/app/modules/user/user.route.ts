import  express, { Request, Response,NextFunction }  from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();


// Middleware for eecure  Validation 

const middlWare = (req:Request,res:Response, next:NextFunction)=>{

    console.log(req.body);
    next();

}

router.post('/create-student',middlWare, UserControllers.createStudent);

export const  userRoutes = router;