import { PlainPasswordProvider } from '../../src/providers/password.provider.js';

describe('PlainPasswordProvider', () => {
  test.each([
    ['같은 문자열', 'pw', 'pw', true],
    ['다른 문자열', 'pw', 'wrong', false],
  ])(
    '%s일 때 compare 결과는 %s입니다',
    async (_, candidate, storedHash, expected) => {
      const provider = new PlainPasswordProvider();

      await expect(provider.compare(candidate, storedHash)).resolves.toBe(
        expected,
      );
    },
  );
});
