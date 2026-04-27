import axios, { AxiosError } from 'axios';

const defaultMsg = 'Error inesperado, intenta de nuevo';

export function getRequestErrorMessage(
  err: AxiosError | any,
  customMessage?: string,
) {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? customMessage ?? defaultMsg;
  }

  return customMessage ?? defaultMsg;
}
