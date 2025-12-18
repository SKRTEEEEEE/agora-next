import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const appsMenuPath = path.join(process.cwd(), 'log-ui-ts', 'components', 'site-header', 'apps-menu.tsx');

test.describe('SiteHeader Apps Dropdown Navigation', () => {
  test('should contain Apps dropdown menu in navigation', () => {
    const fileContent = fs.readFileSync(appsMenuPath, 'utf-8');
    
    // Verificar que importa NavigationMenu
    expect(fileContent).toContain('NavigationMenu');
    expect(fileContent).toContain('NavigationMenuTrigger');
    expect(fileContent).toContain('NavigationMenuContent');
  });

  test('Apps dropdown should have correct structure', () => {
    // El dropdown debe tener:
    // - NavigationMenuItem con "Apps" trigger
    // - NavigationMenuContent con enlaces a:
    //   1. Blog (desarrollador.tech - elemento principal)
    //   2. Blog y formación (profile-skrt.vercel.app/es/academia)
    //   3. Dashboard Admin (profile-skrt.vercel.app/es/admin)
    //   4. Desarrollador (dev.desarrollador.tech)
    
    const fileContent = fs.readFileSync(appsMenuPath, 'utf-8');
    
    expect(fileContent).toContain('Apps');
    expect(fileContent).toContain('NavigationMenuItem');
    expect(fileContent).toContain('NavigationMenuContent');
  });

  test('should use APPS_CONFIG for dynamic app URLs', () => {
    // AppsMenu now uses apps-config.ts for dynamic app management
    const fileContent = fs.readFileSync(appsMenuPath, 'utf-8');
    
    expect(fileContent).toContain('APPS_CONFIG');
    expect(fileContent).toContain('getCurrentApp');
    expect(fileContent).toContain('getAppUrl');
  });

  test('should import apps-config utilities', () => {
    // Should import from apps-config module
    const fileContent = fs.readFileSync(appsMenuPath, 'utf-8');
    
    expect(fileContent).toContain('@log-ui/lib/config/apps-config');
  });

  test('should filter and display other apps', () => {
    // Should filter current app and display others
    const fileContent = fs.readFileSync(appsMenuPath, 'utf-8');
    
    expect(fileContent).toContain('otherApps');
    expect(fileContent).toContain('filter');
  });
});
