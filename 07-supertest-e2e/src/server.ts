import { App } from "./app.js";
import { AuthController } from "./controllers/auth.controller.js";
import { HealthController } from "./controllers/health.controller.js";
import { RequireAuthMiddleware } from "./middlewares/require-auth.middleware.js";
import { PlainPasswordProvider } from "./providers/password.provider.js";
import { InMemoryUserRepository } from "./repositories/in-memory-user.repository.js";
import { AuthService } from "./services/auth.service.js";

const port = Number(process.env.PORT ?? 4007);
const userRepository = new InMemoryUserRepository([
  {
    id: 1,
    email: "teacher@example.com",
    name: "Teacher",
    passwordHash: "class-based-jest",
  },
]);
const authService = new AuthService(userRepository, new PlainPasswordProvider());
const application = new App(
  new HealthController(),
  new AuthController(authService),
  new RequireAuthMiddleware(userRepository),
);

application.app.listen(port, () => {
  console.log(`07-supertest-e2e listening on ${port}`);
});
