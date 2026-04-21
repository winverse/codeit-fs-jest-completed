import { jest } from '@jest/globals';
import { AuthService } from '../../../src/services/auth.service.js';
import { StubPasswordProvider } from '../providers/password.provider.js';
import { StubUserRepository } from '../repository/user.repository.js';

export class StubAuthService extends AuthService {
  constructor() {
    super(new StubUserRepository(), new StubPasswordProvider());
  }

  override login = jest
    .fn<AuthService['login']>()
    .mockResolvedValue(null);

  override getUserProfile = jest
    .fn<AuthService['getUserProfile']>()
    .mockResolvedValue(null);
}
