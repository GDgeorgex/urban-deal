"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Package, Plus, Pencil, Trash2, LogOut } from "lucide-react"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [saveMessage, setSaveMessage] = useState("")

  // Load products from Supabase
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
      alert("Error loading products: " + error.message)
    } else {
      setProducts(data || [])
    }
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleSave = async () => {
    if (!editingProduct?.name || !editingProduct?.brand || !editingProduct?.price) {
      alert("გთხოვთ შეავსოთ სახელი, ბრენდი და ფასი")
      return
    }

    const productData = {
      name: editingProduct.name,
      brand: editingProduct.brand,
      cat: editingProduct.cat || "სნიკერები",
      price: editingProduct.price,
      description: editingProduct.description || "",
      img: editingProduct.img || "",
      sizes: editingProduct.sizes || "",
      is_preorder: editingProduct.isPreorder || false,
      preorder_price: editingProduct.preorderPrice || "",
      regular_price: editingProduct.regularPrice || "",
      discount_pct: editingProduct.discountPct || 0,
      expected_arrival: editingProduct.expectedArrival || null,
    }

    let result
    if (editingProduct.id) {
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id)
    } else {
      result = await supabase.from('products').insert(productData)
    }

    if (result.error) {
      alert("შეცდომა: " + result.error.message)
    } else {
      setSaveMessage("✅ პროდუქტი წარმატებით შენახულია!")
      setTimeout(() => setSaveMessage(""), 2000)
      setEditingProduct(null)
      loadProducts()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("ნამდვილად გინდა წაშლა?")) {
      await supabase.from('products').delete().eq('id', id)
      loadProducts()
    }
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 p-12 rounded-3xl text-center">
          <h1 className="text-red-600 text-5xl font-black mb-8">Urban Deal</h1>
          <h2 className="text-2xl mb-8">ადმინ პანელი</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="პაროლი"
            className="w-full p-5 bg-zinc-800 rounded-2xl text-white text-center mb-6"
          />
          <button onClick={handleLogin} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold">
            შესვლა
          </button>
          {error && <p className="text-red-500 mt-4">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {saveMessage && <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50">{saveMessage}</div>}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">პროდუქტების მართვა</h1>
          <button
            onClick={() => setEditingProduct({})}
            className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" /> ახალი პროდუქტი
          </button>
        </div>

        {/* Edit Form */}
        {editingProduct !== null && (
          <div className="bg-zinc-900 p-8 rounded-3xl mb-10">
            <h2 className="text-2xl mb-6">{editingProduct.id ? "რედაქტირება" : "ახალი პროდუქტი"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="სახელი *" value={editingProduct.name || ""} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl" />
              <input placeholder="ბრენდი *" value={editingProduct.brand || ""} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl" />
              <input placeholder="ფასი *" value={editingProduct.price || ""} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl" />
              <input placeholder="სურათის URL" value={editingProduct.img || ""} onChange={e => setEditingProduct({...editingProduct, img: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl" />
              <textarea placeholder="აღწერა" value={editingProduct.description || ""} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl md:col-span-2 h-24" />
              <input placeholder="ზომები (40,41,42)" value={editingProduct.sizes || ""} onChange={e => setEditingProduct({...editingProduct, sizes: e.target.value})} className="p-4 bg-zinc-800 rounded-2xl" />
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="bg-red-600 px-8 py-3 rounded-2xl">შენახვა</button>
              <button onClick={() => setEditingProduct(null)} className="border border-zinc-700 px-8 py-3 rounded-2xl">გაუქმება</button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6">
              {p.img && <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-2xl" />}
              <div className="flex-1">
                <div className="text-xl font-bold">{p.name}</div>
                <div className="text-zinc-400">{p.brand} — {p.price}</div>
              </div>
              <button onClick={() => setEditingProduct(p)} className="text-blue-500"><Pencil className="w-6 h-6" /></button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500"><Trash2 className="w-6 h-6" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
