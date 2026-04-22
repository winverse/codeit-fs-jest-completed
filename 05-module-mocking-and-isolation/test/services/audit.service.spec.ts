import { jest } from '@jest/globals';

describe('05-module-mocking-and-isolation', () => {
  afterEach(() => {
    delete process.env.AUDIT_PREFIX;
    delete process.env.APP_STAGE;
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('import 전에 unstable_mockModule로 모듈을 바꿀 수 있다', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.unstable_mockModule(
        '#src/providers/random-id.provider.js',
        () => ({
          createRandomId: () => 'fixed-id',
        }),
      );

      const { buildAuditMessage } =
        await import('#src/services/audit.service.js');

      expect(buildAuditMessage('LOGIN')).toBe(
        'AUDIT:development:LOGIN:fixed-id',
      );
    });
  });

  test('resetModules 뒤에는 import 시점 설정을 다시 읽는다', async () => {
    process.env.AUDIT_PREFIX = 'LESSON';
    process.env.APP_STAGE = 'test';

    const { buildAuditMessage } =
      await import('#src/services/audit.service.js');

    expect(buildAuditMessage('BOOT')).toMatch(/^LESSON:test:BOOT:/);
  });

  test('isolateModulesAsync는 테스트마다 import 상태를 고립시킨다', async () => {
    await jest.isolateModulesAsync(async () => {
      process.env.AUDIT_PREFIX = 'ISOLATED';
      const { buildAuditMessage } =
        await import('#src/services/audit.service.js');

      expect(buildAuditMessage('SYNC')).toMatch(/^ISOLATED:development:SYNC:/);
    });
  });
});
