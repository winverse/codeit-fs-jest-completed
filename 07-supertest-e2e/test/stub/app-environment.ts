import { App } from '#src/app.js';
import { AuthController } from '#src/controllers/auth.controller.js';
import { HealthController } from '#src/controllers/health.controller.js';
import { RequireAuthMiddleware } from '#src/middlewares/require-auth.middleware.js';
import { PlainPasswordProvider } from '#src/providers/password.provider.js';
import { InMemoryUserRepository } from '#src/repositories/in-memory-user.repository.js';
import { AuthService } from '#src/services/auth.service.js';
import { teacherUserRecord } from '#test/mock/users.js';

export interface TestEnvironment {
  application: App;
  authService: AuthService;
  userRepository: InMemoryUserRepository;
}

export function createTestEnvironment(): TestEnvironment {
  const userRepository = new InMemoryUserRepository([teacherUserRecord]);
  const authService = new AuthService(
    userRepository,
    new PlainPasswordProvider(),
  );
  const application = new App(
    new HealthController(),
    new AuthController(authService),
    new RequireAuthMiddleware(userRepository),
  );

  return {
    application,
    authService,
    userRepository,
  };
}
