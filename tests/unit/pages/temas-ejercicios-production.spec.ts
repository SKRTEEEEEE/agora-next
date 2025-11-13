import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Unit Tests - Production Configuration for Temas Ejercicios
 * Verifies that dynamic routes are properly configured for static export
 */
test.describe('Unit Tests - Temas Ejercicios Production Config', () => {
  const temaPagePath = path.join(
    process.cwd(),
    'src',
    'app',
    '[locale]',
    'temas-ejercicios',
    '[tema]',
    'page.tsx'
  );

  test('should exist [tema] page file', () => {
    expect(fs.existsSync(temaPagePath)).toBeTruthy();
  });

  test('should have generateStaticParams export for static generation', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Must export generateStaticParams
    expect(fileContent).toContain('export const generateStaticParams');
    
    // Should return array of params
    expect(fileContent).toContain('getAllTags(ejercicios)');
    expect(fileContent).toContain('paths');
  });

  test('should have dynamicParams = false to prevent dynamic routes in production', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Must export dynamicParams = false for strict static generation
    expect(fileContent).toMatch(/export\s+const\s+dynamicParams\s*=\s*false/);
  });

  test('should have dynamic = "force-static" or "error" for production builds', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Must export dynamic route segment config
    // Can be either "force-static" or "error" - both prevent DYNAMIC_SERVER_USAGE
    const hasForceStatic = fileContent.match(/export\s+const\s+dynamic\s*=\s*['"]force-static['"]/);
    const hasError = fileContent.match(/export\s+const\s+dynamic\s*=\s*['"]error['"]/);
    
    expect(hasForceStatic || hasError).toBeTruthy();
  });

  test('should properly handle async params according to Next.js 15+', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Should await params in both component and generateMetadata
    expect(fileContent).toContain('await props.params');
    
    // Should use Promise<{ tema: string }> in params interface
    expect(fileContent).toMatch(/params:\s*Promise<\{/);
    expect(fileContent).toContain('tema: string');
  });

  test('should use getAllTags for generating static paths', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Should import getAllTags
    expect(fileContent).toContain('getAllTags');
    
    // Should use it in generateStaticParams
    const staticParamsMatch = fileContent.match(/export\s+const\s+generateStaticParams[\s\S]*?getAllTags\(ejercicios\)/);
    expect(staticParamsMatch).toBeTruthy();
    
    if (staticParamsMatch) {
      expect(staticParamsMatch[0]).toContain('getAllTags(ejercicios)');
    }
  });

  test('should return correct shape from generateStaticParams', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Should return array with { tema: slug(tag) } objects
    expect(fileContent).toContain('tema:');
    expect(fileContent).toContain('slug(tag)');
  });

  test('should not use dynamic server functions without proper config', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Should not use cookies(), headers(), searchParams without proper handling
    const hasCookies = fileContent.includes('cookies()');
    const hasHeaders = fileContent.includes('headers()');
    const hasSearchParams = fileContent.includes('searchParams');
    
    // If any of these are used, must have dynamic config
    if (hasCookies || hasHeaders || hasSearchParams) {
      const hasDynamicConfig = fileContent.match(/export\s+const\s+dynamic\s*=/);
      expect(hasDynamicConfig).toBeTruthy();
    }
  });

  test('should import slugify for URL generation', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    expect(fileContent).toContain("import slugify from");
    expect(fileContent).toContain('slugify');
  });

  test('should have slug helper function matching github-slugger behavior', () => {
    const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
    
    // Should define slug function
    expect(fileContent).toContain('function slug(text: string)');
    
    // Should use slugify with proper options
    expect(fileContent).toContain('lower: true');
    expect(fileContent).toContain('strict: true');
  });
});

test.describe('Unit Tests - Next.js Config for Production', () => {
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');

  test('should have standalone output for Docker', () => {
    const fileContent = fs.readFileSync(nextConfigPath, 'utf-8');
    
    // Should have output: 'standalone' for Docker
    expect(fileContent).toContain("output: 'standalone'");
  });

  test('should not have conflicting export settings', () => {
    const fileContent = fs.readFileSync(nextConfigPath, 'utf-8');
    
    // Should not have both output: 'export' and output: 'standalone'
    const hasExport = fileContent.includes("output: 'export'");
    const hasStandalone = fileContent.includes("output: 'standalone'");
    
    // Only one should be true
    if (hasExport && hasStandalone) {
      expect(false).toBeTruthy(); // Fail test if both exist
    }
  });

  test('should have image remote patterns configured', () => {
    const fileContent = fs.readFileSync(nextConfigPath, 'utf-8');
    
    // Should configure remote patterns for images
    expect(fileContent).toContain('remotePatterns');
  });
});

test.describe('Unit Tests - Dockerfile Production Build', () => {
  const dockerfilePath = path.join(process.cwd(), 'Dockerfile');

  test('should exist Dockerfile', () => {
    expect(fs.existsSync(dockerfilePath)).toBeTruthy();
  });

  test('should copy standalone output', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should copy .next/standalone directory
    expect(fileContent).toContain('.next/standalone');
  });

  test('should copy static files', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should copy .next/static directory
    expect(fileContent).toContain('.next/static');
  });

  test('should expose correct port', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should expose port 3002
    expect(fileContent).toContain('EXPOSE 3002');
    expect(fileContent).toContain('PORT=3002');
  });

  test('should set NODE_ENV to production', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should set NODE_ENV=production
    expect(fileContent).toContain('NODE_ENV=production');
  });

  test('should disable telemetry', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should disable Next.js telemetry
    expect(fileContent).toContain('NEXT_TELEMETRY_DISABLED=1');
  });

  test('should run as non-root user', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should create and use nextjs user
    expect(fileContent).toContain('adduser');
    expect(fileContent).toContain('nextjs');
    expect(fileContent).toContain('USER nextjs');
  });

  test('should use node command to run server.js', () => {
    const fileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Should use node server.js (standalone output)
    expect(fileContent).toContain('CMD ["node", "server.js"]');
  });
});
