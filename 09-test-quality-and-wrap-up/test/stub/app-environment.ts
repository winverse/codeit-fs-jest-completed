import { App } from '#src/app.js';
import { AuthController } from '#src/controllers/auth.controller.js';
import { HealthController } from '#src/controllers/health.controller.js';
import { FakeDatabase } from '#src/database/fake-database.js';
import { PasswordProvider } from '#src/providers/password.provider.js';
import { DatabaseUserRepository } from '#src/repositories/database-user.repository.js';
import { AuthService } from '#src/services/auth.service.js';
import { assistantAccount, teacherAccount } from '#test/mock/users.js';

export interface TestEnvironment {
  application: App;
  database: FakeDatabase;
  authService: AuthService;
}

const buildSeedUser = (
  passwordProvider: PasswordProvider,
  account: { email: string; password: string; name: string },
) => ({
  email: account.email,
  passwordHash: passwordProvider.hash(account.password),
  name: account.name,
});

export const seedDefaultUsers = async (environment: TestEnvironment) => {
  const passwordProvider = new PasswordProvider();

  await environment.database.seedUser(
    buildSeedUser(passwordProvider, teacherAccount),
  );
};

export const seedAssistantUser = async (environment: TestEnvironment) => {
  const passwordProvider = new PasswordProvider();

  await environment.database.seedUser(
    buildSeedUser(passwordProvider, assistantAccount),
  );
};

export const resetTestDatabase = async (environment: TestEnvironment) => {
  await environment.database.reset();
  await seedDefaultUsers(environment);
};

export const closeTestResources = async (environment: TestEnvironment) => {
  await environment.database.disconnect();
};

export const createTestEnvironment = async () => {
  process.env.NODE_ENV = 'test';

  const database = new FakeDatabase();
  await database.connect();

  const passwordProvider = new PasswordProvider();
  const userRepository = new DatabaseUserRepository(database);
  const authService = new AuthService(userRepository, passwordProvider);
  const application = new App(
    new HealthController(database),
    new AuthController(authService),
  );
  const environment: TestEnvironment = {
    application,
    database,
    authService,
  };

  await resetTestDatabase(environment);

  return environment;
};
