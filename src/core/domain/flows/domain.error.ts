export class UnauthorizedError extends Error {
    constructor(source: { name: string }, action: string) {
      super(`[${source.name}] Unauthorized: ${action}`);
      this.name = 'UnauthorizedError';
    }
  }
