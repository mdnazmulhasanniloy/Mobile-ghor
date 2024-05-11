import cors from 'cors';
import config from './config';
import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routers
// app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple Mobile-Ghor server is running at ${config.port}`);
  } catch (error) {
    next(error);
  }
});

//test
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple MG server is testing`);
  } catch (error) {
    next(error);
  }
});

// rout not found!

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    success: false,
    message: 'Not Found!',
    errorMessages: [
      {
        path: req?.originalUrl,
        message: `Api not found!`,
      },
    ],
  });
  next();
});

export default app;
