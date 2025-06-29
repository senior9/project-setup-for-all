
import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:['http://localhost:5173']}));

//Main APi  application Routes 
app.use('/api/v1', router);

const test =(req:Request, res:Response) =>{
    Promise.reject();
}
app.get('/',test)

// GLobal Error Handling 
app.use(globalErrorHandler);

// Not found 
app.use(notFound);

export default app;
