"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Package, Flame, Plus, Pencil, Trash2, LogOut, UploadCloud, Loader2 } from "lucide-react"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders">("products")
  const [products, setProducts] = useState<any[]>([])
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false })
    setProducts(data || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadProducts()
  }, [isLoggedIn])

  const saveProduct = async (product: any) => {
    // Ensure we have the correct data structure for Supabase
    const productData = {
      id: product.id, // Include ID if editing
      name: product.name,
      brand: product.brand,
      cat: product.cat || "sneakers",
      gender: product.gender || "unisex",
      price: product.price,
      img: product.img, // Main thumbnail
      images: product.images, // Comma-separated list of all photos
      sizes: product.sizes || "",
      description: product.description || "",
      isPreorder: product.isPreorder || false,
      preorderPrice: product.preorderPrice || null,
      regularPrice: product.regularPrice || null,
      expected_arrival: product.expectedArrival || product.expected_arrival || null,
    }

    const { error } = await supabase.from('products').upsert(productData)
    if (error) alert("შეცდომა შენახვისას: " + error.message)
    else {
      showMessage("✅ წარმატებით შენახულია!")
      loadProducts()
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("ნამდვილად გსურთ წაშლა?")) return
    await supabase.from('products').delete().eq('id', id)
    loadProducts()
    showMessage("წაშლილია")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-12 rounded-3xl w-full max-w-md text-center">
          <h1 className="text-red-600 text-5xl font-black mb-8">Urban Deal</h1>
          <h2 className="text-3xl mb-8">ადმინ პანელი</h2>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="პაროლი" className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center text-xl" />
          <button onClick={() => password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true)} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold">შესვლა</button>
          {error && <p className="text-red-500 mt-4">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {saveMessage && <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50">{saveMessage}</div>}

      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <div className="mb-12">
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-2xl inline-block">Urban Deal</div>
        </div>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab("products")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "products" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Package className="w-5 h-5" /> პროდუქტები
          </button>
          <button onClick={() => setActiveTab("preorders")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "preorders" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Flame className="w-5 h-5" /> პრი-ორდერები
          </button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-400">
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>

      <main className="flex-1 p-10">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <PreordersPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
      </main>
    </div>
  )
}

function ProductsPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-black">პროდუქტები</h1>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2">
          <Plus /> ახალი პროდუქტი
        </button>
      </div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} />}
      <div className="space-y-4">
        {products.filter((p: any) => !p.isPreorder).map((p: any) => (
          <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

function PreordersPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-black flex items-center gap-3"><Flame className="text-orange-500" /> პრი-ორდერები</h1>
        <button onClick={() => setEditing({ isPreorder: true })} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2">
          <Plus /> ახალი პრი-ორდერი
        </button>
      </div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} isPreorder />}
      <div className="space-y-4">
        {products.filter((p: any) => p.isPreorder).map((p: any) => (
          <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

function ProductForm({ product, onSave, onCancel, isPreorder = false }: any) {
  const [form, setForm] = useState(product || { cat: "sneakers", gender: "unisex" })
  const [imageUrls, setImageUrls] = useState<string[]>((product?.images || "").split(",").filter(Boolean))
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const files = Array.from(e.target.files)
    const newUploadedUrls: string[] = []

    for (const file of files) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file)

      if (error) {
        alert("ატვირთვის შეცდომა: " + error.message)
        continue
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      if (publicUrlData) {
        newUploadedUrls.push(publicUrlData.publicUrl)
      }
    }

    setImageUrls(prev => [...prev, ...newUploadedUrls])
    setUploading(false)
    e.target.value = '' 
  }

  const handleImageUrlRemove = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const finalImages = imageUrls.filter(Boolean).join(",")
    const updatedForm = {
      ...form,
      images: finalImages,
      img: imageUrls.length > 0 ? imageUrls[0] : "" // Set first image as main thumbnail
    }
    onSave(updatedForm)
    onCancel() // Close form after saving
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-red-500">{isPreorder ? "პრი-ორდერის რედაქტირება" : "პროდუქტის რედაქტირება"}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">დასახელება</label>
          <input placeholder="მაგ: Nike Air Jordan 4" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">ბრენდი</label>
          <input placeholder="მაგ: Nike" value={form.brand || ""} onChange={e => setForm({...form, brand: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none" />
        </div>
        
        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">კატეგორია</label>
          <input placeholder="sneakers, hoodies..." value={form.cat || ""} onChange={e => setForm({...form, cat: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none" />
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">სქესი</label>
          <select value={form.gender || "unisex"} onChange={e => setForm({...form, gender: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none">
            <option value="men">მამაკაცი</option>
            <option value="women">ქალი</option>
            <option value="unisex">Unisex</option>
            <option value="kids">ბავშვები</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">ფასი</label>
          <input placeholder="მაგ: 450 GEL" value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none" />
        </div>
        
        <div>
          <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">ზომები</label>
          <input placeholder="მაგ: 36, 37, 38" value={form.sizes || ""} onChange={e => setForm({...form, sizes: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none" />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">აღწერა</label>
        <textarea placeholder="პროდუქტის დეტალური აღწერა..." value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none h-24" />
      </div>

      {/* PHOTO UPLOAD SECTION */}
      <div className="mt-8 p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
        <label className="block text-sm font-bold mb-4 flex items-center gap-2">
          <UploadCloud className="text-red-500" /> ფოტოების გალერეა
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img src={url} alt="" className="w-full h-full object-cover rounded-xl border border-zinc-800" />
              <button 
                onClick={() => handleImageUrlRemove(index)} 
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:scale-110 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">მთავარი</span>
              )}
            </div>
          ))}
          
          <label className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-500/5 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            ) : (
              <>
                <Plus className="w-8 h-8 text-zinc-500" />
                <span className="text-[10px] text-zinc-500 mt-2 uppercase font-bold">ატვირთვა</span>
              </>
            )}
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center">პირველი ფოტო იქნება მთავარი (Thumbnail)</p>
      </div>

      {isPreorder && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-orange-500/5 rounded-3xl border border-orange-500/20">
          <div>
            <label className="block text-xs text-orange-500/70 mb-2 uppercase tracking-widest">ჩვეულებრივი ფასი</label>
            <input placeholder="მაგ: 500 GEL" value={form.regularPrice || ""} onChange={e => setForm({...form, regularPrice: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs text-orange-500/70 mb-2 uppercase tracking-widest">პრი-ორდერ ფასი</label>
            <input placeholder="მაგ: 400 GEL" value={form.preorderPrice || ""} onChange={e => setForm({...form, preorderPrice: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs text-orange-500/70 mb-2 uppercase tracking-widest">ჩამოსვლის დრო</label>
            <input placeholder="მაგ: 15 მაისი" value={form.expectedArrival || form.expected_arrival || ""} onChange={e => setForm({...form, expectedArrival: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-orange-500 outline-none" />
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-10">
        <button onClick={handleSave} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-red-600/20 transition">შენახვა</button>
        <button onClick={onCancel} className="px-10 bg-zinc-800 hover:bg-zinc-700 text-white py-5 rounded-2xl font-bold transition">გაუქმება</button>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition group border border-zinc-800">
      <img src={product.img || "/placeholder.jpg"} className="w-20 h-20 object-cover rounded-2xl shadow-xl" />
      <div className="flex-1">
        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">{product.brand}</div>
        <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
        <p className="text-zinc-400 text-sm">{product.price}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => onEdit(product)} className="p-3 bg-zinc-800 hover:bg-blue-600 rounded-xl transition"><Pencil className="w-5 h-5" /></button>
        <button onClick={() => onDelete(product.id)} className="p-3 bg-zinc-800 hover:bg-red-600 rounded-xl transition"><Trash2 className="w-5 h-5" /></button>
      </div>
    </div>
  )
}
