import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('SiteHeader Apps Dropdown Navigation', () => {
  test('should contain Apps dropdown menu in navigation', () => {
    // Verificar que el SiteHeader contiene el menú desplegable de Apps
    const siteHeaderPath = path.join(process.cwd(), 'src', 'components', 'site-header', 'site-header.tsx');
    const fileContent = fs.readFileSync(siteHeaderPath, 'utf-8');
    
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
    
    const siteHeaderPath = path.join(process.cwd(), 'src', 'components', 'site-header', 'site-header.tsx');
    const fileContent = fs.readFileSync(siteHeaderPath, 'utf-8');
    
    expect(fileContent).toContain('Apps');
    expect(fileContent).toContain('NavigationMenuItem');
    expect(fileContent).toContain('NavigationMenuContent');
  });

  test('should have navigation to desarrollador.tech as main link', () => {
    // El elemento principal debe llevar a desarrollador.tech (/)
    const siteHeaderPath = path.join(process.cwd(), 'src', 'components', 'site-header', 'site-header.tsx');
    const fileContent = fs.readFileSync(siteHeaderPath, 'utf-8');
    
    expect(fileContent).toContain('desarrollador.tech');
  });

  test('should have external links to profile-skrt.vercel.app', () => {
    // Debe tener enlaces externos a:
    // - https://profile-skrt.vercel.app/es/academia
    // - https://profile-skrt.vercel.app/es/admin
    const siteHeaderPath = path.join(process.cwd(), 'src', 'components', 'site-header', 'site-header.tsx');
    const fileContent = fs.readFileSync(siteHeaderPath, 'utf-8');
    
    expect(fileContent).toContain('profile-skrt.vercel.app/es/academia');
    expect(fileContent).toContain('profile-skrt.vercel.app/es/admin');
  });

  test('should have link to dev.desarrollador.tech', () => {
    // Debe tener un enlace a dev.desarrollador.tech
    const siteHeaderPath = path.join(process.cwd(), 'src', 'components', 'site-header', 'site-header.tsx');
    const fileContent = fs.readFileSync(siteHeaderPath, 'utf-8');
    
    expect(fileContent).toContain('dev.desarrollador.tech');
  });
});
