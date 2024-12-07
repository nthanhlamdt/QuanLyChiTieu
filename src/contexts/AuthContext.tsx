'use client'

import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React, { createContext, useState, useContext, useEffect } from 'react'

const users = [
  { id: 1, name: "Ngô Thành Lâm", email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, name: "Ngô Thành Lâm", email: "user@example.com", password: "user123", role: "user" }
]

type User = {
  id: string
  name: string
  email: string,
  role: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Kiểm tra xem có user đã đăng nhập trong localStorage không
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if the user exists in the "users" array (or DB)
    const checkEmail = users.find(user => user.email === email);

    console.log("checkmain: ", checkEmail === undefined)
    if (checkEmail === undefined) {
      console.log("Email không tồn tại toast");
      return toast({
        title: "Email không tồn tại",
        description: "Vui lòng kiểm tra email.",
      })
    }


    // Optionally check if password is correct (add validation here)
    if (checkEmail.password !== password) {
      return toast({
        title: "Sai mật khẩu",
        description: "Vui lòng kiểm tra lại mật khẩu.",
      });
    }

    const user = {
      id: checkEmail.id,
      name: checkEmail.name,
      email: checkEmail.email,
      role: checkEmail.role
    };

    setUser(user);

    localStorage.setItem('user', JSON.stringify(user));

    toast({
      title: "Đăng nhập thành công",
      description: `Chào mừng ${user.name}`,
    });

    router.push(`/${checkEmail.role == 'admin'? 'admin/doashboard' : '' }`)

  } catch (error) {
    console.error("Login error:", error);
    toast({
      title: "Đã xảy ra lỗi",
      description: "Vui lòng thử lại sau.",
    });
  }
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (name: string, email: string, password: string) => {
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const user = { id: '1', name, email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
