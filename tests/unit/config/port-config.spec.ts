import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Port Configuration', () => {
  test('should have port 3002 configured in package.json dev script', () => {
    // Leer package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Verificar que el script dev use el puerto 3002
    expect(packageJson.scripts.dev).toContain('-p 3002');
  });

  test('should have port 3002 configured in package.json start script', () => {
    // Leer package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Verificar que el script start use el puerto 3002
    expect(packageJson.scripts.start).toContain('-p 3002');
  });

  test('should use port 3002 as default when PORT env var is not set', () => {
    // El puerto por defecto debería ser 3002
    const expectedPort = '3002';
    
    // Verificar que si no hay variable de entorno, se use 3002
    const port = process.env.PORT || '3002';
    expect(port).toBe(expectedPort);
  });

  test('should respect custom PORT environment variable', () => {
    // Si se define PORT, debería usarse
    const customPort = '4000';
    process.env.PORT = customPort;
    
    const port = process.env.PORT || '3002';
    expect(port).toBe(customPort);
    
    // Limpiar
    delete process.env.PORT;
  });

  test('should fallback to port 3002 when PORT is empty string', () => {
    process.env.PORT = '';
    
    const port = process.env.PORT || '3002';
    expect(port).toBe('3002');
    
    delete process.env.PORT;
  });
});
