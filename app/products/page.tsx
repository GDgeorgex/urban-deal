"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/products"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("ყველა ბრენდი")
  const [selectedCat, setSelectedCat] = useState("ყველა კატეგ.")

  const regularProducts = PRODUCTS.filter((p) => !p.isPreorder)

  const brands = useMemo(() => {
    return ["ყველა ბრენდი", ...new Set(regularProducts.map((p) => p.brand))]
  }, [])

  const categories = useMemo(() => {
    return ["ყველა კატეგ.", ...new Set(regularProducts.map((p) => p.cat))]
  }, [])

  const filteredProducts = useMemo(() => {
    return regularProducts.filter((p) => {
      const matchesBrand = selectedBrand === "ყველა ბრენდი" || p.brand === selectedBrand
      const matchesCat = selectedCat === "ყველა კატეგ." || p.cat === selectedCat
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      return matchesBrand && matchesCat && matchesSearch
    })
  }, [search, selectedBrand, selectedCat])

  const clearFilters = () => {
    setSearch("")
    setSelectedBrand("ყველა ბრენდი")
    setSelectedCat("ყველა კატეგ.")
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <div className="bg-card border-b border-border py-14 pb-9">
          <div className="max-w-[1300px] mx-auto px-7">
            <h1 className="font-black text-[clamp(44px,7vw,88px)] tracking-[-0.03em] leading-[0.9] text-foreground">
              ჩვენი <span className="text-primary">კოლექცია</span>
            </h1>
            <p className="text-muted-foreground text-[15px] mt-3">
              ავთენტური სნიკერები და სტრიტვეარი — ევროპიდან, პირდაპირ თბილისში.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border-b border-border py-5 sticky top-[62px] z-[100]">
          <div className="max-w-[1300px] mx-auto px-7 flex flex-col gap-3.5">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg3)] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="მოძებნე პროდუქტი..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm outline-none transition-colors focus:border-primary placeholder:text-[var(--fg3)]"
              />
            </div>

            <div className="flex gap-6 flex-wrap">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--fg3)] mb-1.5">
                  ბრენდი
                </label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition-all cursor-pointer ${
                        selectedBrand === brand
                          ? "bg-primary border-primary text-white"
                          : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--fg3)] mb-1.5">
                  კატეგორია
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition-all cursor-pointer ${
                        selectedCat === cat
                          ? "bg-primary border-primary text-white"
                          : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="py-10 pb-20">
          <div className="max-w-[1300px] mx-auto px-7">
            <p className="text-[var(--fg3)] text-[13px] mb-6">
              ნაჩვენებია {filteredProducts.length} პროდუქტი
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-5">ამ ფილტრებით პროდუქტი ვერ მოიძებნა.</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-transparent text-foreground font-bold text-[13px] tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all"
                >
                  ფილტრის გასუფთავება
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
