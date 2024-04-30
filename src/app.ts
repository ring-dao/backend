import express, { Express } from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils';
import router from './router';
require('dotenv').config();

const app: Express = express();

// Enable CORS for all requests
app.use(cors());

// Or, to enable CORS for specific origins, you can do:
// app.use(cors({
//   origin: 'https://www.yourdomain.com'
// }));

app.use(express.json());
console.log(process.env.DB_URL);
connectToDatabase(process.env.DB_URL ?? "");
app.use(router);

export default app;
