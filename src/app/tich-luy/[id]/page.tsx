"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Pencil, Target, Plus } from 'lucide-react'
import { format, subMonths, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock data for demonstration
const generateMockData = (startDate: Date, endDate: Date) => {
  let currentDate = startDate;
  const data = [];
  while (currentDate <= endDate) {
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      amount: Math.floor(Math.random() * 2000000) + 1000000
    });
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return data;
};

const savingsCategories = [
  { id: 1, name: 'Quỹ khẩn cấp', color: '#FF6384', target: 50000000 },
  { id: 2, name: 'Tiết kiệm hưu trí', color: '#36A2EB', target: 200000000 },
  { id: 3, name: 'Mua nhà', color: '#FFCE56', target: 500000000 },
  { id: 4, name: 'Du lịch', color: '#4BC0C0', target: 30000000 },
  { id: 5, name: 'Đầu tư', color: '#9966FF', target: 100000000 },
]

export default function SavingsCategoryDetailPage() {
  const params = useParams()
  const categoryId = parseInt(params.id as string)
  const category = savingsCategories.find(cat => cat.id === categoryId)

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  const [viewMode, setViewMode] = useState('month')
  const [savingsData, setSavingsData] = useState<any[]>([])
  const [editingSaving, setEditingSaving] = useState<any | null>(null)
  const [isAddingNewSaving, setIsAddingNewSaving] = useState(false)
  const [newSaving, setNewSaving] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    amount: '',
    description: ''
  })

  useEffect(() => {
    const start = startOfDay(dateRange.from);
    const end = endOfDay(dateRange.to);
    setSavingsData(generateMockData(start, end));
  }, [dateRange]);

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
    const today = new Date();
    switch (mode) {
      case 'day':
        setDateRange({ from: startOfDay(today), to: endOfDay(today) });
        break;
      case 'month':
        setDateRange({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case 'year':
        setDateRange({ from: startOfYear(today), to: endOfYear(today) });
        break;
    }
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  const filteredData = savingsData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= dateRange.from && itemDate <= dateRange.to;
  });

  const totalSavings = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageSavings = totalSavings / filteredData.length;

  const handleEditSaving = (saving: any) => {
    setEditingSaving(saving);
  };

  const handleUpdateSaving = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cập nhật tiết kiệm:", editingSaving);
    setEditingSaving(null);
  };

  const handleAddNewSaving = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to save the new entry
    const newEntry = {
      date: newSaving.date,
      amount: parseFloat(newSaving.amount),
      description: newSaving.description
    }

    setSavingsData([...savingsData, newEntry])
    setNewSaving({
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: '',
      description: ''
    })
    setIsAddingNewSaving(false)
  }

  if (!category) {
    return <div>Mục tiêu tiết kiệm không tồn tại</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Chi tiết Tiết kiệm: {category.name}</h1>
        <Dialog open={isAddingNewSaving} onOpenChange={setIsAddingNewSaving}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm khoản tiết kiệm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khoản tiết kiệm mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin cho khoản tiết kiệm mới của bạn
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddNewSaving} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-date">Ngày</Label>
                <Input
                  id="new-date"
                  type="date"
                  value={newSaving.date}
                  onChange={(e) => setNewSaving({...newSaving, date: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-amount">Số tiền</Label>
                <Input
                  id="new-amount"
                  type="number"
                  placeholder="Nhập số tiền"
                  value={newSaving.amount}
                  onChange={(e) => setNewSaving({...newSaving, amount: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-description">Mô tả</Label>
                <Textarea
                  id="new-description"
                  placeholder="Nhập mô tả cho khoản tiết kiệm"
                  value={newSaving.description}
                  onChange={(e) => setNewSaving({...newSaving, description: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddingNewSaving(false)}>
                  Hủy
                </Button>
                <Button type="submit">Thêm khoản tiết kiệm</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng tiết kiệm</CardTitle>
            <CardDescription>Trong khoảng thời gian đã chọn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {totalSavings.toLocaleString()} ₫
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {((totalSavings / category.target) * 100).toFixed(1)}% mục tiêu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiết kiệm trung bình</CardTitle>
            <CardDescription>{viewMode === 'day' ? 'Mỗi ngày' : viewMode === 'month' ? 'Mỗi tháng' : 'Mỗi năm'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {averageSavings.toLocaleString()} ₫
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiến độ</CardTitle>
            <CardDescription>Hướng tới mục tiêu {category.target.toLocaleString()} ₫</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(totalSavings / category.target) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Còn {(category.target - totalSavings).toLocaleString()} ₫ để đạt mục tiêu
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Biểu đồ tiết kiệm</CardTitle>
            <div className="flex gap-4">
              <Select value={viewMode} onValueChange={handleViewModeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn chế độ xem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Theo ngày</SelectItem>
                  <SelectItem value="month">Theo tháng</SelectItem>
                  <SelectItem value="year">Theo năm</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Chọn khoảng thời gian</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke={category.color} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử tiết kiệm</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ngày</th>
                <th className="text-left p-2">Mô tả</th>
                <th className="text-right p-2">Số tiền</th>
                <th className="text-right p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.description || `Tiết kiệm ngày ${format(new Date(item.date), 'dd/MM/yyyy')}`}</td>
                  <td className="text-right p-2">{item.amount.toLocaleString()} ₫</td>
                  <td className="text-right p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditSaving(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa tiết kiệm</DialogTitle>
                          <DialogDescription>Cập nhật thông tin tiết kiệm của bạn</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdateSaving} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-date">Ngày</Label>
                            <Input
                              id="edit-date"
                              type="date"
                              value={editingSaving?.date}
                              onChange={(e) => setEditingSaving({...editingSaving, date: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-amount">Số tiền</Label>
                            <Input
                              id="edit-amount"
                              type="number"
                              value={editingSaving?.amount}
                              onChange={(e) => setEditingSaving({...editingSaving, amount: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Mô tả</Label>
                            <Textarea
                              id="edit-description"
                              value={editingSaving?.description}
                              onChange={(e) => setEditingSaving({...editingSaving, description: e.target.value})}
                            />
                          </div>
                          <Button type="submit">Cập nhật</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}