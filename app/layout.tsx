import type { Metadata, Viewport } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AdminFloatButton } from '@/components/admin-float-button'
import './globals.css'
import { supabase } from '@/lib/supabase'   // ← Added

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-montserrat',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Urban Deal – პრემიუმ სნიკერები & სტრიტვეარი',
  description: 'ევროპული სნიკერები — პირდაპირ თბილისში. ორიგინალი. პრემიუმ. შენთვის.',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" className={`${montserrat.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <AdminFloatButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
