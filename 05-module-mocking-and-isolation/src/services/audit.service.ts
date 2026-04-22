import { runtimeConfig } from '#src/config/runtime.js';
import { createRandomId } from '#src/providers/random-id.provider.js';

export function buildAuditMessage(action: string): string {
  return `${runtimeConfig.auditPrefix}:${runtimeConfig.stage}:${action}:${createRandomId()}`;
}
