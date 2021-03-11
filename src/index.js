import express from 'express';
import '@babel/polyfill';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index';
import errorRes from './utils/errorHandler';

config();
const { PORT } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/', routes);
app.use('*', (req, res) => {
  errorRes(res, 404, `Not Found - ${req.originalUrl}`);
});

app.listen(PORT, console.log(`Server is running at ${PORT} `));

export default app;
