import { Activity, ArrowUpRight, CreditCard, Euro, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatCard, StatCardGroup } from "@/components/ui/stat-card"

export function DashboardStats() {
  return (
    <div className="bg-background w-full space-y-6 p-6">
      {/* Stats Grid */}
      <StatCardGroup columns={4}>
        <StatCard
          label="Total Revenue"
          value="45 231 €"
          trend={20}
          trendLabel="from last month"
          icon={<Euro className="size-4" />}
        />
        <StatCard
          label="Subscriptions"
          value="+2 350"
          trend={180}
          trendLabel="from last month"
          icon={<Users className="size-4" />}
        />
        <StatCard
          label="Sales"
          value="+12 234"
          trend={19}
          trendLabel="from last month"
          icon={<CreditCard className="size-4" />}
        />
        <StatCard
          label="Active Now"
          value="573"
          trend={-3}
          trendLabel="from last hour"
          icon={<Activity className="size-4" />}
        />
      </StatCardGroup>

      {/* Secondary Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Card */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the current year
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="bg-muted/50 flex h-[300px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground text-sm">
                Chart component here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales Card */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>265 sales this month</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.email} className="flex items-center gap-4">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full font-medium">
                    {sale.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {sale.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {sale.email}
                    </p>
                  </div>
                  <div className="font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const recentSales = [
  { name: "Olivia Martin", email: "olivia@example.com", amount: "+1 999 €" },
  { name: "Jackson Lee", email: "jackson@example.com", amount: "+39 €" },
  { name: "Isabella Nguyen", email: "isabella@example.com", amount: "+299 €" },
  { name: "William Kim", email: "william@example.com", amount: "+99 €" },
  { name: "Sofia Davis", email: "sofia@example.com", amount: "+39 €" },
]
