import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import type { AuthController } from "./controllers/auth.controller.js";
import type { HealthController } from "./controllers/health.controller.js";

export class App {
  public readonly app: Express;

  constructor(
    private readonly healthController: HealthController,
    private readonly authController: AuthController,
  ) {
    this.app = express();
    this.configure();
    this.registerRoutes();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private registerRoutes() {
    this.app.get("/health", this.healthController.getStatus);
    this.app.post("/auth/login", this.authController.login);
    this.app.get("/auth/me", this.authController.me);
    this.app.post("/auth/logout", this.authController.logout);
  }
}
