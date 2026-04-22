import type { Request, Response } from 'express';
import type { FakeDatabase } from '../database/fake-database.js';
import { BaseController } from './base.controller.js';

export class HealthController extends BaseController {
  readonly getStatus = this.toHandler(
    (_request: Request, response: Response) => {
      response.status(200).json({
        status: 'ok',
        databaseName: this.database.databaseName,
        connected: this.database.isConnected(),
        message:
          '테스트 전용 DB와 반복 실행 환경을 기준으로 통합 테스트를 운영합니다.',
      });
    },
  );

  constructor(private readonly database: FakeDatabase) {
    super();
  }
}
