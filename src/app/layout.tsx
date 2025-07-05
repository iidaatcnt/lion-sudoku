import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ライオン数独 - キッズ向け',
  description: '小学生でも楽しめる可愛いライオンテーマの4x4数独ゲームアプリ',
  keywords: '数独, キッズ, ライオン, パズル, 小学生, ゲーム',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦁</text></svg>" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}