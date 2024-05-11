import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import color from 'colors';
const HandleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      console.log(`${el.path}`.red);
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  // Create an IGenericErrorResponse with an array of error messages
  // const response: IGenericErrorResponse =

  // Do something with the response object, or return it if needed
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default HandleValidationError;
