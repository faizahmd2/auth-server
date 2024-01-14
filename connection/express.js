import express from 'express';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import helmet from 'helmet';
// import config from '../config/config.js';

// let allowedOrigins = config.get('allowedOrigins');
// const isProduction = config.get('NODE_ENV') === "production";

const app = express()

app.use(express.json());

// app.use(helmet({
//   contentSecurityPolicy: false
// }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

export default app;