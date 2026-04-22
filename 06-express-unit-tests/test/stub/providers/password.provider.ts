import { jest } from '@jest/globals';
import { PlainPasswordProvider } from '#src/providers/password.provider.js';
import type { Stub } from '#test/stub/stub.interface.js';

export class StubPasswordProvider
  extends PlainPasswordProvider
  implements Stub<PlainPasswordProvider>
{
  override compare = jest
    .fn<PlainPasswordProvider['compare']>()
    .mockResolvedValue(false);
}
