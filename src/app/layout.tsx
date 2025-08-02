import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { Footer } from '@/components/layout';

import { Provider } from './Provider';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'A testing stage blog application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} bg-background text-foreground antialiased`}
      >
        <Provider>
          <div className="flex min-h-screen flex-col font-sans">
            <div className="grow">{children}</div>

            {/* Footer */}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
