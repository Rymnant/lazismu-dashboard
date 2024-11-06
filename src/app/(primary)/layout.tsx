import Sidebar from "@/components/layout/Sidebar"

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    )
}