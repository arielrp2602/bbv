import { AxiosError, AxiosResponse } from 'axios';

function createAxiosError(status: number, message: string): AxiosError {
  const response = {
    status,
    data: { message, statusCode: status },
    statusText: '',
    headers: {},
    config: {} as any,
  } as AxiosResponse;

  const error = new AxiosError(
    message,
    String(status),
    {} as any,
    {},
    response,
  );

  return error;
}

export const invalidCredentialsAxiosError = createAxiosError(
  401,
  'Invalid Credentials',
);
