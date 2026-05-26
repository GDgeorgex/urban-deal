use client
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Package, Flame, Plus, Pencil, Trash2, LogOut, Settings, UploadCloud, Loader2, Save } from "lucide-react"

const ADMIN_PASSWORD = "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders" | "cms">("products")
  const [products, setProducts] = useState<any[]>([])
  const [cmsContent, setCmsContent] = useState<any[]>([])
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  const loadData = async () => {
    const { data: pData } = await supabase.from("products").select("*").order("id", { ascending: false })
    setProducts(pData || [])
    
    const { data: cData } = await supabase.from("site_content").select("*").order("section", { ascending: true })
    setCmsContent(cData || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadData()
  }, [isLoggedIn])

  const saveProduct = async (product: any) => {
    const { error } = await supabase.from("products").upsert(product)
    if (error) alert("შეცდომა: " + error.message)
    else {
      showMessage("✅ შენახულია!")
      loadData()
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from("products").delete().eq("id", id)
    loadData()
    showMessage("წაიშალა")
  }

  const saveCmsItem = async (item: any) => {
    const { error } = await supabase.from("site_content").upsert(item)
    if (error) alert("შეცდომა: " + error.message)
    else {
      showMessage("✅ კონტენტი განახლდა!")
      loadData()
    }
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
          <button onClick={() => setActiveTab("cms")} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 ${activeTab === "cms" ? "bg-red-600" : "hover:bg-zinc-800"}`}>
            <Settings className="w-5 h-5" /> საიტის კონტენტი
          </button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 text-red-500 hover:text-red-400">
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <PreordersPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "cms" && <CmsPanel content={cmsContent} onSave={saveCmsItem} />}
      </main>
    </div>
  )
}

// --- CMS PANEL COMPONENT ---
function CmsPanel({ content, onSave }: any) {
  const sections = Array.from(new Set(content.map((c: any) => c.section)))
  
  return (
    <div>
      <h1 className="text-4xl font-black mb-8">საიტის კონტენტი (CMS)</h1>
      <div className="space-y-12">
        {sections.map((section: any) => (
          <div key={section} className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-red-500 border-b border-zinc-800 pb-4">{section}</h2>
            <div className="space-y-6">
              {content.filter((c: any) => c.section === section).map((item: any) => (
                <CmsItem key={item.id} item={item} onSave={onSave} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CmsItem({ item, onSave }: any) {
  const [val, setVal] = useState(item.value)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `cms-${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from("product-images").upload(fileName, file)
    if (error) alert(error.message)
    else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
      setVal(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{item.label}</label>
      <div className="flex gap-4 items-start">
        {item.content_type === 'text' ? (
          <textarea 
            value={val} 
            onChange={e => setVal(e.target.value)} 
            className="flex-1 bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none h-24"
          />
        ) : (
          <div className="flex-1 space-y-4">
            <input 
              value={val} 
              onChange={e => setVal(e.target.value)} 
              className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none"
              placeholder="Image URL"
            />
            <div className="flex gap-4 items-center">
              <img src={val} className="w-32 h-20 object-cover rounded-xl border border-zinc-700" alt="" />
              <label className="bg-zinc-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2 text-sm">
                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
                ატვირთვა
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </div>
        )}
        <button 
          onClick={() => onSave({ ...item, value: val })}
          className="bg-red-600 p-4 rounded-2xl hover:bg-red-700 transition self-end"
        >
          <Save className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

// --- PRODUCT PANELS (UNCHANGED) ---
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
    const newUrls: string[] = []
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from("product-images").upload(fileName, file)
      if (!error) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
        newUrls.push(data.publicUrl)
      }
    }
    setImageUrls(prev => [...prev, ...newUrls])
    setUploading(false)
  }

  const handleSave = () => {
    const finalImages = imageUrls.join(",")
    onSave({ ...form, images: finalImages, img: imageUrls[0] || "" })
    onCancel()
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-red-500">{isPreorder ? "პრი-ორდერი" : "პროდუქტი"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input placeholder="სახელი" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700" />
        <input placeholder="ბრენდი" value={form.brand || ""} onChange={e => setForm({...form, brand: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700" />
        <input placeholder="კატეგორია" value={form.cat || ""} onChange={e => setForm({...form, cat: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700" />
        <select value={form.gender || "unisex"} onChange={e => setForm({...form, gender: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700">
          <option value="men">მამაკაცი</option>
          <option value="women">ქალი</option>
          <option value="unisex">Unisex</option>
          <option value="kids">ბავშვები</option>
        </select>
        <input placeholder="ფასი" value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700" />
        <input placeholder="ზომები" value={form.sizes || ""} onChange={e => setForm({...form, sizes: e.target.value})} className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700" />
      </div>
      
      <div className="mt-6">
        <label className="block text-sm mb-2">ფოტოების გალერეა</label>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative aspect-square">
              <img src={url} className="w-full h-full object-cover rounded-xl border border-zinc-700" alt="" />
              <button onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-red-500">
            {uploading ? <Loader2 className="animate-spin" /> : <Plus />}
            <input type="file" multiple className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={handleSave} className="bg-red-600 px-8 py-4 rounded-2xl font-bold">შენახვა</button>
        <button onClick={onCancel} className="bg-zinc-800 px-8 py-4 rounded-2xl">გაუქმება</button>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition group border border-zinc-800">
      <img src={product.img || "/placeholder.jpg"} className="w-16 h-16 object-cover rounded-xl" alt="" />
      <div className="flex-1">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-zinc-400 text-sm">{product.price}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => onEdit(product)} className="p-2 bg-zinc-800 rounded-lg hover:text-blue-500"><Pencil className="w-5 h-5" /></button>
        <button onClick={() => onDelete(product.id)} className="p-2 bg-zinc-800 rounded-lg hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
      </div>
    </div>
  )
}
