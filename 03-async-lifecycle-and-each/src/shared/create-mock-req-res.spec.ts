import { createMockReqRes } from '#src/shared/create-mock-req-res.js';

describe('createMockReqRes', () => {
  test('expect.any로 준비된 객체의 형태를 검증한다', () => {
    const { req, res } = createMockReqRes();

    expect(req).toMatchObject({
      body: expect.any(Object),
      params: expect.any(Object),
    });
    expect(res).toMatchObject({
      status: expect.any(Function),
      json: expect.any(Function),
      cookie: expect.any(Function),
    });
  });
});
