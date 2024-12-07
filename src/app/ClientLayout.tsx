'use client'

import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()  // Fetch user from context

  return (
    <>
      {user ? (
        <div className="flex w-screen h-screen bg-gray-100">
          <Sidebar user={user} />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </div>
      ) : (
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      )}
      <Toaster />
    </>
  )
}