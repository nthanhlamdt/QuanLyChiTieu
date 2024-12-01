"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Plus } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from 'next/link'

// Mock data
const initialBorrowings = [
  { id: 1, lender: 'Nguyễn Văn A', amount: 5000000, remainingAmount: 3000000, date: '2023-07-01', dueDate: '2023-08-01', status: 'Đang trả' },
  { id: 2, lender: 'Trần Thị B', amount: 2000000, remainingAmount: 0, date: '2023-07-10', dueDate: '2023-08-10', status: 'Đã trả' },
  { id: 3, lender: 'Lê Văn C', amount: 3000000, remainingAmount: 3000000, date: '2023-07-15', dueDate: '2023-09-15', status: 'Chưa trả' },
]

export default function MuonNo() {
  const [borrowings, setBorrowings] = useState(initialBorrowings)
  const [newBorrowing, setNewBorrowing] = useState({ lender: '', amount: '', date: new Date(), dueDate: new Date() })
  const [filter, setFilter] = useState('all')

  const handleAddBorrowing = (e: React.FormEvent) => {
    e.preventDefault()
    const borrowingToAdd = {
      id: Date.now(),
      lender: newBorrowing.lender,
      amount: parseFloat(newBorrowing.amount),
      remainingAmount: parseFloat(newBorrowing.amount),
      date: format(newBorrowing.date, 'yyyy-MM-dd'),
      dueDate: format(newBorrowing.dueDate, 'yyyy-MM-dd'),
      status: 'Chưa trả'
    }
    setBorrowings([...borrowings, borrowingToAdd])
    setNewBorrowing({ lender: '', amount: '', date: new Date(), dueDate: new Date() })
  }

  const totalBorrowed = borrowings.reduce((sum, borrowing) => sum + borrowing.amount, 0)
  const totalRemaining = borrowings.reduce((sum, borrowing) => sum + borrowing.remainingAmount, 0)
  const paidPercentage = ((totalBorrowed - totalRemaining) / totalBorrowed) * 100

  const filteredBorrowings = borrowings.filter(borrowing => {
    if (filter === 'all') return true
    if (filter === 'paid') return borrowing.status === 'Đã trả'
    if (filter === 'unpaid') return borrowing.status !== 'Đã trả'
    return true
  })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Quản lý Mượn nợ</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng mượn nợ</CardTitle>
            <CardDescription>Tổng số tiền đã mượn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalBorrowed.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Số tiền còn nợ</CardTitle>
            <CardDescription>Số tiền chưa trả</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-600">{totalRemaining.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ đã trả</CardTitle>
            <CardDescription>Phần trăm tiền đã trả</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{paidPercentage.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Danh sách khoản mượn</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="paid">Đã trả</SelectItem>
              <SelectItem value="unpaid">Chưa trả</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Thêm khoản mượn</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khoản mượn mới</DialogTitle>
              <DialogDescription>Nhập thông tin khoản mượn mới</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBorrowing} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lender">Người cho vay</Label>
                <Input
                  id="lender"
                  value={newBorrowing.lender}
                  onChange={(e) => setNewBorrowing({...newBorrowing, lender: e.target.value})}
                  placeholder="Tên người cho vay"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Số tiền</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newBorrowing.amount}
                  onChange={(e) => setNewBorrowing({...newBorrowing, amount: e.target.value})}
                  placeholder="Nhập số tiền"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày mượn</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBorrowing.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBorrowing.date ? format(newBorrowing.date, "PPP") : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBorrowing.date}
                      onSelect={(date) => date && setNewBorrowing({...newBorrowing, date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Ngày đáo hạn</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBorrowing.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBorrowing.dueDate ? format(newBorrowing.dueDate, "PPP") : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBorrowing.dueDate}
                      onSelect={(date) => date && setNewBorrowing({...newBorrowing, dueDate: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit">Thêm khoản mượn</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBorrowings.map((borrowing) => (
          <Link href={`/muon-no/${borrowing.id}`} key={borrowing.id}>
            <Card className={cn(
              "cursor-pointer transition-shadow hover:shadow-lg",
              borrowing.status === 'Đã trả' ? "bg-green-50" : 
              borrowing.status === 'Đang trả' ? "bg-yellow-50" : "bg-red-50"
            )}>
              <CardHeader>
                <CardTitle>{borrowing.lender}</CardTitle>
                <CardDescription>Ngày mượn: {borrowing.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Số tiền mượn: {borrowing.amount.toLocaleString()} ₫</p>
                <p>Còn nợ: {borrowing.remainingAmount.toLocaleString()} ₫</p>
                <p>Ngày đáo hạn: {borrowing.dueDate}</p>
                <p>Trạng thái: {borrowing.status}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}