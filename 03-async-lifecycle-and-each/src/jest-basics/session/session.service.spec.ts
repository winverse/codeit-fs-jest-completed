import { SessionService } from "#jest-basics/session/session.service.js";

describe("SessionService", () => {
  const sessionService = new SessionService();

  test("timeout이 1000보다 작으면 에러를 던진다", () => {
    expect(() => sessionService.validateTimeout(0)).toThrow("MIN_TIMEOUT");
  });

  test.each([
    [1_000, 10_000, 11_000],
    [2_500, 5_000, 7_500],
    [30_000, 0, 30_000],
  ])("extendDeadline(%i, %i) = %i", (currentDeadline: number, extraMs: number, expected: number) => {
    expect(sessionService.extendDeadline(currentDeadline, extraMs)).toBe(expected);
  });

  test("유효한 timeout이면 만료 시각을 계산한다", () => {
    expect(sessionService.getExpiryTime(10_000, 3_000)).toBe(13_000);
  });
});
