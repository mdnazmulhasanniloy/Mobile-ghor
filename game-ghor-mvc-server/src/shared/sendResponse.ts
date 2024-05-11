import { Response } from 'express';
import { IApiResponse } from '../interfaces/common';

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data?.success,
    message: data?.message || null,
    data: data?.data || null,
    // eslint-disable-next-line no-undefined
    meta: data?.meta || null || undefined,
  };

  res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
