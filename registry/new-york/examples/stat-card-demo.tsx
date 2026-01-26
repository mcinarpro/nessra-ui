import { DollarSign } from "lucide-react"

import { StatCard } from "@/registry/new-york/ui/stat-card"

export default function StatCardDemo() {
  return (
    <StatCard
      label="Total Revenue"
      value="$45,231.89"
      trend={20.1}
      trendLabel="from last month"
      icon={<DollarSign className="size-4" />}
    />
  )
}
