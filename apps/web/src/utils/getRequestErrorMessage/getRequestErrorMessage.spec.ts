import { invalidCredentialsAxiosError } from '@/mocks/auth';
import { getRequestErrorMessage } from './getRequestErrorMessage';

describe('getRequestErrorMessage', () => {
  describe('AxiosError', () => {
    describe('error is an AxiosError', () => {
      it('should return the message in the response', () => {
        const message = getRequestErrorMessage(invalidCredentialsAxiosError);

        expect(message).toBe('Invalid Credentials');
      });

      it('should not return something different than the message in the response', () => {
        const message = getRequestErrorMessage(invalidCredentialsAxiosError);

        expect(message).not.toBe('SomeOtherRandomMessage');
      });
    });

    describe('error is not an AxiosError', () => {
      describe('fallback message is defined', () => {
        it('should return the custom message passed to the util', () => {
          const message = getRequestErrorMessage({}, 'Custom Error Message');

          expect(message).toBe('Custom Error Message');
        });
      });

      describe('fallback message is not defined', () => {
        it('should return the default error message', () => {
          const message = getRequestErrorMessage({});

          expect(message).toBe('Error inesperado, intenta de nuevo');
        });
      });
    });
  });
});
