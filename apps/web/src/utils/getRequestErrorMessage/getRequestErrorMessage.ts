import axios, { AxiosError } from 'axios';

const defaultMsg = 'Error inesperado, intenta de nuevo';

export function getRequestErrorMessage(
  err: AxiosError | any,
  customMessage?: string,
) {
  let msg: string | null = null;

  if (axios.isAxiosError(err)) {
    msg = err.response?.data?.message;
  }

  return msg ?? customMessage ?? defaultMsg;
}
