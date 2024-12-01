"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, Pencil, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const monthlyIncomeData = [
  { month: 'T1', amount: 25000000 },
  { month: 'T2', amount: 28000000 },
  { month: 'T3', amount: 26000000 },
  { month: 'T4', amount: 30000000 },
  { month: 'T5', amount: 27000000 },
  { month: 'T6', amount: 29000000 },
  { month: 'T7', amount: 31000000 },
]

const initialCategories = [
  { id: 1, name: 'Lương chính', amount: 20000000, color: '#FF6384' },
  { id: 2, name: 'Làm thêm', amount: 5000000, color: '#36A2EB' },
  { id: 3, name: 'Đầu tư', amount: 3000000, color: '#FFCE56' },
  { id: 4, name: 'Kinh doanh', amount: 8000000, color: '#4BC0C0' },
  { id: 5, name: 'Khác', amount: 1000000, color: '#9966FF' },
]

export default function IncomePage() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState({ name: '', amount: '', color: '#000000' })

  const totalIncome = categories.reduce((sum, category) => sum + category.amount, 0)

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

  const getIncomeChange = () => {
    const lastMonth = monthlyIncomeData[monthlyIncomeData.length - 1].amount
    const previousMonth = monthlyIncomeData[monthlyIncomeData.length - 2].amount
    const change = ((lastMonth - previousMonth) / previousMonth) * 100
    return change.toFixed(2)
  }

  const incomeChange = getIncomeChange()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Quản lý Thu nhập</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng thu nhập</CardTitle>
            <CardDescription>Tổng thu nhập của bạn từ tất cả các nguồn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalIncome.toLocaleString()} ₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thay đổi thu nhập</CardTitle>
            <CardDescription>So với tháng trước</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {incomeChange > 0 ? (
                <ArrowUpRight className="text-green-500 mr-2" />
              ) : (
                <ArrowDownRight className="text-red-500 mr-2" />
              )}
              <p className={`text-2xl font-bold ${incomeChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(parseFloat(incomeChange))}%
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
            <TrendingUp className="h-12 w-12 text-primary" />
            <p className="text-lg mt-2">Thu nhập đang tăng</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thu nhập theo tháng</CardTitle>
            <CardDescription>Biểu đồ thu nhập 7 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIncomeData}>
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
            <CardTitle>Phân bổ thu nhập theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ đóng góp của mỗi danh mục vào tổng thu nhập</CardDescription>
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

      <h2 className="text-2xl font-bold mb-4">Danh mục Thu nhập</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/thu-nhap/${category.id}`} key={category.id}>
            <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex-grow">
                <CardTitle className="flex justify-between items-center">
                  {category.name}
                  <Pencil className="h-4 w-4" />
                </CardTitle>
                <CardDescription>Đóng góp vào tổng thu nhập</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{category.amount.toLocaleString()} ₫</p>
                <p className="text-sm text-muted-foreground">
                  {((category.amount / totalIncome) * 100).toFixed(2)}% tổng thu nhập
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
              <DialogTitle>Thêm danh mục thu nhập mới</DialogTitle>
              <DialogDescription>Nhập thông tin cho danh mục thu nhập mới của bạn</DialogDescription>
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
