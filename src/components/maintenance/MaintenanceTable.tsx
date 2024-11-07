import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Muzakki } from "@/lib/types"

type MaintenanceTableProps = {
  muzakkiData: Muzakki[]
  selectedMuzakki: number[]
  onSelectAll: (checked: boolean) => void
  onSelectMuzakki: (id: number) => void
}

export function MaintenanceTable({ muzakkiData, selectedMuzakki, onSelectAll, onSelectMuzakki }: MaintenanceTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">
              <Checkbox 
                checked={selectedMuzakki.length === muzakkiData.length}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nama Muzakki</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nomor HP</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Kirim Manual</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {muzakkiData.map((muzakki) => (
            <tr key={muzakki.id}>
              <td className="px-4 py-3">
                <Checkbox 
                  checked={selectedMuzakki.includes(muzakki.id)}
                  onCheckedChange={() => onSelectMuzakki(muzakki.id)}
                />
              </td>
              <td className="px-4 py-3 text-sm">{muzakki.name}</td>
              <td className="px-4 py-3 text-sm">{muzakki.phoneNumber}</td>
              <td className="px-4 py-3">
                <Badge variant="secondary" className={`${muzakki.status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'} text-white hover:bg-opacity-80`}>
                  {muzakki.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Button size="icon" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                  <p>Whatsapp</p>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}