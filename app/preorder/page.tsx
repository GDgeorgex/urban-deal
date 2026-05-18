"use client"
import { Navbar } from "@/components/navbar"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react"

export default function PreorderPage() {
  const [preorders, setPreorders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedGender, setSelectedGender] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})

  // State for the expanded view (Modal)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [modalImageIndex, setModalImageIndex] = useState(0)

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
    window.open(`https://wa.me/995592013611?text=${encodeURIComponent(text  )}`, '_blank')
  }

  const getProductImages = (product: any) => {
    if (product.images) {
      return product.images.split(",").filter((url: string) => url.trim())
    }
    return product.img ? [product.img] : []
  }

  const nextImage = (productId: number, imageCount: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % imageCount
    }))
  }

  const prevImage = (productId: number, imageCount: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + imageCount) % imageCount
    }))
  }

  const openModal = (product: any) => {
    setSelectedProduct(product)
    setModalImageIndex(currentImageIndex[product.id] || 0)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProduct(null)
    document.body.style.overflow = 'auto'
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
                <div 
                  key={product.id} 
                  onClick={() => openModal(product)}
                  className="bg-zinc-900 border border-orange-500/30 rounded-3xl overflow-hidden hover:border-orange-500 transition-all cursor-pointer group"
                >
                  <div className="h-80 relative bg-black overflow-hidden">
                    {images.length > 0 ? (
                      <>
                        <img 
                          src={images[currentIdx]} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-6 right-6 bg-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm z-10">
                          PRE-ORDER
                        </div>
                        {images.length > 1 && (
                          <>
                            <button 
                              onClick={(e) => prevImage(product.id, images.length, e)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white z-10"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={(e) => nextImage(product.id, images.length, e)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white z-10"
                            >
                              <ChevronRight className="w-5 h-5" />
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
                      onClick={(e) => {
                        e.stopPropagation()
                        contactWhatsApp(product)
                      }}
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

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative bg-zinc-900 w-full max-w-6xl max-h-[90vh] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-zinc-800 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side: Image Gallery */}
            <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-black">
              {getProductImages(selectedProduct).length > 0 ? (
                <>
                  <img 
                    src={getProductImages(selectedProduct)[modalImageIndex]} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-6 right-6 bg-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm">
                    PRE-ORDER
                  </div>
                  {getProductImages(selectedProduct).length > 1 && (
                    <>
                      <button 
                        onClick={() => setModalImageIndex(prev => (prev - 1 + getProductImages(selectedProduct).length) % getProductImages(selectedProduct).length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white backdrop-blur-md transition"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button 
                        onClick={() => setModalImageIndex(prev => (prev + 1) % getProductImages(selectedProduct).length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white backdrop-blur-md transition"
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
                        {getProductImages(selectedProduct).map((_, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setModalImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === modalImageIndex ? 'bg-orange-500 w-8' : 'bg-white/30 hover:bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">სურათი ხელმისაწვდომი არ არის</div>
              )}
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto bg-zinc-900 border-l border-zinc-800">
              <div className="uppercase text-orange-500 font-bold tracking-[0.2em] text-sm mb-4">{selectedProduct.brand}</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">{selectedProduct.name}</h2>
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">პრი-ორდერ ფასი</p>
                  <p className="text-5xl font-black text-orange-500">{selectedProduct.preorderPrice || selectedProduct.price}</p>
                </div>
                {selectedProduct.regularPrice && (
                  <p className="line-through text-zinc-500 text-xl">{selectedProduct.regularPrice}</p>
                )}
              </div>

              {selectedProduct.expected_arrival && (
                <div className="mb-8 p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                  <p className="text-orange-500 text-sm font-bold uppercase tracking-widest">მოსალოდნელი ჩამოსვლა</p>
                  <p className="text-white text-xl font-bold">{selectedProduct.expected_arrival}</p>
                </div>
              )}

              {selectedProduct.description && (
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">აღწერა</h4>
                  <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">{selectedProduct.description}</p>
                </div>
              )}

              {selectedProduct.sizes && (
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">ხელმისაწვდომი ზომები</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.split(",").map((size: string, idx: number) => (
                      <span key={idx} className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-2xl text-lg font-bold">{size.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => contactWhatsApp(selectedProduct)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black py-6 rounded-[24px] font-bold text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-500/20"
              >
                <MessageCircle className="w-6 h-6" />
                დაჯავშნე ახლავე
              </button>
              
              <p className="text-center text-zinc-500 text-xs mt-6 uppercase tracking-widest">პრი-ორდერი ევროპიდან</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
