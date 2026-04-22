import type { Request, Response } from 'express';
import { BaseController } from './base.controller.js';

export class HealthController extends BaseController {
  getStatus = (_req: Request, res: Response) => {
    return this.ok(res, {
      status: 'ok',
      message:
        '첫 Express 핸들러와 미들웨어 단위 테스트를 준비한 상태입니다.',
    });
  };
}
