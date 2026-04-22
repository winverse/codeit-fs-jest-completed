import { jest } from '@jest/globals';
import type { UserRepository } from '#src/repositories/user.repository.js';

export class StubUserRepository implements UserRepository {
  findByEmail = jest.fn<UserRepository['findByEmail']>();

  findById = jest.fn<UserRepository['findById']>();
}
