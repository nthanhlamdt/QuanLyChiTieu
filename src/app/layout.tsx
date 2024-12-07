// app/layout.tsx (Server-side)
import { Metadata } from 'next'
import './globals.css'
import ClientLayout from './ClientLayout'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Quản lý Chi tiêu',
  description: 'Ứng dụng quản lý chi tiêu cá nhân',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>  {/* Move AuthProvider here */}
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}