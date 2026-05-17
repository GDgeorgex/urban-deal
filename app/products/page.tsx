"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ShoppingCart } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('isPreorder', false)   // Only regular products
        .order('id', { ascending: false })
      
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const categories = ["all", ...new Set(products.map(p => p.cat).filter(Boolean))]

  const filtered = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCat === "all" || p.cat === selectedCat
    return matchesSearch && matchesCat
  })

  const contactWhatsApp = (product: any) => {
    const message = `გამარჯობა! მაინტერესებს პროდუქტი: ${product.name} (${product.brand}) - ${product.price}`
    window.open(`https://wa.me/995592013611?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება...</div>

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-red-500">ახალი პროდუქცია</h1>
          <p className="text-zinc-400 text-xl mt-3">მარაგში არსებული პროდუქტები</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <input
            type="text"
            placeholder="ძებნა..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl w-full max-w-md"
          />
          <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl">
            {categories.map(c => <option key={c} value={c}>{c === "all" ? "ყველა" : c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <div className="h-80 relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <p className="text-red-500">{p.brand}</p>
                <h3 className="font-bold text-xl mt-1 mb-4">{p.name}</h3>
                <p className="text-3xl font-black mb-6">{p.price}</p>
                
                <button 
                  onClick={() => contactWhatsApp(p)}
                  className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                >
                  დაწერე WhatsApp-ზე
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
