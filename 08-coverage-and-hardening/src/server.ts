import { App } from "./app.js";
import { AuthController } from "./controllers/auth.controller.js";
import { HealthController } from "./controllers/health.controller.js";
import { FakeDatabase } from "./database/fake-database.js";
import { PasswordProvider } from "./providers/password.provider.js";
import { DatabaseUserRepository } from "./repositories/database-user.repository.js";
import { AuthService } from "./services/auth.service.js";

const bootstrap = async () => {
  const database = new FakeDatabase();
  await database.connect();
  const passwordProvider = new PasswordProvider();
  const userRepository = new DatabaseUserRepository(database);
  const authService = new AuthService(userRepository, passwordProvider);
  await userRepository.create({
    email: "teacher@example.com",
    passwordHash: passwordProvider.hash("class-based-jest"),
    name: "Teacher",
  });
  const application = new App(
    new HealthController(database),
    new AuthController(authService),
  );
  const port = Number(process.env.PORT ?? 3000);

  application.app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
};

void bootstrap();
