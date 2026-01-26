import { StatCard } from "@/registry/new-york/ui/stat-card"

export default function StatCardNegativeTrend() {
  return (
    <StatCard
      label="Bounce Rate"
      value="32.5%"
      trend={-4.3}
      trendLabel="from last month"
    />
  )
}
