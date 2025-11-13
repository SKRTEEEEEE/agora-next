import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ejercicioItemPath = path.join(process.cwd(), 'src', 'components', 'academia', 'ejercicio-item.tsx');

test.describe('Academia - EjercicioItem Component', () => {
  test('should exist and export EjercicioItem component', () => {
    expect(fs.existsSync(ejercicioItemPath)).toBeTruthy();
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should export EjercicioItem function
    expect(fileContent).toContain('export function EjercicioItem');
  });

  test('should import required dependencies', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should import Calendar icon
    expect(fileContent).toContain('import { Calendar }');
    expect(fileContent).toContain('lucide-react');
    
    // Should import buttonVariants
    expect(fileContent).toContain('buttonVariants');
    
    // Should import cn and formatDate utilities
    expect(fileContent).toContain('import { cn, formatDate }');
    
    // Should import Tag component
    expect(fileContent).toContain('import { Tag }');
    
    // Should import Link
    expect(fileContent).toContain('import { Link }');
    expect(fileContent).toContain('@/lib/i18n/routing');
  });

  test('should have PostItemProps interface', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should define PostItemProps interface
    expect(fileContent).toContain('interface PostItemProps');
    expect(fileContent).toContain('slug: string');
    expect(fileContent).toContain('title: string');
    expect(fileContent).toContain('description?: string');
    expect(fileContent).toContain('date: string');
    expect(fileContent).toContain('tags?: Array<string>');
  });

  test('should accept all required props', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should destructure all props
    expect(fileContent).toContain('{ slug, title, description, date, tags }');
    expect(fileContent).toContain(': PostItemProps');
  });

  test('should handle slug processing correctly', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should remove 'ejercicios/' prefix
    expect(fileContent).toContain('slug.startsWith("ejercicios/")');
    expect(fileContent).toContain('slug.substring("ejercicios/".length)');
    expect(fileContent).toContain('.split("/")');
  });

  test('should create href object with slug parts', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should define href with pathname and params
    expect(fileContent).toContain('const href');
    expect(fileContent).toContain('pathname: "/ejercicios/[...slug]"');
    expect(fileContent).toContain('params: { slug: slugParts }');
    expect(fileContent).toContain('as const');
  });

  test('should render as article element', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should return article
    expect(fileContent).toContain('return <article');
    expect(fileContent).toContain('flex flex-col');
  });

  test('should render title as h2 with link', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should have h2 with title
    expect(fileContent).toContain('<h2');
    expect(fileContent).toContain('text-2xl');
    expect(fileContent).toContain('font-bold');
    expect(fileContent).toContain('{title}');
    expect(fileContent).toContain('<Link href={href}>{title}</Link>');
  });

  test('should render tags using map', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should map through tags
    expect(fileContent).toContain('tags?.map');
    expect(fileContent).toContain('<Tag tag={tag}');
    expect(fileContent).toContain('key={tag}');
  });

  test('should render description', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should render description
    expect(fileContent).toContain('{description}');
    expect(fileContent).toContain('text-muted-foreground');
  });

  test('should render formatted date', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should use formatDate utility
    expect(fileContent).toContain('formatDate(date)');
    
    // Should have time element
    expect(fileContent).toContain('<time dateTime={date}>');
  });

  test('should render Calendar icon', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should render Calendar component
    expect(fileContent).toContain('<Calendar');
    expect(fileContent).toContain('h-4 w-4');
  });

  test('should have semantic dl/dt/dd structure for date', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should use proper semantic HTML
    expect(fileContent).toContain('<dl>');
    expect(fileContent).toContain('<dt className="sr-only">Published On</dt>');
    expect(fileContent).toContain('<dd');
  });

  test('should render "Read more" link', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should have read more link
    expect(fileContent).toContain('Read more');
    expect(fileContent).toContain('variant: "link"');
  });

  test('should use buttonVariants for link styling', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should use buttonVariants with cn
    expect(fileContent).toContain('cn(buttonVariants');
  });

  test('should have proper spacing and layout classes', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should have layout classes
    expect(fileContent).toContain('flex flex-col gap-2');
    expect(fileContent).toContain('border-border border-b');
    expect(fileContent).toContain('py-3');
  });

  test('should have flex layout for date and read more', () => {
    const fileContent = fs.readFileSync(ejercicioItemPath, 'utf-8');
    
    // Should have flex justify-between layout
    expect(fileContent).toContain('flex justify-between items-center');
  });
});
