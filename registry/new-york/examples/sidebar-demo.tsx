"use client"

import {
  CalendarIcon,
  ChevronDownIcon,
  HomeIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const mainNav = [
  { title: "Home", url: "#", icon: HomeIcon },
  { title: "Dashboard", url: "#", icon: LayoutDashboardIcon },
  { title: "Inbox", url: "#", icon: InboxIcon, badge: "12" },
  { title: "Calendar", url: "#", icon: CalendarIcon },
]

const settingsNav = [
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
    ],
  },
  { title: "Users", url: "#", icon: UsersIcon },
]

export default function SidebarDemo() {
  return (
    <div className="relative h-[600px] overflow-hidden rounded-lg border [&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full">
      <SidebarProvider
        className="h-full !min-h-0"
        style={
          {
            "--sidebar-width": "14rem",
          } as React.CSSProperties
        }
      >
        <Sidebar collapsible="offcanvas" className="overflow-hidden border-r">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded">
                    A
                  </div>
                  <span className="font-semibold">Acme Inc</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.title === "Home"}
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsNav.map((item) =>
                    item.items ? (
                      <Collapsible
                        key={item.title}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>{subItem.title}</a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SearchIcon />
                  <span>Search</span>
                  <kbd className="bg-muted text-muted-foreground ml-auto rounded px-1.5 py-0.5 text-[10px]">
                    ⌘K
                  </kbd>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Welcome back</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            This is your dashboard. Click the trigger or the rail to toggle.
          </p>
        </main>
      </SidebarProvider>
    </div>
  )
}
