import type { Request, Response } from 'express';
import { BaseController } from './base.controller.js';

export class HealthController extends BaseController {
  getStatus = (_req: Request, res: Response) => {
    return this.ok(res, { status: 'ok' });
  };
}
