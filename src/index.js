import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index';
import { notFound, errorHandler } from './middlewares/errorMiddlewareHandler';

config();
const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running in ${NODE_ENV} at ${PORT} `));

export default app;
