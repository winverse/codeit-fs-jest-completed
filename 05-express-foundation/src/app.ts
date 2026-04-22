import express, { type Express } from 'express';
import type { Controller } from './controllers/controller.js';

export class App {
  public readonly app: Express;

  constructor(private readonly controller: Controller) {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/api', this.controller.routes());
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`05-express-foundation listening on ${port}`);
    });
  }
}
