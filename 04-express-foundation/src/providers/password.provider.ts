export interface PasswordProvider {
  compare(candidate: string, storedHash: string): Promise<boolean>;
}

export class PlainPasswordProvider implements PasswordProvider {
  async compare(candidate: string, storedHash: string) {
    return candidate === storedHash;
  }
}
