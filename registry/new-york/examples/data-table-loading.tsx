"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import { DataTable } from "@/registry/new-york/ui/data-table"

type User = {
  id: string
  name: string
  email: string
  role: string
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
]

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
]

export default function DataTableLoading() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState<User[]>([])

  const loadData = () => {
    setIsLoading(true)
    setData([])
    // Simulate API call
    setTimeout(() => {
      setData(users)
      setIsLoading(false)
    }, 2000)
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-4">
      <Button onClick={loadData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Reload Data"}
      </Button>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        showPagination={false}
        defaultPageSize={3}
        emptyState={
          <div className="text-muted-foreground">
            No users found. Click reload to fetch data.
          </div>
        }
      />
    </div>
  )
}
