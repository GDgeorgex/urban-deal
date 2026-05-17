"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageCircle } from "lucide-react"

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
        .eq('isPreorder', false)
        .order('id', { ascending: false })
      
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCat === "all" || p.cat === selectedCat
    return matchesSearch && matchesCat
  })

  const contactWhatsApp = (product: any) => {
    const text = `გამარჯობა! მინდა შევუკვეთო: ${product.name} (${product.brand}) - ${product.price}`
    window.open(`https://wa.me/995592013611?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება...</div>

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-red-500">ახალი პროდუქცია</h1>
          <p className="text-zinc-400 mt-3">მარაგში არსებული პროდუქტები</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="ძებნა სახელით ან ბრენდით..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl focus:border-red-600"
          />
          <select 
            value={selectedCat} 
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl"
          >
            <option value="all">ყველა კატეგორია</option>
            {[...new Set(products.map(p => p.cat).filter(Boolean))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all">
              <div className="h-80 relative">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="uppercase text-red-500 text-sm font-medium tracking-wider mb-1">{product.brand}</div>
                <h3 className="font-bold text-xl leading-tight mb-4 min-h-[52px]">{product.name}</h3>
                
                <div className="text-3xl font-black mb-5">{product.price}</div>

                {product.sizes && (
                  <div className="mb-6">
                    <p className="text-xs text-zinc-400 mb-2">ზომები:</p>
                    <p className="text-sm">{product.sizes}</p>
                  </div>
                )}

                <button 
                  onClick={() => contactWhatsApp(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  შეკვეთის გაკეთება
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
