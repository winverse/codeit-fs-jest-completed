import { jest } from '@jest/globals';
import type { UserRecord } from '../../../src/repositories/user.repository.js';
import type { UserRepository } from '../../../src/repositories/user.repository.js';
import { teacherUserRecord } from '../../mock/users.js';

export class StubUserRepository implements UserRepository {
  findByEmailResult: UserRecord | null = teacherUserRecord;

  findByIdResult: UserRecord | null = teacherUserRecord;

  findByEmail = jest
    .fn<UserRepository['findByEmail']>()
    .mockImplementation(async () => this.findByEmailResult);

  findById = jest
    .fn<UserRepository['findById']>()
    .mockImplementation(async () => this.findByIdResult);
}
