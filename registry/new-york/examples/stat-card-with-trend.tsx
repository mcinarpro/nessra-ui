import { StatCard } from "@/registry/new-york/ui/stat-card"

export default function StatCardWithTrend() {
  return (
    <StatCard
      label="Active Users"
      value="1,234"
      trend={12.5}
      trendLabel="vs last week"
    />
  )
}
