import { SessionService } from '#src/session/session.service.js';

describe('SessionService', () => {
  const sessionService = new SessionService();

  test('timeout이 1000보다 작으면 에러를 던진다', () => {
    expect(() => sessionService.validateTimeout(0)).toThrow('MIN_TIMEOUT');
  });

  test.each([
    {
      currentDeadline: 1_000,
      extraMs: 10_000,
      expected: 11_000,
    },
    {
      currentDeadline: 2_500,
      extraMs: 5_000,
      expected: 7_500,
    },
    {
      currentDeadline: 30_000,
      extraMs: 0,
      expected: 30_000,
    },
  ])(
    '$currentDeadline에서 $extraMs를 더하면 $expected가 된다',
    ({
      currentDeadline,
      extraMs,
      expected,
    }: {
      currentDeadline: number;
      extraMs: number;
      expected: number;
    }) => {
      expect(sessionService.extendDeadline(currentDeadline, extraMs)).toBe(
        expected,
      );
    },
  );

  test('유효한 timeout이면 만료 시각을 계산한다', () => {
    expect(sessionService.getExpiryTime(10_000, 3_000)).toBe(13_000);
  });
});
