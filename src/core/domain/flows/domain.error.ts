export class UnauthorizedError extends Error {
    constructor(source: { name: string }, action: string) {
      super(`[${source.name}] Unauthorized: ${action}`);
      this.name = 'UnauthorizedError';
    }
  }

export class SetEnvError extends Error {
    constructor(envName: string, source: { name: string }) {
      super(`[${source.name}] Missing environment variable: ${envName}`);
      this.name = 'SetEnvError';
    }
  }
