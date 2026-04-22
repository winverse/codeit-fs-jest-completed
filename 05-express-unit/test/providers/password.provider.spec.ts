import { PasswordProvider } from '#src/providers/password.provider.js';

describe('PasswordProvider', () => {
  test.each([
    ['같은 문자열', 'pw', 'pw', true],
    ['다른 문자열', 'pw', 'wrong', false],
  ])(
    '%s일 때 compare 결과는 %s입니다',
    async (_, candidate, storedHash, expected) => {
      const provider = new PasswordProvider();

      await expect(provider.compare(candidate, storedHash)).resolves.toBe(
        expected,
      );
    },
  );
});
