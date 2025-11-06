import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('NavigationMenu UI Component', () => {
  test('should have navigation-menu.tsx file in ui components', () => {
    // Verificar que existe el archivo navigation-menu.tsx
    const navigationMenuPath = path.join(process.cwd(), 'src', 'components', 'ui', 'navigation-menu.tsx');
    expect(fs.existsSync(navigationMenuPath)).toBe(true);
  });

  test('should export all required navigation menu components', () => {
    // Verificar que el archivo exporta todos los componentes necesarios
    const navigationMenuPath = path.join(process.cwd(), 'src', 'components', 'ui', 'navigation-menu.tsx');
    const fileContent = fs.readFileSync(navigationMenuPath, 'utf-8');
    
    expect(fileContent).toContain('export {');
    expect(fileContent).toContain('NavigationMenu');
    expect(fileContent).toContain('NavigationMenuList');
    expect(fileContent).toContain('NavigationMenuItem');
    expect(fileContent).toContain('NavigationMenuContent');
    expect(fileContent).toContain('NavigationMenuTrigger');
    expect(fileContent).toContain('NavigationMenuLink');
    expect(fileContent).toContain('NavigationMenuIndicator');
    expect(fileContent).toContain('NavigationMenuViewport');
    expect(fileContent).toContain('navigationMenuTriggerStyle');
  });

  test('should have correct radix-ui navigation-menu import', () => {
    const navigationMenuPath = path.join(process.cwd(), 'src', 'components', 'ui', 'navigation-menu.tsx');
    const fileContent = fs.readFileSync(navigationMenuPath, 'utf-8');
    
    expect(fileContent).toContain('@radix-ui/react-navigation-menu');
  });

  test('should define navigationMenuTriggerStyle with cva', () => {
    const navigationMenuPath = path.join(process.cwd(), 'src', 'components', 'ui', 'navigation-menu.tsx');
    const fileContent = fs.readFileSync(navigationMenuPath, 'utf-8');
    
    expect(fileContent).toContain('navigationMenuTriggerStyle');
    expect(fileContent).toContain('cva');
    expect(fileContent).toContain('inline-flex');
    expect(fileContent).toContain('items-center');
    expect(fileContent).toContain('rounded-md');
  });
});
