import type { Router as ExpressRouter } from "express";
import type { AuthController } from "./auth.controller.js";
import { BaseController } from "./base.controller.js";
import type { HealthController } from "./health.controller.js";

export class Controller extends BaseController {
  constructor(
    private readonly healthController: HealthController,
    private readonly authController: AuthController,
  ) {
    super();
  }

  routes(): ExpressRouter {
    this.router.use(this.healthController.routes());
    this.router.use(this.authController.routes());
    return this.router;
  }
}
