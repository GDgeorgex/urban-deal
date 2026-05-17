"use client"
import { useState, useEffect } from "react"
import { Package, Plus, Pencil, Trash2, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [saveMessage, setSaveMessage] = useState("")

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
    
    if (error) alert("Error loading: " + error.message)
    else setProducts(data || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
    } else {
      setError(true)
    }
  }

  const handleSave = async (form: any) => {
    const productData = {
      name: form.name,
      brand: form.brand,
      cat: "sneakers",
      price: form.price,
      description: form.description || "",
      img: form.img,
      sizes: form.sizes || "",
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
      setSaveMessage("✅ პროდუქტი შენახულია!")
      setTimeout(() => setSaveMessage(""), 2000)
      setEditingProduct(null)
      loadProducts()
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("წაშლა?")) {
      await supabase.from('products').delete().eq('id', id)
      loadProducts()
    }
  }

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

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">პროდუქტები</h1>
          <button 
            onClick={() => setEditingProduct({})}
            className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" /> ახალი პროდუქტი
          </button>
        </div>

        {editingProduct !== null && (
          <div className="bg-zinc-900 p-8 rounded-3xl mb-10">
            <h2 className="text-2xl mb-6">ახალი პროდუქტი</h2>
            <input placeholder="სახელი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.name || ""} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
            <input placeholder="ბრენდი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.brand || ""} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} />
            <input placeholder="ფასი (მაგ: ₾ 650)" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.price || ""} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} />
            <input placeholder="სურათის URL" className="w-full p-4 bg-zinc-800 rounded-2xl mb-6" value={editingProduct.img || ""} onChange={e => setEditingProduct({...editingProduct, img: e.target.value})} />
            
            <button onClick={() => handleSave(editingProduct)} className="bg-red-600 px-8 py-3 rounded-2xl mr-4">შენახვა</button>
            <button onClick={() => setEditingProduct(null)} className="border border-zinc-700 px-8 py-3 rounded-2xl">გაუქმება</button>
          </div>
        )}

        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6">
              <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-2xl" />
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
