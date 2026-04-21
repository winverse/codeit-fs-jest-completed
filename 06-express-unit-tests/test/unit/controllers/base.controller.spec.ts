import type { Response } from 'express';
import httpMocks from 'node-mocks-http';
import { BaseController } from '../../../src/controllers/base.controller.js';

class TestController extends BaseController {
  sendOk(res: Response) {
    this.ok(res, { status: 'ok' });
  }

  sendFail(res: Response) {
    this.fail(res, 400, '잘못된 요청입니다.');
  }

  sendNoContent(res: Response) {
    this.noContent(res);
  }
}

describe('BaseController', () => {
  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();
  });

  test('ok는 상태 코드와 본문을 함께 응답한다', () => {
    const res = httpMocks.createResponse<Response>();

    controller.sendOk(res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ status: 'ok' });
  });

  test('fail은 상태 코드와 message 본문을 응답한다', () => {
    const res = httpMocks.createResponse<Response>();

    controller.sendFail(res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      message: '잘못된 요청입니다.',
    });
  });

  test('noContent는 204와 빈 본문을 응답한다', () => {
    const res = httpMocks.createResponse<Response>();

    controller.sendNoContent(res);

    expect(res.statusCode).toBe(204);
    expect(res._getData()).toBe('');
  });
});
