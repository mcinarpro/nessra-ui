import { InboxIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <InboxIcon className="text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any messages yet. Start a conversation to see them
          here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Compose message</Button>
      </EmptyContent>
    </Empty>
  )
}
