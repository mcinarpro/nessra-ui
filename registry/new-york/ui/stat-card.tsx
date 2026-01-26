import * as React from "react"
import { cva } from "class-variance-authority"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

const trendVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
  {
    variants: {
      direction: {
        up: "bg-trend-up/10 text-trend-up",
        down: "bg-trend-down/10 text-trend-down",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      direction: "neutral",
    },
  }
)

interface StatCardProps extends React.ComponentProps<"div"> {
  /** The main metric value to display */
  value: string | number
  /** Label describing the metric */
  label: string
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Trend percentage (positive = up, negative = down) */
  trend?: number
  /** Text to display after trend percentage */
  trendLabel?: string
  /** Additional description text */
  description?: string
}

function StatCard({
  className,
  value,
  label,
  icon,
  trend,
  trendLabel = "vs last period",
  description,
  ...props
}: StatCardProps) {
  const trendDirection =
    trend === undefined || trend === 0 ? "neutral" : trend > 0 ? "up" : "down"

  return (
    <div
      data-slot="stat-card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-3 rounded-xl border p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span
          data-slot="stat-card-label"
          className="text-muted-foreground text-sm font-medium"
        >
          {label}
        </span>
        {icon && (
          <span data-slot="stat-card-icon" className="text-muted-foreground">
            {icon}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span
          data-slot="stat-card-value"
          className="text-3xl font-bold tracking-tight"
        >
          {value}
        </span>

        {trend !== undefined && (
          <div className="flex items-center gap-2">
            <span
              data-slot="stat-card-trend"
              className={cn(trendVariants({ direction: trendDirection }))}
            >
              {trendDirection === "up" && <TrendingUp className="size-3" />}
              {trendDirection === "down" && <TrendingDown className="size-3" />}
              {trend > 0 && "+"}
              {trend}%
            </span>
            <span
              data-slot="stat-card-trend-label"
              className="text-muted-foreground text-xs"
            >
              {trendLabel}
            </span>
          </div>
        )}

        {description && (
          <span
            data-slot="stat-card-description"
            className="text-muted-foreground text-sm"
          >
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

interface StatCardGroupProps extends React.ComponentProps<"div"> {
  /** Number of columns on different breakpoints */
  columns?: 1 | 2 | 3 | 4
}

function StatCardGroup({
  className,
  columns = 4,
  ...props
}: StatCardGroupProps) {
  return (
    <div
      data-slot="stat-card-group"
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    />
  )
}

export { StatCard, StatCardGroup, trendVariants }
export type { StatCardProps, StatCardGroupProps }
