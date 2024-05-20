
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// application Routes 

app.use('/api/v1/students', studentRoutes)

// app.get('/',);

export default app;
