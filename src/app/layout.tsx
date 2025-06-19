import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalHeader from '@/components/ConditionalHeader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoadingProvider } from '@/context/LoadingContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adharvarun.com'),
  title: {
    default: 'Adharv Arun | AI Engineer & Software Developer',
    template: '%s | Adharv Arun'
  },
  description: 'AI Engineer and Software Developer specializing in machine learning, web development, and innovative solutions. Explore my portfolio of projects and experience.',
  keywords: [
    'AI Engineer',
    'Software Developer',
    'Machine Learning',
    'Web Development',
    'Portfolio',
    'React',
    'Next.js',
    'Python',
    'JavaScript',
    'Full Stack Developer'
  ],
  authors: [{ name: 'Adharv Arun' }],
  creator: 'Adharv Arun',
  publisher: 'Adharv Arun',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adharvarun.tech',
    siteName: "Adharv Arun's Portfolio",
    title: 'Adharv Arun | AI Engineer & Software Developer',
    description: 'AI Engineer and Software Developer specializing in machine learning, web development, and innovative solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Adharv Arun's Portfolio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adharv Arun | AI Engineer & Software Developer',
    description: 'AI Engineer and Software Developer specializing in machine learning, web development, and innovative solutions.',
    creator: '@adharvarun',
    images: ['/og-image.jpg'],
  },
  category: 'technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="shortcut icon" href="https://raw.githubusercontent.com/adharvarun/adharvarun/refs/heads/main/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="https://raw.githubusercontent.com/adharvarun/adharvarun/refs/heads/main/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Adharv Arun",
              "url": "https://adharvarun.com",
              "jobTitle": "AI Engineer & Software Developer",
              "sameAs": [
                "https://github.com/adharvarun",
                "https://linkedin.com/in/adharvarun"
              ],
              "knowsAbout": [
                "Machine Learning",
                "Web Development",
                "Artificial Intelligence",
                "Software Development"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white transition-colors duration-200`}>
        <LoadingProvider>
          <ConditionalHeader />
          {children}
          <SpeedInsights />
        </LoadingProvider>
      </body>
    </html>
  );
}
