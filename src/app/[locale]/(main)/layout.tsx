import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header/site-header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark-soft"
        disableTransitionOnChange
      >
        <SiteHeader />
        {children}
      </ThemeProvider>
    </div>
  );
}
