/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React from 'react'
import { Home, ListTodo, User, DollarSign, PiggyBank, Briefcase, TrendingUp, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const menuItems = [
  { name: 'Trang chủ', href: '/', icon: Home },
  { name: 'Tài khoản', href: '/tai-khoan', icon: User },
  { name: 'Chi tiêu', href: '/chi-tieu', icon: DollarSign },
  {name: 'Thu nhập', href: '/thu-nhap', icon: TrendingUp},
  { name: 'Cho vay', href: '/cho-vay', icon: Briefcase },
  { name: 'Mượn nợ', href: '/muon-no', icon: ListTodo },
  { name: 'Tích lũy', href: '/tich-luy', icon: PiggyBank },
  { name: 'Phương pháp', href: '/phuong-phap', icon: BookOpen },
]
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="h-screen flex flex-col">
        <div className="p-4 text-xl font-bold">QUANLYCHITIEU</div>
        <ul className="flex-1 overflow-y-auto">
          {
            (
              menuItems.map((item) => (
              <Link key={item.name} href={item.href} >
                <li  className="mb-1">
                  <div 
                    className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'bg-gray-100' : ''}`}
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                    <span className="flex-grow">
                      {item.name}
                    </span>
                  </div>
                </li>
              </Link>
              )))
          }
        </ul>
      </nav>

    </aside>
  )
}
