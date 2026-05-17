"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function PreorderPage() {
  const [preorders, setPreorders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPreorders() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('isPreorder', true)
        .order('id', { ascending: false })

      if (error) console.error(error)
      else setPreorders(data || [])
      
      setLoading(false)
    }
    fetchPreorders()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">იწვირთება პრი-ორდერები...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-orange-500 mb-4">პრი-ორდერი</h1>
          <p className="text-2xl text-zinc-400">დაჯავშნე ახალი კოლექცია წინასწარ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {preorders.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-orange-500/30">
              <div className="relative h-80">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-black text-sm font-bold px-5 py-2 rounded-full">
                  PRE-ORDER
                </div>
              </div>
              <div className="p-8">
                <p className="text-orange-500 font-medium">{product.brand}</p>
                <h3 className="text-2xl font-bold mt-2 mb-4">{product.name}</h3>
                
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-sm text-zinc-400">პრი-ორდერ ფასი</p>
                    <p className="text-4xl font-black text-orange-500">{product.preorderPrice}</p>
                  </div>
                  {product.regularPrice && (
                    <p className="text-zinc-500 line-through">{product.regularPrice}</p>
                  )}
                </div>

                {product.expected_arrival && (
                  <p className="text-zinc-400 mb-6">ჩამოსვლა: {product.expected_arrival}</p>
                )}

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black py-5 rounded-2xl font-bold text-lg transition">
                  დაჯავშნა პრი-ორდერით
                </button>
              </div>
            </div>
          ))}
        </div>

        {preorders.length === 0 && (
          <p className="text-center text-3xl text-zinc-500 py-32">ჯერჯერობით პრი-ორდერები არ არის</p>
        )}
      </div>
    </div>
  )
}
