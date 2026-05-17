"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2 } from "lucide-react"

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
    if (error) alert("Loading error: " + error.message)
    else setProducts(data || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setIsLoggedIn(true)
    else setError(true)
  }

  const handleSave = async () => {
    if (!editingProduct?.name || !editingProduct?.brand || !editingProduct?.price) {
      alert("Please fill name, brand and price")
      return
    }

    const productData = {
      name: editingProduct.name,
      brand: editingProduct.brand,
      cat: "სნიკერები",
      price: editingProduct.price,
      description: editingProduct.description || "",
      img: editingProduct.img || "",
      sizes: editingProduct.sizes || "",
      is_preorder: false,
    }

    let result
    if (editingProduct.id) {
      result = await supabase.from('products').update(productData).eq('id', editingProduct.id)
    } else {
      result = await supabase.from('products').insert(productData)
    }

    if (result.error) {
      alert("Save error: " + result.error.message)
    } else {
      setSaveMessage("✅ Saved successfully!")
      setTimeout(() => setSaveMessage(""), 2000)
      setEditingProduct(null)
      loadProducts()
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-zinc-900 p-12 rounded-3xl text-center w-full max-w-md">
          <h1 className="text-red-600 text-4xl font-black mb-6">Urban Deal</h1>
          <h2 className="text-2xl mb-8">ადმინ პანელი</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="პაროლი"
            className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full bg-red-600 py-4 rounded-2xl text-xl font-bold">
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
        <div className="flex justify-between mb-10">
          <h1 className="text-4xl font-black">პროდუქტები</h1>
          <button onClick={() => setEditingProduct({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2">
            <Plus className="w-5 h-5" /> ახალი პროდუქტი
          </button>
        </div>

        {editingProduct !== null && (
          <div className="bg-zinc-900 p-8 rounded-3xl mb-10">
            <h2 className="text-2xl mb-6">ახალი პროდუქტი</h2>
            <input placeholder="სახელი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.name || ""} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
            <input placeholder="ბრენდი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.brand || ""} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} />
            <input placeholder="ფასი" className="w-full p-4 bg-zinc-800 rounded-2xl mb-4" value={editingProduct.price || ""} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} />
            <input placeholder="სურათის URL" className="w-full p-4 bg-zinc-800 rounded-2xl mb-6" value={editingProduct.img || ""} onChange={e => setEditingProduct({...editingProduct, img: e.target.value})} />

            <div className="flex gap-4">
              <button onClick={handleSave} className="bg-red-600 px-8 py-3 rounded-2xl">შენახვა</button>
              <button onClick={() => setEditingProduct(null)} className="border border-zinc-700 px-8 py-3 rounded-2xl">გაუქმება</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="bg-zinc-900 p-6 rounded-3xl flex gap-6 items-center">
              {p.img && <img src={p.img} className="w-20 h-20 object-cover rounded-xl" />}
              <div className="flex-1">
                <div className="font-bold text-lg">{p.name}</div>
                <div className="text-zinc-400">{p.brand} — {p.price}</div>
              </div>
              <button onClick={() => setEditingProduct(p)}><Pencil className="w-5 h-5" /></button>
              <button onClick={() => supabase.from('products').delete().eq('id', p.id).then(loadProducts)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
