import { loginSchema } from '@/schemas/login.schema';
import { getSchemaFields } from './getSchemaFields';

describe('getSchemaFields', () => {
  describe('loginSchema', () => {
    it('should match the schema', () => {
      const fields = getSchemaFields(loginSchema);

      expect(fields).toHaveLength(2);
      expect(fields).toEqual(['email', 'password']);
    });

    it('should no match something else that is not defined in the schema', () => {
      const fields = getSchemaFields(loginSchema);
      const otherFields = ['email', 'password', 'otherField'];

      expect(fields).toHaveLength(2);
      expect(fields).not.toEqual(otherFields);
    });
  });
});
