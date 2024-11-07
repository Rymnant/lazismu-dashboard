import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MaintenanceTabsProps = {
  donorTypes: string[]
  selectedTab: string
  onTabChange: (value: string) => void
}

export function MaintenanceTabs({ donorTypes, selectedTab, onTabChange }: MaintenanceTabsProps) {
  return (
    <Tabs value={selectedTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-0">
        {donorTypes.map((type) => (
          <TabsTrigger 
            key={type}
            value={type.toLowerCase().replace(' ', '-')}
            className="rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-8 py-2"
          >
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}