import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function InputGroupButtonDemo() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <SearchIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
