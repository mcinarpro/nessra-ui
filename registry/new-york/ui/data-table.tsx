"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table as TableInstance,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PlusCircleIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react"

import { cn } from "@/registry/new-york/lib/utils"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/new-york/ui/command"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { Input } from "@/registry/new-york/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Separator } from "@/registry/new-york/ui/separator"
import { Skeleton } from "@/registry/new-york/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FacetedFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FacetedFilterConfig {
  column: string
  title: string
  options: FacetedFilterOption[]
}

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

interface DataTableViewOptionsProps<TData> {
  table: TableInstance<TData>
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: FacetedFilterOption[]
}

interface DataTableToolbarProps<TData> {
  table: TableInstance<TData>
  filterColumn?: string
  filterPlaceholder?: string
  facetedFilters?: FacetedFilterConfig[]
  showViewOptions?: boolean
  children?: React.ReactNode
}

interface DataTablePaginationProps<TData> {
  table: TableInstance<TData>
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
  showSelectedCount?: boolean
  showPageNumbers?: boolean
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Loading state
  isLoading?: boolean
  // Empty state
  emptyState?: React.ReactNode
  // Filter
  filterColumn?: string
  filterPlaceholder?: string
  // Faceted filters
  facetedFilters?: FacetedFilterConfig[]
  // Pagination
  showPagination?: boolean
  showPageSizeSelector?: boolean
  showPageNumbers?: boolean
  pageSizeOptions?: number[]
  defaultPageSize?: number
  // Sorting
  defaultSorting?: SortingState
  // Column toggle
  showColumnToggle?: boolean
  // Row selection
  enableRowSelection?: boolean
  getRowId?: (row: TData) => string
  onRowSelectionChange?: (selection: RowSelectionState) => void
  // Row click
  onRowClick?: (row: TData) => void
  // Controlled state (for URL sync)
  pagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
  // Toolbar customization
  toolbarChildren?: React.ReactNode
}

// ============================================================================
// DataTableColumnHeader
// ============================================================================

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="text-muted-foreground/70 mr-2 size-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="text-muted-foreground/70 mr-2 size-3.5" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOffIcon className="text-muted-foreground/70 mr-2 size-3.5" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ============================================================================
// DataTableViewOptions
// ============================================================================

function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2Icon className="mr-2 size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-37.5">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ============================================================================
// DataTableFacetedFilter
// ============================================================================

function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 size-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-lg border",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="size-3.5" />
                    </div>
                    {option.icon && (
                      <option.icon className="text-muted-foreground mr-2 size-4" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// ============================================================================
// DataTableToolbar
// ============================================================================

function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
  facetedFilters = [],
  showViewOptions = true,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div
      data-slot="data-table-toolbar"
      className="flex items-center justify-between"
    >
      <div className="flex flex-1 items-center gap-2">
        {filterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-37.5 lg:w-62.5"
          />
        )}
        {facetedFilters.map((filter) => {
          const column = table.getColumn(filter.column)
          if (!column) return null
          return (
            <DataTableFacetedFilter
              key={filter.column}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  )
}

// ============================================================================
// DataTablePagination
// ============================================================================

function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showPageSizeSelector = true,
  showSelectedCount = true,
  showPageNumbers = false,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  // Generate page numbers with ellipsis (memoized for performance)
  const pageNumbers = React.useMemo(() => {
    const pages: (number | "ellipsis")[] = []
    const maxVisiblePages = 5

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      if (currentPage > 2) {
        pages.push("ellipsis")
      }

      // Show pages around current
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(pageCount - 2, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (currentPage < pageCount - 3) {
        pages.push("ellipsis")
      }

      // Always show last page
      if (!pages.includes(pageCount - 1)) {
        pages.push(pageCount - 1)
      }
    }

    return pages
  }, [pageCount, currentPage])

  return (
    <div
      data-slot="data-table-pagination"
      className="flex items-center justify-between px-2"
    >
      <div className="flex items-center gap-4">
        {showSelectedCount && (
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}
        {showPageSizeSelector && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-17.5">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {showPageNumbers ? (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="size-4" />
            </Button>

            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="text-muted-foreground px-2"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => table.setPageIndex(page)}
                  aria-label={`Go to page ${page + 1}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page + 1}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex w-25 items-center justify-center text-sm font-medium">
              Page {currentPage + 1} of {pageCount}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon className="size-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// DataTable (Main Component)
// ============================================================================

function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  emptyState,
  filterColumn,
  filterPlaceholder = "Filter...",
  facetedFilters = [],
  showPagination = true,
  showPageSizeSelector = true,
  showPageNumbers = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
  defaultPageSize = 10,
  defaultSorting = [],
  showColumnToggle = false,
  enableRowSelection = false,
  getRowId,
  onRowSelectionChange,
  onRowClick,
  // Controlled state
  pagination: controlledPagination,
  onPaginationChange,
  sorting: controlledSorting,
  onSortingChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  // Toolbar customization
  toolbarChildren,
}: DataTableProps<TData, TValue>) {
  // Internal state (used when not controlled)
  const [internalSorting, setInternalSorting] =
    React.useState<SortingState>(defaultSorting)
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  // Use controlled or internal state
  const sorting = controlledSorting ?? internalSorting
  const columnFilters = controlledColumnFilters ?? internalColumnFilters

  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const newValue =
        typeof updater === "function" ? updater(sorting) : updater
      if (onSortingChange) {
        onSortingChange(newValue)
      } else {
        setInternalSorting(newValue)
      }
    },
    [sorting, onSortingChange]
  )

  const handleColumnFiltersChange = React.useCallback(
    (
      updater:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => {
      const newValue =
        typeof updater === "function" ? updater(columnFilters) : updater
      if (onColumnFiltersChange) {
        onColumnFiltersChange(newValue)
      } else {
        setInternalColumnFilters(newValue)
      }
    },
    [columnFilters, onColumnFiltersChange]
  )

  const handleRowSelectionChange = React.useCallback(
    (
      updater:
        | RowSelectionState
        | ((old: RowSelectionState) => RowSelectionState)
    ) => {
      const newValue =
        typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(newValue)
      onRowSelectionChange?.(newValue)
    },
    [rowSelection, onRowSelectionChange]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(controlledPagination && { pagination: controlledPagination }),
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
    enableRowSelection,
    getRowId,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    ...(onPaginationChange &&
      controlledPagination && {
        onPaginationChange: (updater) => {
          const newValue =
            typeof updater === "function"
              ? updater(controlledPagination)
              : updater
          onPaginationChange(newValue)
        },
      }),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const showToolbar =
    filterColumn ||
    facetedFilters.length > 0 ||
    showColumnToggle ||
    toolbarChildren

  return (
    <div data-slot="data-table" className="w-full space-y-4">
      {showToolbar && (
        <DataTableToolbar
          table={table}
          filterColumn={filterColumn}
          filterPlaceholder={filterPlaceholder}
          facetedFilters={facetedFilters}
          showViewOptions={showColumnToggle}
        >
          {toolbarChildren}
        </DataTableToolbar>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: defaultPageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={onRowClick ? "cursor-pointer" : undefined}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyState ?? "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <DataTablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          showPageSizeSelector={showPageSizeSelector}
          showSelectedCount={enableRowSelection}
          showPageNumbers={showPageNumbers}
        />
      )}
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  type DataTableColumnHeaderProps,
  type DataTableFacetedFilterProps,
  type DataTablePaginationProps,
  type DataTableProps,
  type DataTableToolbarProps,
  type DataTableViewOptionsProps,
  type FacetedFilterConfig,
  type FacetedFilterOption,
}
