"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, Pencil, TrendingUp, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const monthlySavingsData = [
  { month: 'T1', amount: 5000000 },
  { month: 'T2', amount: 7000000 },
  { month: 'T3', amount: 6000000 },
  { month: 'T4', amount: 8000000 },
  { month: 'T5', amount: 9000000 },
  { month: 'T6', amount: 10000000 },
  { month: 'T7', amount: 12000000 },
]

const initialSavingsCategories = [
  { id: 1, name: 'Quỹ khẩn cấp', amount: 20000000, target: 50000000, color: '#FF6384' },
  { id: 2, name: 'Tiết kiệm hưu trí', amount: 50000000, target: 200000000, color: '#36A2EB' },
  { id: 3, name: 'Mua nhà', amount: 100000000, target: 500000000, color: '#FFCE56' },
  { id: 4, name: 'Du lịch', amount: 15000000, target: 30000000, color: '#4BC0C0' },
  { id: 5, name: 'Đầu tư', amount: 40000000, target: 100000000, color: '#9966FF' },
]

export default function TichLuy() {
  const [categories, setCategories] = useState(initialSavingsCategories)
  const [newCategory, setNewCategory] = useState({ name: '', amount: '', target: '', color: '#000000' })

  const totalSavings = categories.reduce((sum, category) => sum + category.amount, 0)
  const totalTarget = categories.reduce((sum, category) => sum + category.target, 0)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    const categoryToAdd = {
      id: Date.now(),
      name: newCategory.name,
      amount: parseFloat(newCategory.amount),
      target: parseFloat(newCategory.target),
      color: newCategory.color
    }
    setCategories([...categories, categoryToAdd])
    setNewCategory({ name: '', amount: '', target: '', color: '#000000' })
  }

  const getSavingsChange = () => {
    const lastMonth = monthlySavingsData[monthlySavingsData.length - 1].amount
    const previousMonth = monthlySavingsData[monthlySavingsData.length - 2].amount
    const change = ((lastMonth - previousMonth) / previousMonth) * 100
    return change.toFixed(2)
  }

  const savingsChange = getSavingsChange()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Quản lý Tiết kiệm</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng tiết kiệm</CardTitle>
            <CardDescription>Tổng số tiền tiết kiệm hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalSavings.toLocaleString()} ₫</p>
            <p className="text-sm text-muted-foreground mt-2">
              {((totalSavings / totalTarget) * 100).toFixed(1)}% mục tiêu đạt được
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tăng trưởng tiết kiệm</CardTitle>
            <CardDescription>So với tháng trước</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {parseFloat(savingsChange) > 0 ? (
                <ArrowUpRight className="text-green-500 mr-2" />
              ) : (
                <ArrowDownRight className="text-red-500 mr-2" />
              )}
              <p className={`text-2xl font-bold ${parseFloat(savingsChange) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(parseFloat(savingsChange))}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng tiết kiệm</CardTitle>
            <CardDescription>Dựa trên 3 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendingUp className="h-12 w-12 text-primary" />
            <p className="text-lg mt-2">Tiết kiệm đang tăng</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tiết kiệm theo tháng</CardTitle>
            <CardDescription>Biểu đồ tiết kiệm 7 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bổ tiết kiệm theo mục tiêu</CardTitle>
            <CardDescription>Tỷ lệ phân bổ cho từng mục tiêu tiết kiệm</CardDescription>
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

      <h2 className="text-2xl font-bold mb-4">Mục tiêu Tiết kiệm</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/tich-luy/${category.id}`} key={category.id}>
            <Card className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex-grow">
                <CardTitle className="flex justify-between items-center">
                  {category.name}
                  <Pencil className="h-4 w-4" />
                </CardTitle>
                <CardDescription>Tiến độ đạt mục tiêu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{category.amount.toLocaleString()} ₫</p>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{category.target.toLocaleString()} ₫</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(category.amount / category.target) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {((category.amount / category.target) * 100).toFixed(1)}% hoàn thành
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <CardContent className="pt-6">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-center">Thêm mục tiêu mới</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm mục tiêu tiết kiệm mới</DialogTitle>
              <DialogDescription>Nhập thông tin cho mục tiêu tiết kiệm mới của bạn</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên mục tiêu</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Nhập tên mục tiêu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Số tiền hiện tại</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newCategory.amount}
                  onChange={(e) => setNewCategory({...newCategory, amount: e.target.value})}
                  placeholder="Nhập số tiền hiện có"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Mục tiêu</Label>
                <Input
                  id="target"
                  type="number"
                  value={newCategory.target}
                  onChange={(e) => setNewCategory({...newCategory, target: e.target.value})}
                  placeholder="Nhập số tiền mục tiêu"
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
              <Button type="submit">Thêm mục tiêu</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}