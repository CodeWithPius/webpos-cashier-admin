import { NavLink } from "react-router-dom"
import vegetableImage from "../../assets/vegetables-bg.jpeg"

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Receipt,
  BarChart3,
  Users,
  Settings,
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Cashier", path: "/cashier", icon: ShoppingCart },
  { name: "Products", path: "/products", icon: Package },
  { name: "Inventory", path: "/inventory", icon: Boxes },
  { name: "Transactions", path: "/transactions", icon: Receipt },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Users", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
]

export default function Sidebar() {
  return (
    <aside
      className="w-64 min-h-screen border-r border-gray-200 p-5 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 70, 35, 0.90), rgba(0, 70, 35, 0.90)), url(${vegetableImage})`,
      }}
    >

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          WebPOS
        </h1>

        <p className="text-xs text-green-100">
          Cashier & Admin Portal
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

    </aside>
  )
}