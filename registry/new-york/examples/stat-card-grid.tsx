import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import { StatCard, StatCardGroup } from "@/registry/new-york/ui/stat-card"

export default function StatCardGrid() {
  return (
    <StatCardGroup columns={4}>
      <StatCard
        label="Total Revenue"
        value="$45,231"
        trend={20.1}
        trendLabel="from last month"
        icon={<DollarSign className="size-4" />}
      />
      <StatCard
        label="Subscriptions"
        value="+2,350"
        trend={180.1}
        trendLabel="from last month"
        icon={<Users className="size-4" />}
      />
      <StatCard
        label="Sales"
        value="+12,234"
        trend={19}
        trendLabel="from last month"
        icon={<CreditCard className="size-4" />}
      />
      <StatCard
        label="Active Now"
        value="+573"
        trend={201}
        trendLabel="since last hour"
        icon={<Activity className="size-4" />}
      />
    </StatCardGroup>
  )
}
