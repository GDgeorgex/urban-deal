"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const loadProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
      alert("შეცდომა პროდუქტების ჩატვირთვისას: " + error.message)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadProducts()
    }
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword("")
    setEditingProduct(null)
  }

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  const handleSaveProduct = async (form: any) => {
    const productData = {
      name: form.name,
      brand: form.brand,
      cat: form.cat || "sneakers",
      price: form.price,
      description: form.description || "",
      img: form.img,
      sizes: form.sizes ? form.sizes.join(",") : "",
      isPreorder: false,
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
      setEditingProduct(null)
      loadProducts()
    }
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-12 w-full max-w-md text-center">
          <div className="bg-red-600 text-white px-6 py-3 rounded-xl inline-block mb-8 font-black text-xl">
            Urban Deal
          </div>
          <h2 className="text-3xl font-black mb-2 text-white">ადმინ პანელი</h2>
          <p className="text-zinc-400 mb-8">შეიყვანე პაროლი</p>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="პაროლი"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-6 py-4 text-center text-white text-lg mb-6"
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold text-lg"
          >
            შესვლა
          </button>
          {error && <p className="text-red-500 mt-4">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {saveMessage && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-8 py-4 rounded-2xl z-50 shadow-2xl">
          {saveMessage}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-zinc-900 border-r border-zinc-800 min-h-screen p-6">
          <div className="mb-12">
            <div className="bg-red-600 text-white px-5 py-3 rounded-2xl font-black text-2xl inline-block">Urban Deal</div>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 bg-red-600/10 text-red-500 px-5 py-4 rounded-2xl font-medium">
              <Package className="w-6 h-6" /> პროდუქტები
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="absolute bottom-8 left-6 flex items-center gap-3 text-zinc-400 hover:text-white"
          >
            <LogOut className="w-5 h-5" /> გამოსვლა
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-black">პროდუქტები</h1>
            <button
              onClick={() => setEditingProduct({})}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl flex items-center gap-3 font-medium"
            >
              <Plus className="w-5 h-5" /> ახალი პროდუქტი
            </button>
          </div>

          {editingProduct !== null && (
            <ProductEditForm 
              product={editingProduct} 
              onSave={handleSaveProduct} 
              onCancel={() => setEditingProduct(null)} 
            />
          )}

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-6">სურათი</th>
                  <th className="text-left p-6">სახელი</th>
                  <th className="text-left p-6">ბრენდი</th>
                  <th className="text-left p-6">ფასი</th>
                  <th className="text-left p-6">მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                    <td className="p-6">
                      <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl" />
                    </td>
                    <td className="p-6 font-medium">{p.name}</td>
                    <td className="p-6 text-zinc-400">{p.brand}</td>
                    <td className="p-6 font-semibold">{p.price}</td>
                    <td className="p-6">
                      <button onClick={() => setEditingProduct(p)} className="text-blue-500 mr-4">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

function ProductEditForm({ product, onSave, onCancel }: any) {
  const [form, setForm] = useState(product || { name: "", brand: "", price: "", img: "" })

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 mb-10">
      <h2 className="text-2xl font-bold mb-8">{product?.id ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm text-zinc-400">სახელი</label>
          <input 
            value={form.name || ""} 
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">ბრენდი</label>
          <input 
            value={form.brand || ""} 
            onChange={(e) => setForm({...form, brand: e.target.value})}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">ფასი</label>
          <input 
            value={form.price || ""} 
            onChange={(e) => setForm({...form, price: e.target.value})}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-zinc-400">სურათის URL</label>
          <input 
            value={form.img || ""} 
            onChange={(e) => setForm({...form, img: e.target.value})}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button 
          onClick={() => onSave(form)}
          className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl font-semibold"
        >
          შენახვა
        </button>
        <button 
          onClick={onCancel}
          className="border border-zinc-700 hover:bg-zinc-800 px-10 py-4 rounded-2xl"
        >
          გაუქმება
        </button>
      </div>
    </div>
  )
}
