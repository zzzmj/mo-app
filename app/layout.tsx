import './globals.css'
import { Inter } from 'next/font/google'
import ToasterProvider from "@/components/ToasterProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '智能练习',
  description: '智能错题练习',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ToasterProvider />
          {children}
      </body>
    </html>
  )
}
