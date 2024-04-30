import express, { Express } from 'express';
import { connectToDatabase } from './utils';
import router from './router';
require('dotenv').config();

const app: Express = express();
app.use(express.json());
console.log(process.env.DB_URL);
connectToDatabase(process.env.DB_URL ?? "");
app.use(router);
export default app;