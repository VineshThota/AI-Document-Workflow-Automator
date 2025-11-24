import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Document Workflow Automator',
  description: 'Intelligent document processing platform with automated workflow triggers. Combines computer vision OCR with smart automation for B2B operations.',
  keywords: 'AI, document processing, OCR, workflow automation, computer vision, B2B SaaS, machine learning',
  authors: [{ name: 'Vinesh Thota', email: 'vineshthota1@gmail.com' }],
  creator: 'Vinesh Thota',
  publisher: 'Vinesh Thota',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Document Workflow Automator',
    description: 'Transform your document processing with AI-powered automation',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Document Workflow Automator',
    description: 'Transform your document processing with AI-powered automation',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}