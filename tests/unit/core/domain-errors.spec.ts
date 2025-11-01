import { test, expect } from "@playwright/test";
import { UnauthorizedError, SetEnvError } from "@/core/domain/flows/domain.error";

test.describe("Core Domain - Error Classes", () => {
  test.describe("UnauthorizedError", () => {
    test("should create error with correct message format", () => {
      const source = { name: "UserService" };
      const action = "delete user";
      const error = new UnauthorizedError(source, action);
      
      expect(error.message).toBe("[UserService] Unauthorized: delete user");
      expect(error.name).toBe("UnauthorizedError");
    });

    test("should be instance of Error", () => {
      const error = new UnauthorizedError({ name: "TestService" }, "test action");
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
    });

    test("should include source name in message", () => {
      const error = new UnauthorizedError({ name: "AuthService" }, "login");
      
      expect(error.message).toContain("AuthService");
    });

    test("should include action in message", () => {
      const error = new UnauthorizedError({ name: "Service" }, "perform action");
      
      expect(error.message).toContain("perform action");
    });

    test("should format message consistently", () => {
      const error = new UnauthorizedError({ name: "API" }, "access resource");
      
      expect(error.message).toMatch(/\[.*\] Unauthorized: .*/);
    });

    test("should handle empty source name", () => {
      const error = new UnauthorizedError({ name: "" }, "action");
      
      expect(error.message).toBe("[] Unauthorized: action");
    });

    test("should handle empty action", () => {
      const error = new UnauthorizedError({ name: "Service" }, "");
      
      expect(error.message).toBe("[Service] Unauthorized: ");
    });
  });

  test.describe("SetEnvError", () => {
    test("should create error with correct message format", () => {
      const envName = "DATABASE_URL";
      const source = { name: "DatabaseService" };
      const error = new SetEnvError(envName, source);
      
      expect(error.message).toBe("[DatabaseService] Missing environment variable: DATABASE_URL");
      expect(error.name).toBe("SetEnvError");
    });

    test("should be instance of Error", () => {
      const error = new SetEnvError("API_KEY", { name: "TestService" });
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(SetEnvError);
    });

    test("should include environment variable name in message", () => {
      const error = new SetEnvError("API_SECRET", { name: "Service" });
      
      expect(error.message).toContain("API_SECRET");
    });

    test("should include source name in message", () => {
      const error = new SetEnvError("ENV_VAR", { name: "ConfigService" });
      
      expect(error.message).toContain("ConfigService");
    });

    test("should format message consistently", () => {
      const error = new SetEnvError("VAR", { name: "Service" });
      
      expect(error.message).toMatch(/\[.*\] Missing environment variable: .*/);
    });

    test("should handle different environment variable names", () => {
      const envVars = ["API_KEY", "DATABASE_URL", "SECRET_TOKEN", "STRIPE_KEY"];
      
      envVars.forEach(envVar => {
        const error = new SetEnvError(envVar, { name: "Service" });
        expect(error.message).toContain(envVar);
      });
    });

    test("should handle empty environment variable name", () => {
      const error = new SetEnvError("", { name: "Service" });
      
      expect(error.message).toBe("[Service] Missing environment variable: ");
    });

    test("should handle empty source name", () => {
      const error = new SetEnvError("ENV_VAR", { name: "" });
      
      expect(error.message).toBe("[] Missing environment variable: ENV_VAR");
    });
  });

  test.describe("Error comparison", () => {
    test("should differentiate between UnauthorizedError and SetEnvError", () => {
      const unauthorized = new UnauthorizedError({ name: "Service" }, "action");
      const setEnv = new SetEnvError("VAR", { name: "Service" });
      
      expect(unauthorized.name).not.toBe(setEnv.name);
      expect(unauthorized.message).not.toBe(setEnv.message);
    });

    test("should have correct error names", () => {
      const unauthorized = new UnauthorizedError({ name: "Service" }, "action");
      const setEnv = new SetEnvError("VAR", { name: "Service" });
      
      expect(unauthorized.name).toBe("UnauthorizedError");
      expect(setEnv.name).toBe("SetEnvError");
    });
  });
});
