import type { Response } from 'express';

export abstract class BaseController {
  protected ok<T>(res: Response, body: T, status = 200) {
    return res.status(status).json(body);
  }

  protected fail(res: Response, status: number, message: string) {
    return res.status(status).json({ message });
  }

  protected noContent(res: Response) {
    return res.status(204).send();
  }
}
