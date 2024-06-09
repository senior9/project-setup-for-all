
import express, { Application} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

//Main APi  application Routes 
app.use('/api/v1', router);


// GLobal Error Handling 
app.use(globalErrorHandler);

// Not found 
app.use(notFound);

export default app;
