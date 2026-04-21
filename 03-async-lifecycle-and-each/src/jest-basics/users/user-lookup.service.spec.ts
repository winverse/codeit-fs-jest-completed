import { jest } from "@jest/globals";
import { SessionService } from "#jest-basics/session/session.service.js";
import { userGateway } from "#jest-basics/users/user-gateway.js";
import { UserLookupService } from "#jest-basics/users/user-lookup.service.js";

describe("UserLookupService", () => {
  const service = new UserLookupService(userGateway);
  let findNameByIdSpy: jest.SpiedFunction<typeof userGateway.findNameById>;

  beforeEach(() => {
    findNameByIdSpy = jest.spyOn(userGateway, "findNameById");
  });

  test("Promise를 resolve해서 결과를 검증한다", async () => {
    findNameByIdSpy.mockResolvedValue("win");

    await expect(service.getDisplayName("user-1")).resolves.toBe("win 님");
    expect(findNameByIdSpy).toHaveBeenCalledWith("user-1");
  });

  test("Promise를 reject하는 에러 흐름을 검증한다", async () => {
    expect.assertions(1);
    findNameByIdSpy.mockResolvedValue(null);

    await expect(service.getDisplayName("missing")).rejects.toThrow("USER_NOT_FOUND");
  });

  test("상태 오염을 막기 위해 각 테스트마다 호출 기록을 비운다", async () => {
    findNameByIdSpy.mockResolvedValue("win");
    await service.getDisplayName("user-1");
    expect(findNameByIdSpy).toHaveBeenCalledTimes(1);
  });
});

describe("동기 에러와 비동기 에러", () => {
  test("toThrow와 rejects.toThrow를 구분한다", async () => {
    const sessionService = new SessionService();
    jest.spyOn(userGateway, "findNameById").mockResolvedValue(null);
    const userLookupService = new UserLookupService(userGateway);

    expect(() => sessionService.validateTimeout(0)).toThrow("MIN_TIMEOUT");
    await expect(userLookupService.getDisplayName("missing")).rejects.toThrow("USER_NOT_FOUND");
  });
});
