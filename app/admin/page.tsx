"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Package, Flame, Plus, Pencil, Trash2, LogOut, UploadCloud, Globe, Save } from "lucide-react"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders" | "cms">("products")
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
    const productData = {
      name: product.name,
      brand: product.brand,
      cat: product.cat || "sneakers",
      gender: product.gender || "unisex",
      price: product.price,
      img: product.img || (product.images?.split(",")[0] || ""),
      sizes: product.sizes || "",
      description: product.description || "",
      images: product.images || "",
      isPreorder: product.isPreorder || false,
      preorderPrice: product.preorderPrice || null,
      regularPrice: product.regularPrice || null,
      expected_arrival: product.expectedArrival || product.expected_arrival || null,
    }

    const { error } = await supabase.from('products').upsert(productData)
    if (error) alert("შეცდომა: " + error.message)
    else {
      showMessage("✅ შენახულია!")
      loadProducts()
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from('products').delete().eq('id', id)
    loadProducts()
    showMessage("წაიშალა")
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
      
      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from("product-images") // MAKE SURE THIS MATCHES YOUR BUCKET NAME EXACTLY
        .upload(fileName, file)

      if (error) {
        alert("შეცდომა სურათის ატვირთვისას: " + error.message)
        continue
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      if (publicUrlData) {
        newUploadedUrls.push(publicUrlData.publicUrl)
      }
    }

    setImageUrls(prev => [...prev, ...newUploadedUrls])
    setUploading(false)
    e.target.value = '' // Reset input
  }

  const handleImageUrlRemove = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const updatedForm = {
      ...form,
      images: imageUrls.filter(Boolean).join(","),
      img: imageUrls.length > 0 ? imageUrls[0] : "" // Automatically set the first image as the main 'img'
    }
    onSave(updatedForm)
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10">
      <h2 className="text-2xl font-bold mb-6">{isPreorder ? "ახალი პრი-ორდერი" : "ახალი პროდუქტი"}</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <input placeholder="სახელი" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" />
        <input placeholder="ბრენდი" value={form.brand || ""} onChange={e => setForm({...form, brand: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" />
        
        <div>
          <label className="block text-sm mb-2">კატეგორია</label>
          <input placeholder="sneakers, hoodies..." value={form.cat || ""} onChange={e => setForm({...form, cat: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full" />
        </div>

        <div>
          <label className="block text-sm mb-2">სქესი</label>
          <select value={form.gender || "unisex"} onChange={e => setForm({...form, gender: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full">
            <option value="men">მამაკაცი</option>
            <option value="women">ქალი</option>
            <option value="unisex">Unisex</option>
            <option value="kids">ბავშვები</option>
          </select>
        </div>

        <input placeholder="ფასი" value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" />
        
        <input placeholder="ზომები (მაგ: 36,37,38,39,40)" value={form.sizes || ""} onChange={e => setForm({...form, sizes: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl" />
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block text-sm mb-2">აღწერა</label>
        <textarea placeholder="პროდუქტის დეტალური აღწერა..." value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full h-24" />
      </div>

            {/* Image Uploads */}
      <div className="mt-6">
        <label className="block text-sm mb-2">სურათები (შეგიძლიათ აირჩიოთ რამდენიმე)</label>
        <div className="space-y-4">
          
          {/* Display uploaded images */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Upload ${index}`} className="w-full h-24 object-cover rounded-xl border border-zinc-700" />
                  <button 
                    onClick={() => handleImageUrlRemove(index)} 
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="წაშლა"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <div>
            <label htmlFor="file-upload" className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold cursor-pointer transition-colors ${uploading ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700'}`}>
              <UploadCloud className="w-5 h-5" /> 
              {uploading ? "იტვირთება..." : "კომპიუტერიდან ატვირთვა"}
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>
      </div>
      
      {/* Pre-order specific fields */}
      {isPreorder && (
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">ჩვეულებრივი ფასი</label>
            <input placeholder="ჩვეულებრივი ფასი" value={form.regularPrice || ""} onChange={e => setForm({...form, regularPrice: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full" />
          </div>
          <div>
            <label className="block text-sm mb-2">პრი-ორდერ ფასი</label>
            <input placeholder="პრი-ორდერ ფასი" value={form.preorderPrice || ""} onChange={e => setForm({...form, preorderPrice: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full" />
          </div>
          <div>
            <label className="block text-sm mb-2">მოსალოდნელი ჩამოსვლა (dd/mm/yyyy)</label>
            <input placeholder="15/05/2026" value={form.expectedArrival || form.expected_arrival || ""} onChange={e => setForm({...form, expectedArrival: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl w-full" />
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button onClick={handleSave} className="bg-red-600 px-8 py-4 rounded-2xl font-semibold">შენახვა</button>
        <button onClick={onCancel} className="border border-zinc-700 px-8 py-4 rounded-2xl">გაუქმება</button>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: any) {
  return (
    <div className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition">
      <img src={product.img} className="w-24 h-24 object-cover rounded-2xl" />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-red-500">{product.brand} — {product.price}</p>
        <p className="text-sm text-zinc-400">კატეგორია: {product.cat} • სქესი: {product.gender}</p>
      </div>
      <button onClick={() => onEdit(product)} className="text-blue-500"><Pencil /></button>
      <button onClick={() => onDelete(product.id)} className="text-red-500"><Trash2 /></button>
    </div>
  )
}
