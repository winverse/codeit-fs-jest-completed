import type { Request, Response, Router } from 'express';
import { BaseController } from './base.controller.js';

export class HealthController extends BaseController {
  public routes(): Router {
    this.router.get('/health', this.getStatus);
    return this.router;
  }

  private getStatus = (_req: Request, res: Response) => {
    return res.status(200).json({
      status: 'ok',
      message:
        'App과 Controller가 분리된 상태에서 HTTP 흐름을 시작할 수 있습니다.',
    });
  };
}
