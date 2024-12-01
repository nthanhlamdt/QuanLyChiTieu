import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, PiggyBank, TrendingUp, CreditCard } from 'lucide-react'
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Chào mừng đến với Ứng dụng Quản lý Tài chính</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số dư</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231,000 ₫</div>
            <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi tiêu tháng này</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234,000 ₫</div>
            <p className="text-xs text-muted-foreground">+4.5% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thu nhập tháng này</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,500,000 ₫</div>
            <p className="text-xs text-muted-foreground">+8.2% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiết kiệm</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,500,000 ₫</div>
            <p className="text-xs text-muted-foreground">+12.3% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu tiết kiệm</CardTitle>
            <CardDescription>Tiến độ tiết kiệm cho kỳ nghỉ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">8,500,000 ₫ / 20,000,000 ₫</div>
              <div className="text-sm font-medium">42.5%</div>
            </div>
            <Progress value={42.5} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chi tiêu gần đây</CardTitle>
            <CardDescription>5 giao dịch gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Siêu thị</span>
                <span className="font-medium">-500,000 ₫</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tiền điện</span>
                <span className="font-medium">-350,000 ₫</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tiền nước</span>
                <span className="font-medium">-120,000 ₫</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Ăn trưa</span>
                <span className="font-medium">-75,000 ₫</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Xăng xe</span>
                <span className="font-medium">-200,000 ₫</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hành động nhanh</CardTitle>
            <CardDescription>Truy cập nhanh các tính năng</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild>
              <Link href="/chi-tieu" className="w-full justify-between">
                Thêm chi tiêu mới <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/thu-nhap" className="w-full justify-between">
                Ghi nhận thu nhập <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/tich-luy" className="w-full justify-between">
                Cập nhật tiết kiệm <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
