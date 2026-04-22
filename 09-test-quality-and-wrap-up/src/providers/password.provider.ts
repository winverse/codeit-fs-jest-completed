export class PasswordProvider {
  hash(password: string) {
    return `hashed:${password}`;
  }

  verify(password: string, passwordHash: string) {
    return this.hash(password) === passwordHash;
  }
}
