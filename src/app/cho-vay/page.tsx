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
const initialLoans = [
  { id: 1, borrower: 'Nguyễn Văn A', amount: 5000000, remainingAmount: 3000000, date: '2023-07-01', dueDate: '2023-08-01', status: 'Đang trả' },
  { id: 2, borrower: 'Trần Thị B', amount: 2000000, remainingAmount: 0, date: '2023-07-10', dueDate: '2023-08-10', status: 'Đã trả' },
  { id: 3, borrower: 'Lê Văn C', amount: 3000000, remainingAmount: 3000000, date: '2023-07-15', dueDate: '2023-09-15', status: 'Chưa trả' },
]

export default function LendingPage() {
  const [loans, setLoans] = useState(initialLoans)
  const [newLoan, setNewLoan] = useState({ borrower: '', amount: '', date: new Date(), dueDate: new Date() })
  const [filter, setFilter] = useState('all')

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault()
    const loanToAdd = {
      id: Date.now(),
      borrower: newLoan.borrower,
      amount: parseFloat(newLoan.amount),
      remainingAmount: parseFloat(newLoan.amount),
      date: format(newLoan.date, 'yyyy-MM-dd'),
      dueDate: format(newLoan.dueDate, 'yyyy-MM-dd'),
      status: 'Chưa trả'
    }
    setLoans([...loans, loanToAdd])
    setNewLoan({ borrower: '', amount: '', date: new Date(), dueDate: new Date() })
  }

  const totalLent = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const totalRemaining = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0)
  const receivedPercentage = ((totalLent - totalRemaining) / totalLent) * 100

  const filteredLoans = loans.filter(loan => {
    if (filter === 'all') return true
    if (filter === 'paid') return loan.status === 'Đã trả'
    if (filter === 'unpaid') return loan.status !== 'Đã trả'
    return true
  })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Quản lý Cho vay</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng cho vay</CardTitle>
            <CardDescription>Tổng số tiền đã cho vay</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalLent.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Số tiền còn lại</CardTitle>
            <CardDescription>Số tiền chưa được hoàn trả</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-600">{totalRemaining.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ đã nhận</CardTitle>
            <CardDescription>Phần trăm tiền đã được hoàn trả</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{receivedPercentage.toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>
{/* 
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Biểu đồ phân bổ</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Danh sách khoản vay</h2>
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
            <Button><Plus className="mr-2 h-4 w-4" /> Thêm khoản cho vay</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khoản cho vay mới</DialogTitle>
              <DialogDescription>Nhập thông tin khoản cho vay mới</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddLoan} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrower">Người vay</Label>
                <Input
                  id="borrower"
                  value={newLoan.borrower}
                  onChange={(e) => setNewLoan({...newLoan, borrower: e.target.value})}
                  placeholder="Tên người vay"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Số tiền</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
                  placeholder="Nhập số tiền"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Ngày cho vay</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newLoan.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newLoan.date ? format(newLoan.date, "PPP") : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newLoan.date}
                      onSelect={(date) => date && setNewLoan({...newLoan, date})}
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
                        !newLoan.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newLoan.dueDate ? format(newLoan.dueDate, "PPP") : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newLoan.dueDate}
                      onSelect={(date) => date && setNewLoan({...newLoan, dueDate: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit">Thêm khoản vay</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLoans.map((loan) => (
          <Link href={`/cho-vay/${loan.id}`} key={loan.id}>
            <Card className={cn(
              "cursor-pointer transition-shadow hover:shadow-lg",
              loan.status === 'Đã trả' ? "bg-green-50" : 
              loan.status === 'Đang trả' ? "bg-yellow-50" : "bg-red-50"
            )}>
              <CardHeader>
                <CardTitle>{loan.borrower}</CardTitle>
                <CardDescription>Ngày cho vay: {loan.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Số tiền cho vay: {loan.amount.toLocaleString()} ₫</p>
                <p>Còn lại: {loan.remainingAmount.toLocaleString()} ₫</p>
                <p>Ngày đáo hạn: {loan.dueDate}</p>
                <p>Trạng thái: {loan.status}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}