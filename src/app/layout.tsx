import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalHeader from '@/components/ConditionalHeader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoadingProvider } from '@/context/LoadingContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adharv Arun',
  description: 'Portfolio website of Adharv Arun',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="https://raw.githubusercontent.com/adharvarun/adharvarun/refs/heads/main/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-black transition-colors duration-200`}>
        <LoadingProvider>
          <ConditionalHeader />
          {children}
          <SpeedInsights />
        </LoadingProvider>
      </body>
    </html>
  );
}
