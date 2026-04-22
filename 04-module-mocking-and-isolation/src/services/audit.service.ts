import { runtimeConfig } from '../config/runtime.js';
import { createRandomId } from '../providers/random-id.provider.js';

export function buildAuditMessage(action: string): string {
  return `${runtimeConfig.auditPrefix}:${runtimeConfig.stage}:${action}:${createRandomId()}`;
}
