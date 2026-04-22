import { App } from './app.js';
import { AuthController } from './controllers/auth.controller.js';
import { Controller } from './controllers/controller.js';
import { HealthController } from './controllers/health.controller.js';
import { PasswordProvider } from './providers/password.provider.js';
import { UserRepository } from './repositories/user.repository.js';
import { AuthService } from './services/auth.service.js';

const port = Number(process.env.PORT ?? 4005);
const userRepository = new UserRepository([
  {
    id: 1,
    email: 'teacher@example.com',
    name: 'Teacher',
    password: 'class-based-jest',
  },
]);
const passwordProvider = new PasswordProvider();
const authService = new AuthService(userRepository, passwordProvider);
const healthController = new HealthController();
const authController = new AuthController(authService);
const controller = new Controller(healthController, authController);
const application = new App(controller);

application.listen(port);
