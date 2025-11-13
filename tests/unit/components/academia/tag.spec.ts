import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const tagComponentPath = path.join(process.cwd(), 'src', 'components', 'academia', 'tag.tsx');

test.describe('Academia - Tag Component', () => {
  test('should exist and export Tag component', () => {
    expect(fs.existsSync(tagComponentPath)).toBeTruthy();
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should export Tag function
    expect(fileContent).toContain('export function Tag');
  });

  test('should import required dependencies', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should import slugify
    expect(fileContent).toContain('import slugify from "slugify"');
    
    // Should import badgeVariants
    expect(fileContent).toContain('badgeVariants');
    
    // Should import Link from routing
    expect(fileContent).toContain('import { Link }');
    expect(fileContent).toContain('@/lib/i18n/routing');
  });

  test('should have slug helper function', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should define slug helper
    expect(fileContent).toContain('function slug(text: string)');
    expect(fileContent).toContain('return slugify(text');
    expect(fileContent).toContain('lower: true');
    expect(fileContent).toContain('strict: true');
  });

  test('should have correct TagProps interface', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should define TagProps interface
    expect(fileContent).toContain('interface TagProps');
    expect(fileContent).toContain('tag: string');
    expect(fileContent).toContain('current?: boolean');
    expect(fileContent).toContain('count?: number');
  });

  test('should accept tag, current and count props', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should destructure props
    expect(fileContent).toContain('{ tag, current, count }');
    expect(fileContent).toContain(': TagProps');
  });

  test('should create href object for routing', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should define href with pathname and params
    expect(fileContent).toContain('const href');
    expect(fileContent).toContain('pathname: "/temas-ejercicios/[tema]"');
    expect(fileContent).toContain('params: { tema: slug(tag) }');
    expect(fileContent).toContain('as const');
  });

  test('should render Link component', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should return Link component
    expect(fileContent).toContain('return <Link');
    expect(fileContent).toContain('href={href}');
  });

  test('should use badgeVariants for styling', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should use badgeVariants with variant
    expect(fileContent).toContain('badgeVariants({');
    expect(fileContent).toContain('variant:');
    expect(fileContent).toContain('className:');
  });

  test('should change variant based on current prop', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should use ternary for variant
    expect(fileContent).toContain('current ? "default" : "secondary"');
  });

  test('should display count if provided', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should conditionally render count
    expect(fileContent).toContain('{tag}');
    expect(fileContent).toContain('count ?');
    expect(fileContent).toContain('count');
    expect(fileContent).toContain(': null');
  });

  test('should format count with parentheses', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should format count
    expect(fileContent).toContain('( ${count} )');
  });

  test('should apply rounded-md and no-underline classes', () => {
    const fileContent = fs.readFileSync(tagComponentPath, 'utf-8');
    
    // Should have specific classes
    expect(fileContent).toContain('rounded-md');
    expect(fileContent).toContain('no-underline');
  });
});
