import { CreditCard, DollarSign, ShoppingCart, Users } from "lucide-react"

import { StatCard, StatCardGroup } from "@/registry/new-york/ui/stat-card"

export default function StatCardWithIcon() {
  return (
    <StatCardGroup columns={2}>
      <StatCard
        label="Total Revenue"
        value="$45,231.89"
        trend={20.1}
        icon={<DollarSign className="size-4" />}
      />
      <StatCard
        label="Subscriptions"
        value="+2,350"
        trend={180.1}
        icon={<Users className="size-4" />}
      />
      <StatCard
        label="Sales"
        value="+12,234"
        trend={19}
        icon={<CreditCard className="size-4" />}
      />
      <StatCard
        label="Active Now"
        value="+573"
        trend={-2}
        icon={<ShoppingCart className="size-4" />}
      />
    </StatCardGroup>
  )
}
