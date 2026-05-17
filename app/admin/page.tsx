"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Flame,
  Home,
  Image,
  Tag,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  X
} from "lucide-react"
import { supabase } from "@/lib/supabase"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const loadProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
      alert("შეცდომა: " + error.message)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2500)
  }

  const handleSaveProduct = async (form: any) => {
    setLoading(true)

    const productData = {
      name: form.name,
      brand: form.brand,
      cat: form.cat || "sneakers",
      price: form.price,
      description: form.description || "",
      img: form.img,
      sizes: form.sizes ? form.sizes.join(",") : "",
      isPreorder: form.isPreorder || false,
      preorderPrice: form.preorderPrice || null,
      regularPrice: form.regularPrice || null,
      expectedArrival: form.expectedArrival || null,
    }

    let result
    if (form.id) {
      result = await supabase.from('products').update(productData).eq('id', form.id)
    } else {
      result = await supabase.from('products').insert(productData)
    }

    if (result.error) {
      alert("შეცდომა: " + result.error.message)
    } else {
      showMessage("✅ პროდუქტი შენახულია!")
      loadProducts()
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("ნამდვილად გინდა წაშლა?")) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) alert("შეცდომა წაშლისას")
    else {
      showMessage("პროდუქტი წაიშალა")
      loadProducts()
    }
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-12 w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg">
              <span className="font-black text-lg tracking-tight">Urban Deal</span>
            </div>
          </div>
          <h2 className="font-black text-3xl mb-2">ადმინ პანელი</h2>
          <p className="text-muted-foreground mb-8">შეიყვანე პაროლი</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••••••"
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-center mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
            შესვლა
          </button>
          {error && <p className="text-red-500 mt-4">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  function handleLogin() {
    if (password === ADMIN_PASSWORD) setIsLoggedIn(true)
    else setError(true)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {saveMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg z-50 shadow-xl">
          {saveMessage}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-6 flex flex-col">
        <div className="mb-10">
          <div className="bg-red-600 text-white px-4 py-2 rounded inline-block font-black">Urban Deal</div>
        </div>
        <button onClick={() => setActiveTab("products")} className={`w-full text-left py-3 px-4 rounded-lg mb-1 flex items-center gap-3 ${activeTab === "products" ? "bg-red-600 text-white" : "hover:bg-gray-100"}`}>
          <Package className="w-5 h-5" /> პროდუქტები
        </button>
        <button onClick={handleLogout} className="mt-auto text-red-600 flex items-center gap-2">
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-black mb-8">პროდუქტები</h1>

        <button
          onClick={() => setEditingProduct({})}
          className="bg-red-600 text-white px-6 py-3 rounded-lg mb-6 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> ახალი პროდუქტი
        </button>

        {editingProduct !== undefined && (
          <ProductEditForm 
            product={editingProduct} 
            onSave={handleSaveProduct} 
            onCancel={() => setEditingProduct(undefined)} 
          />
        )}

        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="text-left p-4">სურათი</th>
                <th className="text-left p-4">სახელი</th>
                <th className="text-left p-4">ბრენდი</th>
                <th className="text-left p-4">ფასი</th>
                <th className="text-left p-4">მოქმედება</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t hover:bg-zinc-900/50">
                  <td className="p-4"><img src={p.img} className="w-12 h-12 object-cover rounded" /></td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4">{p.price}</td>
                  <td className="p-4">
                    <button onClick={() => setEditingProduct(p)} className="text-blue-500 mr-3"><Pencil /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500"><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

function ProductEditForm({ product, onSave, onCancel }: any) {
  const [form, setForm] = useState(product || {
    name: "", brand: "", price: "", img: "", description: "", sizes: []
  })

  return (
    <div className="bg-card border rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">{product?.id ? "რედაქტირება" : "ახალი პროდუქტი"}</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">სახელი</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg px-4 py-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">ბრენდი</label>
          <input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="w-full border rounded-lg px-4 py-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">ფასი</label>
          <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border rounded-lg px-4 py-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">სურათის URL</label>
          <input value={form.img} onChange={e => setForm({...form, img: e.target.value})} className="w-full border rounded-lg px-4 py-3" />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => onSave(form)} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold">შენახვა</button>
        <button onClick={onCancel} className="border px-8 py-3 rounded-lg">გაუქმება</button>
      </div>
    </div>
  )
}
