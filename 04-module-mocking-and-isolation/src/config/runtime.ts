export const runtimeConfig = {
  stage: process.env.APP_STAGE ?? "development",
  auditPrefix: process.env.AUDIT_PREFIX ?? "AUDIT",
};
