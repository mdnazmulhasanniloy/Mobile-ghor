import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type IGenericResponse<T> = {
  meta?: IMeta;
  data: T;
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta;
  data?: T | null;
};
