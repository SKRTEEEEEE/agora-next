import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google";
import { routing } from '@/libs/i18n/routing';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { ReactNode } from 'react';

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en"|"de"|"es"|"ca")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});
 
  return (
    <html suppressHydrationWarning className="scroll-pt-[3.5rem]" lang={locale}>
      <body className={
          cn("min-h-dvh bg-background font-sans antialiased", fontSans.variable)
          }>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <NextIntlClientProvider  messages={messages}>
          <nav className="w-full">
            <ModeToggle/>
          </nav>
          <Toaster position="bottom-right"/>
          {children}
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}