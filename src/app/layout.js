import PropTypes from 'prop-types'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import Navbar from '@/components/sections/navbar'
import Footer from '@/components/sections/footer'
import ScrollProgress from '@/components/ui/scroll-progress'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

export const metadata = {
  title: 'AngelLust for Congress — A New Standard of Service',
  description:
    'AngelLust is building a future-forward campaign for District 1 — practical policy, principled leadership, and an open door for every voter.',
}

const RootLayout = ({ children }) => (
  <html
    lang="en"
    data-scroll-behavior="smooth"
    className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
  >
    <body className="grain flex min-h-full flex-col bg-[var(--color-ink)] text-[var(--color-cream)]">
      <ScrollProgress />
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </body>
  </html>
)

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RootLayout
