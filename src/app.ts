import express, { Express } from 'express';
import { connectToDatabase } from './utils';
import router from './router';
require('dotenv').config();

const app: Express = express();
app.use(express.json());
connectToDatabase(process.env.DATABASE_URL ?? "");
app.use(router);
export default app;