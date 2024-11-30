import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='h-16 w-full bg-white shadow-sm flex justify-end items-center'>

      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none cursor-pointer'>
          <Bell className='mr-4 '/>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mr-16 w-52'>
          <DropdownMenuLabel className='text-xl'>Thông báo</DropdownMenuLabel>
          <DropdownMenuItem>Đã đến hạn thanh toán nợ cho Ngô Thành Lâm</DropdownMenuItem>
          <DropdownMenuItem>Số tiền tiết kiệm còn tiếu là 300k</DropdownMenuItem>
          <DropdownMenuItem>Bạn đã chi tiêu vượt mức</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <Avatar className='mr-5 cursor-pointer '>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mr-5'>
          <DropdownMenuLabel>Ngô Thành Lâm</DropdownMenuLabel>
          <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/dang-nhap' >
              Đăng xuất
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
