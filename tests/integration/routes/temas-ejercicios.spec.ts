import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const temasPagePath = path.join(process.cwd(), 'src', 'app', '[locale]', 'temas-ejercicios', 'page.tsx');
const temaPagePath = path.join(process.cwd(), 'src', 'app', '[locale]', 'temas-ejercicios', '[tema]', 'page.tsx');

test.describe('Integration Tests - Temas Ejercicios Routes', () => {
  test.describe('/temas-ejercicios page', () => {
    test('should exist and export default component', () => {
      expect(fs.existsSync(temasPagePath)).toBeTruthy();
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Verify it exports a default component
      expect(fileContent).toMatch(/export\s+default\s+(async\s+)?function\s+\w+/);
    });

    test('should import required utilities', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Check for required imports
      expect(fileContent).toContain('getAllTags');
      expect(fileContent).toContain('sortTagsByCount');
      expect(fileContent).toContain('ejercicios');
    });

    test('should have correct metadata', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Should export metadata
      expect(fileContent).toContain('export const metadata');
      expect(fileContent).toContain('title');
      expect(fileContent).toContain('description');
    });

    test('should render Tag components', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Should import and use Tag component
      expect(fileContent).toContain('Tag');
      expect(fileContent).toContain('<Tag');
    });

    test('should use correct container structure', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Check for layout structure
      expect(fileContent).toContain('container');
      expect(fileContent).toContain('max-w-4xl');
    });

    test('should display heading', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Should have h1 heading
      expect(fileContent).toContain('<h1');
      expect(fileContent).toContain('Tags');
    });

    test('should map through sorted tags', () => {
      const fileContent = fs.readFileSync(temasPagePath, 'utf-8');
      
      // Should iterate through tags
      expect(fileContent).toContain('sortedTags?.map');
      expect(fileContent).toContain('key={tag}');
    });
  });

  test.describe('/temas-ejercicios/[tema] dynamic page', () => {
    test('should exist and export default async component', () => {
      expect(fs.existsSync(temaPagePath)).toBeTruthy();
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Verify it exports an async component
      expect(fileContent).toMatch(/export\s+default\s+async\s+function\s+\w+/);
    });

    test('should import required utilities and components', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Check for required imports
      expect(fileContent).toContain('getAllTags');
      expect(fileContent).toContain('getPostsByTagSlug');
      expect(fileContent).toContain('sortTagsByCount');
      expect(fileContent).toContain('ejercicios');
      expect(fileContent).toContain('Tag');
      expect(fileContent).toContain('EjercicioItem');
    });

    test('should have generateMetadata function', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should export generateMetadata
      expect(fileContent).toContain('export async function generateMetadata');
      expect(fileContent).toContain('Promise<Metadata>');
      expect(fileContent).toContain('await props.params');
    });

    test('should have generateStaticParams function', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should export generateStaticParams for static generation
      expect(fileContent).toContain('export const generateStaticParams');
      expect(fileContent).toContain('getAllTags(ejercicios)');
    });

    test('should use slug helper function', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should have slug helper that uses slugify
      expect(fileContent).toContain('slugify');
      expect(fileContent).toContain('function slug');
    });

    test('should await params properly', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should await params according to Next.js 15+ requirements
      expect(fileContent).toContain('await props.params');
      expect(fileContent).toMatch(/const\s+params\s+=\s+await\s+props\.params/);
    });

    test('should render EjercicioItem components', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should map through posts and render EjercicioItem
      expect(fileContent).toContain('displayPosts?.map');
      expect(fileContent).toContain('<EjercicioItem');
      expect(fileContent).toContain('slug={slug}');
    });

    test('should have Card with tags sidebar', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should render a Card component with tags
      expect(fileContent).toContain('<Card');
      expect(fileContent).toContain('CardHeader');
      expect(fileContent).toContain('CardTitle');
      expect(fileContent).toContain('CardContent');
    });

    test('should handle empty state', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should handle case when there are no posts
      expect(fileContent).toContain('displayPosts?.length > 0');
      expect(fileContent).toContain('No hay ejercicios');
    });

    test('should use grid layout', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should use grid layout for responsive design
      expect(fileContent).toContain('grid');
      expect(fileContent).toContain('grid-cols-12');
    });

    test('should capitalize title', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should transform tema slug to readable title
      expect(fileContent).toContain('split("-").join(" ")');
      expect(fileContent).toContain('capitalize');
    });

    test('should mark current tag in sidebar', () => {
      const fileContent = fs.readFileSync(temaPagePath, 'utf-8');
      
      // Should mark the current tag
      expect(fileContent).toContain('current={');
      expect(fileContent).toMatch(/current=\{.*slug.*===.*tema.*\}/);
    });
  });

  test.describe('Route i18n configuration', () => {
    const routingPath = path.join(process.cwd(), 'src', 'lib', 'i18n', 'routing.ts');

    test('should have /temas-ejercicios route configured', () => {
      const fileContent = fs.readFileSync(routingPath, 'utf-8');
      
      // Check for route configuration
      expect(fileContent).toContain('"/temas-ejercicios"');
    });

    test('should have translations for all locales', () => {
      const fileContent = fs.readFileSync(routingPath, 'utf-8');
      
      // Check for Spanish
      expect(fileContent).toMatch(/es:\s*"\/temas-ejercicios"/);
      
      // Check for Catalan
      expect(fileContent).toMatch(/ca:\s*"\/temes-exercicis"/);
      
      // Check for English
      expect(fileContent).toMatch(/en:\s*"\/exercise-topics"/);
      
      // Check for German
      expect(fileContent).toMatch(/de:\s*"\/ubungsthemen"/);
    });

    test('should have dynamic route segment configured', () => {
      const fileContent = fs.readFileSync(routingPath, 'utf-8');
      
      // Check for dynamic segment
      expect(fileContent).toContain('"/temas-ejercicios/[tema]"');
    });

    test('should have dynamic translations for all locales', () => {
      const fileContent = fs.readFileSync(routingPath, 'utf-8');
      
      // Check dynamic routes for all locales
      expect(fileContent).toMatch(/es:\s*"\/temas-ejercicios\/\[tema\]"/);
      expect(fileContent).toMatch(/ca:\s*"\/temes-exercicis\/\[tema\]"/);
      expect(fileContent).toMatch(/en:\s*"\/exercise-topics\/\[tema\]"/);
      expect(fileContent).toMatch(/de:\s*"\/ubungsthemen\/\[tema\]"/);
    });
  });
});
