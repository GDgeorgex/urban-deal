"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Search, Filter, ShoppingCart } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

      if (error) console.error(error)
      else setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Add to Cart
  const addToCart = (product: any) => {
    setCart([...cart, product])
    alert(`${product.name} დაემატა კალათში!`)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.cat === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება პროდუქტები...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 tracking-tight">URBAN DEAL</h1>
          <p className="text-2xl text-zinc-400">ორიგინალური სნიკერები • პრემიუმ ხარისხი</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 sticky top-4 z-50 bg-black/80 backdrop-blur-md p-4 rounded-3xl border border-zinc-800">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-4 text-zinc-500" />
            <input
              type="text"
              placeholder="მოძებნე სახელით ან ბრენდით..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 pl-14 py-4 rounded-2xl focus:outline-none focus:border-red-600"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl focus:outline-none focus:border-red-600"
          >
            <option value="all">ყველა კატეგორია</option>
            <option value="sneakers">სნიკერები</option>
            <option value="hoodies">ჰუდები</option>
            <option value="pants">შარვლები</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.img || "/placeholder.jpg"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.isPreorder && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full">PRE-ORDER</div>
                )}
              </div>

              <div className="p-6">
                <div className="text-red-500 font-medium text-sm mb-1">{product.brand}</div>
                <h3 className="font-bold text-xl leading-tight mb-3 line-clamp-2 min-h-[52px]">{product.name}</h3>
                
                <div className="text-3xl font-black mb-6">{product.price}</div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    კალათში
                  </button>
                  <button className="flex-1 border border-zinc-700 hover:bg-zinc-800 py-4 rounded-2xl transition">
                    დეტალები
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-3xl text-zinc-500">პროდუქტი ვერ მოიძებნა</p>
          </div>
        )}
      </div>
    </div>
  )
}
