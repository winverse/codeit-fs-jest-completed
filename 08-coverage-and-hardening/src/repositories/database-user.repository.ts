import type { FakeDatabase } from '../database/fake-database.js';
import type { UserRecord, UserRepository } from './user.repository.js';

export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly database: FakeDatabase) {}

  findByEmail(email: string) {
    return this.database.findUserByEmail(email);
  }

  findById(id: number) {
    return this.database.findUserById(id);
  }

  create(user: Omit<UserRecord, 'id'>) {
    return this.database.seedUser(user);
  }
}
