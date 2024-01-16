import express from 'express';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet';

const app = express()

app.use(express.json());

// TODO:: Implement CSP in app
// app.use(helmet());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

export default app;