import e from 'express';
import express, { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.raw({ limit: "50mb" }));

export default app;