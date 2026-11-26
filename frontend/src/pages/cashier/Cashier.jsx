import { useEffect, useRef, useState } from "react"

import {
  Search,
  ScanBarcode,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
} from "lucide-react"

export default function Cashier() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [barcode, setBarcode] = useState("")
  const barcodeInputRef = useRef(null)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amountTendered, setAmountTendered] = useState("")
  const handlePageClick = (e) => {
  if (
    e.target.tagName !== "INPUT" &&
    e.target.tagName !== "BUTTON"
  ) {
    barcodeInputRef.current?.focus()
  }
}

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Search products by name or barcode
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase()

    return (
      product.product_name.toLowerCase().includes(searchText) ||
      product.barcode.includes(search)
    )
  })

  // Add product to cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  // Add product using barcode
      const addByBarcode = () => {
        const scannedBarcode = barcode.trim()

        if (!scannedBarcode) return

        const foundProduct = products.find(
          (product) => String(product.barcode) === scannedBarcode
        )

        if (foundProduct) {
          addToCart(foundProduct)
          setBarcode("")
          setError("")
          barcodeInputRef.current?.focus()
        } else {
          setError("Product barcode not found.")
          setBarcode("")
          barcodeInputRef.current?.focus()
        }
      }

  // Change product quantity
  const changeQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    )
  }

  // Confirm payment
  const handleConfirmPayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          paymentMethod,
          amount: total,
          amountTendered:
            paymentMethod === "cash"
              ? Number(amountTendered)
              : total,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Payment failed")
      }

      alert(result.message)
    } catch (err) {
      console.error("Payment error:", err)
      alert("Unable to process payment.")
    }
  }

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.selling_price) * item.quantity,
    0
  )

  const discount = 0
      const total = subtotal - discount
      const changeDue = Math.max(
      0,
      Number(amountTendered || 0) - total
    )

    const paymentComplete =
      paymentMethod === "cash"
        ? Number(amountTendered) >= total && total > 0
        : total > 0

  return (
    <>
      <main
          className="p-6 bg-gray-50 min-h-screen"
          onClick={handlePageClick}
      >

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          Cashier Terminal
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Scan products and manage customer checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Product Section */}
        <section className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">

          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Add Products
          </h2>

          {/* Barcode Input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">

            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 flex-1">
              <button
                type="button"
                onClick={() => barcodeInputRef.current?.focus()}
                className="text-green-700 cursor-pointer"
                title="Activate barcode input">
                <ScanBarcode size={22} />
              </button>

              <input
                type="text"
                ref={barcodeInputRef}
                autoFocus
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addByBarcode()
                  }
                }}
                placeholder="Scan or enter product barcode..."
                className="outline-none w-full text-sm"
              />
            </div>

            <button
              onClick={addByBarcode}
              className="bg-green-700 text-white px-5 py-3 rounded-xl font-medium"
            >
              Add Product
            </button>

          </div>

          {/* Product Search */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3 mb-6">

            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name or barcode..."
              className="bg-transparent outline-none w-full text-sm"
            />

          </div>

          {/* Product Results */}
          <div className="space-y-3">

            {loading && (
              <p className="text-sm text-gray-500">
                Loading products...
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
                <ShoppingCart
                  size={35}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="text-sm text-gray-500">
                  No matching products found.
                </p>
              </div>
            )}

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 border border-gray-200 rounded-xl p-4"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {product.product_name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Barcode: {product.barcode}
                  </p>

                  <p className="text-sm text-green-700 font-semibold mt-2">
                    £{Number(product.selling_price).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
            ))}

          </div>

        </section>

        {/* Shopping Cart */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-lg font-semibold text-gray-800">
              Current Sale
            </h2>

            <ShoppingCart className="text-green-700" size={23} />

          </div>

          {/* Cart Items */}
          <div className="space-y-4">

            {cart.length === 0 && (
              <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
                <ShoppingCart
                  size={35}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="text-sm text-gray-500">
                  Your cart is empty.
                </p>
              </div>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 pb-4"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.product_name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      £{Number(item.selling_price).toFixed(2)} each
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                    title="Remove product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="border rounded-lg p-1"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="border rounded-lg p-1"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    £{(
                      Number(item.selling_price) * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="mt-6 space-y-4">

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Discount</span>
              <span>£{discount.toFixed(2)}</span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-700">
                £{total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Checkout */}
          <button
            onClick={() => setPaymentOpen(true)}
            disabled={cart.length === 0}
            className="w-full mt-6 bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <CreditCard size={19} />
            Proceed to Payment
          </button>

        </section>

      </div>

      </main>

    {paymentOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4">Payment</h2>

          <p className="text-gray-600 mb-4">
            Total Amount: £{total.toFixed(2)}
          </p>

          <button
            onClick={() => setPaymentMethod("cash")}
            className={`w-full p-3 rounded-lg mb-2 ${
              paymentMethod === "cash"
                ? "bg-green-700 text-white"
                : "bg-gray-100"
            }`}
          >
            Cash
          </button>

          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full p-3 rounded-lg mb-4 ${
              paymentMethod === "card"
                ? "bg-green-700 text-white"
                : "bg-gray-100"
            }`}
          >
            Card
          </button>

          {paymentMethod === "cash" && (
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Amount Tendered
              </label>

              <input
                type="number"
                value={amountTendered}
                onChange={(e) => setAmountTendered(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter amount received"
              />

              <p className="mt-3 font-semibold">
                Change: £{changeDue.toFixed(2)}
              </p>
            </div>
          )}

          <button
            onClick={handleConfirmPayment}
            disabled={!paymentComplete}
            className="w-full bg-green-700 disabled:bg-gray-300 text-white p-3 rounded-lg mb-2"
          >
            Confirm Payment
          </button>

          <button
            onClick={() => setPaymentOpen(false)}
            className="w-full bg-gray-200 p-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
  )
}