import { Bell, Search, UserCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome to WebPOS Management
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-40"
          />
        </div>

        <Bell size={21} className="text-gray-600" />

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-green-700" />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Administrator
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}