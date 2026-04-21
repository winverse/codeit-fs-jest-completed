import type { Request, Response } from "express";
import { BaseController } from "./base.controller.js";

export class HealthController extends BaseController {
  getStatus = (_req: Request, res: Response) => {
    res.setHeader("x-test-layer", "supertest");
    return this.ok(res, {
      status: "ok",
      message: "App 조립과 server 실행을 분리한 뒤 supertest로 요청 흐름을 검증합니다.",
    });
  };
}
