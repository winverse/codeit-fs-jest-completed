import type { Request, Response } from "express";
import type { AuthService } from "../services/auth.service.js";
import { BaseController } from "./base.controller.js";
import type { AuthenticatedRequest } from "../middlewares/require-auth.middleware.js";

interface LoginBody {
  email?: string;
  password?: string;
}

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  login = async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return this.fail(res, 400, "email과 password를 모두 전달해야 합니다.");
    }

    const user = await this.authService.login(email, password);
    if (!user) {
      return this.fail(res, 401, "로그인 정보가 올바르지 않습니다.");
    }

    res.cookie("uid", String(user.id), {
      httpOnly: true,
      sameSite: "lax",
    });

    return this.ok(res, { user });
  };

  me = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return this.fail(res, 500, "인증 미들웨어가 사용자 정보를 준비하지 못했습니다.");
    }

    return this.ok(res, { user: req.user });
  };
}
