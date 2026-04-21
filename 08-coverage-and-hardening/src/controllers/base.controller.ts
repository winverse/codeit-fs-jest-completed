import type { RequestHandler } from "express";

export abstract class BaseController {
  protected readonly toHandler = <T extends RequestHandler>(handler: T) => handler.bind(this) as T;
}
