import { FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyIcon() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileIcon className="text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Upload files to get started. Supported formats: PDF, PNG, JPG.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Browse files</Button>
        <Button>Upload</Button>
      </EmptyContent>
    </Empty>
  )
}
