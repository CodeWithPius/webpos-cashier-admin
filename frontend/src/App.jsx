import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"

import Dashboard from "./pages/dashboard/Dashboard"
import Cashier from "./pages/cashier/Cashier"
import Products from "./pages/products/Products"
import Inventory from "./pages/inventory/Inventory"
import Transactions from "./pages/transactions/Transactions"
import Reports from "./pages/reports/Reports"
import Users from "./pages/users/Users"
import Settings from "./pages/settings/Settings"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1">
          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}