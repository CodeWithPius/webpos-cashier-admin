import {
  Wallet,
  ShoppingBag,
  Package,
  Users,
} from "lucide-react"

const statistics = [
  {
    title: "Today's Sales",
    value: "₦0.00",
    icon: Wallet,
  },
  {
    title: "Transactions",
    value: "0",
    icon: ShoppingBag,
  },
  {
    title: "Total Products",
    value: "0",
    icon: Package,
  },
  {
    title: "Customers",
    value: "0",
    icon: Users,
  },
]

export default function Dashboard() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Here's what's happening in your supermarket today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-bold mt-2 text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div className="bg-yellow-50 p-3 rounded-xl">
                  <Icon className="text-green-700" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>

        <p className="text-sm text-gray-500 mt-3">
          No transactions available yet.
        </p>
      </div>
    </main>
  )
}