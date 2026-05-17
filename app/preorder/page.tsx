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
        .eq('isPreorder', true)        // important: boolean true
        .order('id', { ascending: false })

      if (error) {
        console.error("Preorder fetch error:", error)
      } else {
        setPreorders(data || [])
      }
      setLoading(false)
    }

    fetchPreorders()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება პრი-ორდერები...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-orange-500 mb-4">პრი-ორდერი</h1>
          <p className="text-2xl text-zinc-400">დაჯავშნე მომავალი კოლექცია ახლავე</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {preorders.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-orange-500/30 group">
              <div className="relative h-96">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-6 right-6 bg-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm">
                  PRE-ORDER
                </div>
              </div>

              <div className="p-8">
                <p className="text-orange-500 font-medium mb-1">{product.brand}</p>
                <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <p className="text-sm text-zinc-400">პრი-ორდერ ფასი</p>
                    <p className="text-4xl font-black text-orange-500">{product.preorderPrice}</p>
                  </div>
                  {product.regularPrice && (
                    <p className="line-through text-zinc-500">{product.regularPrice}</p>
                  )}
                </div>

                {product.expected_arrival && (
                  <p className="text-zinc-400 mb-8">ჩამოსვლა: {product.expected_arrival}</p>
                )}

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-5 rounded-2xl text-lg transition">
                  დაჯავშნა პრი-ორდერით
                </button>
              </div>
            </div>
          ))}
        </div>

        {preorders.length === 0 && (
          <div className="text-center py-32 text-3xl text-zinc-500">
            ჯერჯერობით პრი-ორდერები არ არის დამატებული
          </div>
        )}
      </div>
    </div>
  )
}
