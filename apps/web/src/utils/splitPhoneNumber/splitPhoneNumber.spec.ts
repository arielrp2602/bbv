import { splitPhoneNumber } from './splitPhoneNumber';

describe('splitPhoneNumber', () => {
  it('should split the number every two digits', () => {
    const phone = '3336850109';

    expect(splitPhoneNumber(phone)).toBe('33-36-85-01-09');
  });
});
