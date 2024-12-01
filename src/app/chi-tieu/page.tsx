"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, Pencil, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const monthlyExpenseData = [
  { month: 'T1', amount: 15000000 },
  { month: 'T2', amount: 18000000 },
  { month: 'T3', amount: 16000000 },
  { month: 'T4', amount: 20000000 },
  { month: 'T5', amount: 17000000 },
  { month: 'T6', amount: 19000000 },
  { month: 'T7', amount: 21000000 },
]

const initialCategories = [
  { id: 1, name: 'Ăn uống', amount: 5000000, color: '#FF6384' },
  { id: 2, name: 'Di chuyển', amount: 2000000, color: '#36A2EB' },
  { id: 3, name: 'Mua sắm', amount: 3000000, color: '#FFCE56' },
  { id: 4, name: 'Giải trí', amount: 1000000, color: '#4BC0C0' },
  { id: 5, name: 'Hóa đơn', amount: 4000000, color: '#9966FF' },
]

export default function ChiTieu() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState({ name: '', amount: '', color: '#000000' })

  const totalExpense = categories.reduce((sum, category) => sum + category.amount, 0)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    const categoryToAdd = {
      id: Date.now(),
      name: newCategory.name,
      amount: parseFloat(newCategory.amount),
      color: newCategory.color
    }
    setCategories([...categories, categoryToAdd])
    setNewCategory({ name: '', amount: '', color: '#000000' })
  }

  const getExpenseChange = () => {
    const lastMonth = monthlyExpenseData[monthlyExpenseData.length - 1].amount
    const previousMonth = monthlyExpenseData[monthlyExpenseData.length - 2].amount
    const change = ((lastMonth - previousMonth) / previousMonth) * 100
    return change.toFixed(2)
  }

  const expenseChange = getExpenseChange()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Quản lý Chi tiêu</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng chi tiêu</CardTitle>
            <CardDescription>Tổng chi tiêu của bạn từ tất cả các nguồn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalExpense.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thay đổi chi tiêu</CardTitle>
            <CardDescription>So với tháng trước</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {parseFloat(expenseChange) > 0 ? (
                <ArrowUpRight className="text-red-500 mr-2" />
              ) : (
                <ArrowDownRight className="text-green-500 mr-2" />
              )}
              <p className={`text-2xl font-bold ${parseFloat(expenseChange) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(parseFloat(expenseChange))}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân tích xu hướng</CardTitle>
            <CardDescription>Dựa trên 3 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendingDown className="h-12 w-12 text-primary" />
            <p className="text-lg mt-2">Chi tiêu đang giảm</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chi tiêu theo tháng</CardTitle>
            <CardDescription>Biểu đồ chi tiêu 7 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bổ chi tiêu theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ đóng góp của mỗi danh mục vào tổng chi tiêu</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Danh mục Chi tiêu</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/chi-tieu/${category.id}`} key={category.id}>
            <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex-grow">
                <CardTitle className="flex justify-between items-center">
                  {category.name}
                  <Pencil className="h-4 w-4" />
                </CardTitle>
                <CardDescription>Đóng góp vào tổng chi tiêu</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{category.amount.toLocaleString()} ₫</p>
                <p className="text-sm text-muted-foreground">
                  {((category.amount / totalExpense) * 100).toFixed(2)}% tổng chi tiêu
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <CardContent className="pt-6">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-center">Thêm danh mục mới</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm danh mục chi tiêu mới</DialogTitle>
              <DialogDescription>Nhập thông tin cho danh mục chi tiêu mới của bạn</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Số tiền</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newCategory.amount}
                  onChange={(e) => setNewCategory({...newCategory, amount: e.target.value})}
                  placeholder="Nhập số tiền"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Màu sắc</Label>
                <Input
                  id="color"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                />
              </div>
              <Button type="submit">Thêm danh mục</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
