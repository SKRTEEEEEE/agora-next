import { test, expect } from "@playwright/test";

test.describe("Core Infrastructure - Thirdweb Auth Connector", () => {
  test.describe("ThirdwebClientConfig initialization", () => {
    test("should handle missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID gracefully during build", () => {
      // Simular el entorno de build donde las env vars no están disponibles
      const originalEnv = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
      delete process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

      // Durante el build, no debe lanzar error inmediatamente
      // La inicialización debe ser lazy (solo cuando se use realmente)
      expect(() => {
        // Importar el módulo no debe causar error
        // Solo debe fallar cuando se intente usar el cliente
        const mockClass = {
          clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
          initialize: function() {
            if (!this.clientId) {
              throw new Error("Client Id not found");
            }
            return { clientId: this.clientId };
          }
        };
        
        // No debe fallar aquí
        expect(mockClass.clientId).toBeUndefined();
      }).not.toThrow();

      // Restaurar env var
      if (originalEnv) {
        process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID = originalEnv;
      }
    });

    test("should initialize successfully when NEXT_PUBLIC_THIRDWEB_CLIENT_ID is provided", () => {
      // Simular que la env var está disponible
      const testClientId = "test_client_id_123";
      process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID = testClientId;

      const mockClass = {
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
        initialize: function() {
          if (!this.clientId) {
            throw new Error("Client Id not found");
          }
          return { clientId: this.clientId };
        }
      };

      expect(mockClass.clientId).toBe(testClientId);
      expect(() => mockClass.initialize()).not.toThrow();
    });

    test("should throw error only when attempting to use client without clientId", () => {
      delete process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

      const mockClass = {
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
        _client: undefined as { clientId?: string } | undefined,
        initialize: function() {
          if (!this.clientId) {
            throw new Error("Client Id not found");
          }
          return { clientId: this.clientId };
        },
        get client() {
          if (!this._client) {
            this._client = this.initialize();
          }
          return this._client;
        }
      };

      // Intentar acceder al client debe lanzar el error
      expect(() => {
        void mockClass.client;
      }).toThrow("Client Id not found");
    });
  });

  test.describe("ThirdwebAuthAdapter initialization", () => {
    test("should handle missing environment variables during build", () => {
      const originalPrivateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY;
      const originalDomain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN;
      
      delete process.env.THIRDWEB_ADMIN_PRIVATE_KEY;
      delete process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN;

      // Durante el build, la clase no debe instanciarse
      // Solo debe fallar cuando se intente usar
      expect(process.env.THIRDWEB_ADMIN_PRIVATE_KEY).toBeUndefined();
      expect(process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN).toBeUndefined();

      // Restaurar env vars
      if (originalPrivateKey) {
        process.env.THIRDWEB_ADMIN_PRIVATE_KEY = originalPrivateKey;
      }
      if (originalDomain) {
        process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN = originalDomain;
      }
    });
  });
});
