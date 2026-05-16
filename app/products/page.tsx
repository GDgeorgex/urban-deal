"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">იწვირთება...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-black text-center mb-4">ჩვენი პროდუქტები</h1>
        <p className="text-center text-zinc-400 mb-12 text-xl">ორიგინალი სნიკერები და ტანსაცმელი</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <div className="aspect-square relative">
                <img 
                  src={product.img || "https://via.placeholder.com/400"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-red-500 text-sm font-medium mb-1">{product.brand}</div>
                <h3 className="font-bold text-xl mb-2 line-clamp-2">{product.name}</h3>
                <div className="text-2xl font-black text-white mb-4">{product.price}</div>
                
                <button className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition-colors">
                  დეტალები
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-2xl text-zinc-500 py-20">ჯერჯერობით პროდუქტები არ არის დამატებული</p>
        )}
      </div>
    </div>
  )
}
