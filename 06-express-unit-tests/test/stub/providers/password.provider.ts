import { jest } from '@jest/globals';
import type { PasswordProvider } from '../../../src/providers/password.provider.js';

export class StubPasswordProvider implements PasswordProvider {
  compare = jest
    .fn<PasswordProvider['compare']>()
    .mockResolvedValue(false);
}
