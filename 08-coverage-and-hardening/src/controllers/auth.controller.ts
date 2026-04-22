import type { Request, Response } from 'express';
import type { AuthService } from '../services/auth.service.js';
import { BaseController } from './base.controller.js';

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  readonly login = this.toHandler(
    async (request: Request, response: Response) => {
      const { email, password } = request.body as {
        email?: string;
        password?: string;
      };

      if (!email || !password) {
        response.status(400).json({
          message: '이메일과 비밀번호를 모두 입력해야 합니다.',
        });
        return;
      }

      const result = await this.authService.login(email, password);

      if (!result.ok) {
        response.status(401).json({
          message: '로그인 정보가 올바르지 않습니다.',
        });
        return;
      }

      response.cookie('uid', String(result.user.id), {
        httpOnly: true,
        sameSite: 'lax',
      });
      response.status(200).json({
        user: result.user,
      });
    },
  );

  readonly me = this.toHandler(async (request: Request, response: Response) => {
    const rawUserId = request.cookies.uid as string | undefined;
    if (!rawUserId) {
      response.status(401).json({
        message: '로그인이 필요합니다.',
      });
      return;
    }

    const userId = Number(rawUserId);
    if (!Number.isInteger(userId) || userId <= 0) {
      response.status(401).json({
        message: '로그인이 필요합니다.',
      });
      return;
    }

    const user = await this.authService.getUserProfile(userId);

    if (!user) {
      response.status(401).json({
        message: '로그인이 필요합니다.',
      });
      return;
    }

    response.status(200).json({
      user,
    });
  });

  readonly logout = this.toHandler((request: Request, response: Response) => {
    response.clearCookie('uid');
    response.status(204).send();
  });
}
