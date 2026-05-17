"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ShoppingCart } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
      
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const categories = ["all", ...new Set(products.map(p => p.cat).filter(Boolean))]
  const brands = ["all", ...new Set(products.map(p => p.brand).filter(Boolean))]

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCat === "all" || p.cat === selectedCat
    const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand
    return matchesSearch && matchesCat && matchesBrand
  })

  const addToCart = (product: any) => {
    alert(`${product.name} დაემატა კალათში ✓`)
    // Later we will make real cart
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება...</div>

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Title - like old version */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black tracking-tighter text-red-500 neon-text">პროდუქტები</h1>
          <p className="text-xl text-zinc-400 mt-3">6 პროდუქტი სულ მონაცემთა ბაზაში</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          <input
            type="text"
            placeholder="ძებნა სახელით ან ბრენდით..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl w-full max-w-md focus:border-red-600"
          />

          <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === "all" ? "ყველა კატეგორია" : cat}</option>
            ))}
          </select>

          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl">
            {brands.map(b => (
              <option key={b} value={b}>{b === "all" ? "ყველა ბრენდი" : b}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600 group">
              <div className="relative h-80">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-red-500 font-medium">{product.brand}</p>
                <h3 className="text-xl font-bold mt-1 mb-3 line-clamp-2">{product.name}</h3>
                <p className="text-3xl font-black mb-6">{product.price}</p>

                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-100 flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  კალათში დამატება
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
