import { CheckCircle } from "lucide-react"

import { Badge } from "@/registry/new-york/ui/badge"

export default function BadgeWithIcon() {
  return (
    <Badge>
      <CheckCircle className="mr-1 h-3 w-3" />
      Verified
    </Badge>
  )
}
