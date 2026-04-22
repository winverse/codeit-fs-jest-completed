export interface UserRecord {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: number): Promise<UserRecord | null>;
  create(user: Omit<UserRecord, 'id'>): Promise<UserRecord>;
}
