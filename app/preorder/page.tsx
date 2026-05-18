"use client"
import { Navbar } from "@/components/navbar"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageCircle } from "lucide-react"

export default function PreorderPage() {
  const [preorders, setPreorders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedGender, setSelectedGender] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

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

  const filteredPreorders = preorders.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCat === "all" || p.cat === selectedCat
    const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand
    const matchesGender = selectedGender === "all" || p.gender === selectedGender
    return matchesSearch && matchesCat && matchesBrand && matchesGender
  })

  const contactWhatsApp = (product: any) => {
    const text = `გამარჯობა! მინდა დავჯავშნო პრი-ორდერით: ${product.name} (${product.brand}) - ${product.preorderPrice || product.price}`
    window.open(`https://wa.me/995592013611?text=${encodeURIComponent(text )}`, '_blank')
  }

  const getProductImages = (product: any) => {
    if (product.images) {
      return product.images.split(",").filter((url: string) => url.trim())
    }
    return product.img ? [product.img] : []
  }

  const nextImage = (productId: number, imageCount: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % imageCount
    }))
  }

  const prevImage = (productId: number, imageCount: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + imageCount) % imageCount
    }))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl">იწვირთება პრი-ორდერები...</div>

  const categories = ["all", ...new Set(preorders.map(p => p.cat).filter(Boolean))]
  const brands = ["all", ...new Set(preorders.map(p => p.brand).filter(Boolean))]
  const genders = ["all", "men", "women", "unisex", "kids"]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-orange-500">პრი-ორდერი</h1>
            <p className="text-zinc-400 text-xl mt-3">დაჯავშნე მომავალი კოლექცია ახლავე</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="ძებნა პრი-ორდერ პროდუქტებში..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl focus:border-orange-500 text-white"
            />
            <select 
              value={selectedCat} 
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl text-white"
            >
              <option value="all">ყველა კატეგორია</option>
              {categories.filter(c => c !== "all").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl text-white"
            >
              <option value="all">ყველა ბრენდი</option>
              {brands.filter(b => b !== "all").map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select 
              value={selectedGender} 
              onChange={(e) => setSelectedGender(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl text-white"
            >
              <option value="all">ყველა სქესი</option>
              <option value="men">მამაკაცი</option>
              <option value="women">ქალი</option>
              <option value="unisex">Unisex</option>
              <option value="kids">ბავშვები</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPreorders.map((product) => {
              const images = getProductImages(product)
              const currentIdx = currentImageIndex[product.id] || 0
              return (
                <div key={product.id} className="bg-zinc-900 border border-orange-500/30 rounded-3xl overflow-hidden hover:border-orange-500 transition-all">
                  <div className="h-80 relative bg-black">
                    {images.length > 0 ? (
                      <>
                        <img 
                          src={images[currentIdx]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 right-6 bg-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm">
                          PRE-ORDER
                        </div>
                        {images.length > 1 && (
                          <>
                            <button 
                              onClick={() => prevImage(product.id, images.length)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
                            >
                              ←
                            </button>
                            <button 
                              onClick={() => nextImage(product.id, images.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
                            >
                              →
                            </button>
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {currentIdx + 1}/{images.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500">სურათი ხელმისაწვდომი არ არის</div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="uppercase text-orange-500 text-sm font-medium tracking-wider mb-1">{product.brand}</div>
                    <h3 className="font-bold text-xl leading-tight mb-2 min-h-[52px]">{product.name}</h3>
                    
                    {product.description && (
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{product.description}</p>
                    )}
                    
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm text-zinc-400">პრი-ორდერ ფასი</p>
                        <p className="text-4xl font-black text-orange-500">{product.preorderPrice || product.price}</p>
                      </div>
                      {product.regularPrice && (
                        <p className="line-through text-zinc-500">{product.regularPrice}</p>
                      )}
                    </div>

                    {product.expected_arrival && (
                      <p className="text-zinc-400 mb-4">ჩამოსვლა: {product.expected_arrival}</p>
                    )}

                    {product.sizes && (
                      <div className="mb-6">
                        <p className="text-xs text-zinc-400 mb-2">ზომები:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.split(",").map((size: string, idx: number) => (
                            <span key={idx} className="bg-zinc-800 px-3 py-1 rounded text-sm">{size.trim()}</span>
                          ))}
                        </div>
                      </div>
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
              )
            })}
          </div>

          {filteredPreorders.length === 0 && (
            <div className="text-center py-32 text-3xl text-zinc-500">
              პრი-ორდერი პროდუქტები ვერ მოიძებნა
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
