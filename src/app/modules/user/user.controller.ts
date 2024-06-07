import { userServices } from "./user.service";



//  creat new student 
const createStudent = async (req: Request, res: Response) => {
    try {
        
    

        const { password ,student: studentData } = req.body;


        const result = await userServices.createStudentDb(password,studentData);

        // if(error){
        //     res.status(500).json({
        //         succuess: true,
        //         message: "Typical mistake",
        //         error: error.details
        //     })
        // }

        

        // respond send 
        res.status(200).json({
            succuess: true,
            message: "student create successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            succuess: true,
            message: error.message || "Typical mistake",
            error: error
        })
    }

}