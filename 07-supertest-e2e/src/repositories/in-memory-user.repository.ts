import type { UserRecord, UserRepository } from './user.repository.js';

export class InMemoryUserRepository implements UserRepository {
  constructor(private readonly users: UserRecord[]) {}

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: number) {
    return this.users.find((user) => user.id === id) ?? null;
  }
}
