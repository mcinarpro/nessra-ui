"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import {
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  MoreHorizontalIcon,
  TimerIcon,
  XCircleIcon,
} from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
  FacetedFilterConfig,
} from "@/registry/new-york/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

type Task = {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  label: "bug" | "feature" | "documentation"
}

const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "Implement authentication flow",
    status: "in-progress",
    priority: "high",
    label: "feature",
  },
  {
    id: "TASK-7878",
    title: "Fix login page validation",
    status: "done",
    priority: "medium",
    label: "bug",
  },
  {
    id: "TASK-7839",
    title: "Add API documentation",
    status: "todo",
    priority: "low",
    label: "documentation",
  },
  {
    id: "TASK-5562",
    title: "Refactor database queries",
    status: "backlog",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-8686",
    title: "Update user profile page",
    status: "canceled",
    priority: "low",
    label: "feature",
  },
  {
    id: "TASK-1280",
    title: "Fix dashboard chart rendering",
    status: "done",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-7262",
    title: "Add export to CSV feature",
    status: "todo",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-1138",
    title: "Write unit tests for auth module",
    status: "in-progress",
    priority: "high",
    label: "documentation",
  },
  {
    id: "TASK-4932",
    title: "Optimize image loading",
    status: "backlog",
    priority: "low",
    label: "feature",
  },
  {
    id: "TASK-9421",
    title: "Fix mobile responsive issues",
    status: "todo",
    priority: "high",
    label: "bug",
  },
  {
    id: "TASK-2341",
    title: "Add dark mode support",
    status: "done",
    priority: "medium",
    label: "feature",
  },
  {
    id: "TASK-5673",
    title: "Update API error handling",
    status: "in-progress",
    priority: "medium",
    label: "bug",
  },
]

const statusIcons = {
  backlog: HelpCircleIcon,
  todo: CircleIcon,
  "in-progress": TimerIcon,
  done: CheckCircle2Icon,
  canceled: XCircleIcon,
}

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => (
      <div className="w-20 font-medium">{row.getValue("id")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-125 truncate font-medium">
          {row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"]
      const Icon = statusIcons[status]
      return (
        <div className="flex w-25 items-center">
          <Icon className="text-muted-foreground mr-2 size-4" />
          <span className="capitalize">{status.replace("-", " ")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("priority")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const facetedFilters: FacetedFilterConfig[] = [
  {
    column: "status",
    title: "Status",
    options: [
      { label: "Backlog", value: "backlog", icon: HelpCircleIcon },
      { label: "Todo", value: "todo", icon: CircleIcon },
      { label: "In Progress", value: "in-progress", icon: TimerIcon },
      { label: "Done", value: "done", icon: CheckCircle2Icon },
      { label: "Canceled", value: "canceled", icon: XCircleIcon },
    ],
  },
  {
    column: "priority",
    title: "Priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
]

export default function DataTableAdvanced() {
  return (
    <DataTable
      columns={columns}
      data={tasks}
      filterColumn="title"
      filterPlaceholder="Filter tasks..."
      facetedFilters={facetedFilters}
      showColumnToggle
      showPagination
      showPageNumbers
      enableRowSelection
      defaultPageSize={10}
      getRowId={(row) => row.id}
      onRowClick={(row) => console.log("Clicked:", row.id)}
    />
  )
}
