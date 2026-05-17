"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import {
  LayoutDashboard, Package, Flame, Home, Image, Tag, Settings, LogOut, Plus, Pencil, Trash2, ArrowLeft, Save
} from "lucide-react"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders" | "homepage" | "banners" | "promotions" | "settings">("products")
  const [products, setProducts] = useState<any[]>([])
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false })
    setProducts(data || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  // Save Product (works with current table)
  const saveProduct = async (product: any) => {
    const { error } = await supabase
      .from('products')
      .upsert({ ...product, id: product.id || undefined })

    if (error) alert("Error: " + error.message)
    else {
      showMessage("✅ შენახულია!")
      loadProducts()
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from('products').delete().eq('id', id)
    loadProducts()
    showMessage("წაიშალა")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-zinc-900 p-12 rounded-3xl w-full max-w-md text-center">
          <h1 className="text-red-600 text-5xl font-black mb-8">Urban Deal</h1>
          <h2 className="text-3xl mb-8">ადმინ პანელი</h2>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="პაროლი" className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center text-xl" />
          <button onClick={() => password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true)} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold">შესვლა</button>
          {error && <p className="text-red-500 mt-4">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {saveMessage && <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50">{saveMessage}</div>}

      {/* Sidebar */}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <div className="mb-12">
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-2xl inline-block">Urban Deal</div>
        </div>

        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab("products")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "products" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Package /> პროდუქტები
          </button>
          <button onClick={() => setActiveTab("preorders")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "preorders" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Flame /> პრი-ორდერები
          </button>
          <button onClick={() => setActiveTab("homepage")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "homepage" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Home /> მთავარი გვერდი
          </button>
          <button onClick={() => setActiveTab("banners")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "banners" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Image /> ბანერები
          </button>
          <button onClick={() => setActiveTab("promotions")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "promotions" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Tag /> პრომოქციები
          </button>
          <button onClick={() => setActiveTab("settings")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "settings" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Settings /> პარამეტრები
          </button>
        </nav>

        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-400">
          <LogOut /> გამოსვლა
        </button>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <div className="text-3xl text-center py-20">პრი-ორდერები მალე დაემატება</div>}
        {activeTab === "homepage" && <div className="text-3xl text-center py-20">მთავარი გვერდის რედაქტირება მალე დაემატება</div>}
        {activeTab === "banners" && <div className="text-3xl text-center py-20">ბანერები მალე დაემატება</div>}
        {activeTab === "promotions" && <div className="text-3xl text-center py-20">პრომოქციები მალე დაემატება</div>}
        {activeTab === "settings" && <div className="text-3xl text-center py-20">პარამეტრები მალე დაემატება</div>}
      </main>
    </div>
  )
}

function ProductsPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-black">პროდუქტები</h1>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2">
          <Plus /> ახალი პროდუქტი
        </button>
      </div>

      {editing !== null && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-10">
          {/* Simple form - we can expand later */}
          <input placeholder="სახელი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editing.name || ""} onChange={e => setEditing({...editing, name: e.target.value})} />
          <input placeholder="ბრენდი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editing.brand || ""} onChange={e => setEditing({...editing, brand: e.target.value})} />
          <input placeholder="ფასი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editing.price || ""} onChange={e => setEditing({...editing, price: e.target.value})} />
          <input placeholder="სურათის URL" className="w-full p-4 bg-zinc-800 rounded-2xl mb-6" value={editing.img || ""} onChange={e => setEditing({...editing, img: e.target.value})} />
          
          <button onClick={() => { onSave(editing); setEditing(null) }} className="bg-red-600 px-8 py-4 rounded-2xl mr-4">შენახვა</button>
          <button onClick={() => setEditing(null)} className="border px-8 py-4 rounded-2xl">გაუქმება</button>
        </div>
      )}

      <div className="grid gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6">
            <img src={p.img} className="w-24 h-24 object-cover rounded-2xl" />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-red-500">{p.brand} — {p.price}</p>
            </div>
            <button onClick={() => setEditing(p)} className="text-blue-500"><Pencil /></button>
            <button onClick={() => onDelete(p.id)} className="text-red-500"><Trash2 /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
