import './globals.css'
import { Providers } from './providers'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hemant.dev'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hemant Jha — Senior Frontend Engineer',
    template: '%s | Hemant Jha',
  },
  description:
    'Senior Frontend Engineer with 6+ years of experience building scalable, high-performance web applications using React, Next.js and TypeScript.',
  keywords: [
    'Hemant Jha',
    'Senior Frontend Engineer',
    'React Developer',
    'Next.js Engineer',
    'TypeScript',
    'Frontend Architecture',
    'Performance Optimization',
  ],
  authors: [{ name: 'Hemant Jha', url: siteUrl }],
  creator: 'Hemant Jha',
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Hemant Jha',
    title: 'Hemant Jha — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer building scalable, high-performance web applications with React, Next.js and TypeScript.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Jha — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer building scalable, high-performance web applications.',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </Providers>
      </body>
    </html>
  )
}
