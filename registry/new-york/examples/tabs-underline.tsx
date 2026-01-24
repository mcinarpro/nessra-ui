import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList variant="underline">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-muted-foreground text-sm">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-muted-foreground text-sm">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-muted-foreground text-sm">
          Adjust your settings here.
        </p>
      </TabsContent>
    </Tabs>
  )
}
