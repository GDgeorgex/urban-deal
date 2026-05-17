"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageCircle } from "lucide-react"

export default function PreorderPage() {
  const [preorders, setPreorders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchPreorders() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('isPreorder', true)
        .order('id', { ascending: false })
      
      setPreorders(data || [])
      setLoading(false)
    }
    fetchPreorders()
  }, [])

  const filteredPreorders = preorders.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const contactWhatsApp = (product: any) => {
    const text = `გამარჯობა! მინდა დავჯავშნო პრი-ორდერით: ${product.name} (${product.brand}) - ${product.preorderPrice || product.price}`
    window.open(`https://wa.me/995592013611?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება პრი-ორდერები...</div>

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-orange-500">პრი-ორდერი</h1>
          <p className="text-zinc-400 text-xl mt-3">დაჯავშნე მომავალი კოლექცია ახლავე</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="ძებნა პრი-ორდერ პროდუქტებში..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPreorders.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-orange-500/30 rounded-3xl overflow-hidden hover:border-orange-500 transition-all">
              <div className="h-80 relative">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 bg-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm">
                  PRE-ORDER
                </div>
              </div>

              <div className="p-6">
                <div className="uppercase text-orange-500 text-sm font-medium tracking-wider mb-1">{product.brand}</div>
                <h3 className="font-bold text-xl leading-tight mb-4 min-h-[52px]">{product.name}</h3>
                
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-sm text-zinc-400">პრი-ორდერ ფასი</p>
                    <p className="text-4xl font-black text-orange-500">{product.preorderPrice || product.price}</p>
                  </div>
                  {product.regularPrice && (
                    <p className="line-through text-zinc-500">{product.regularPrice}</p>
                  )}
                </div>

                {product.expected_arrival && (
                  <p className="text-zinc-400 mb-6">ჩამოსვლა: {product.expected_arrival}</p>
                )}

                <button 
                  onClick={() => contactWhatsApp(product)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  დაჯავშნე
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPreorders.length === 0 && (
          <div className="text-center py-32 text-3xl text-zinc-500">
            ჯერჯერობით პრი-ორდერები არ არის დამატებული
          </div>
        )}
      </div>
    </div>
  )
}
