"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Package, Flame, Plus, Pencil, Trash2, LogOut, 
  BarChart3, BookOpen, Save, UploadCloud, Loader2,
  Users, Eye, TrendingUp
} from "lucide-react"

// This will look for the environment variable, or fallback to the default if not set
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders" | "analytics" | "culture">("products")
  const [products, setProducts] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any[]>([])
  const [culturePosts, setCulturePosts] = useState<any[]>([])
  const [saveMessage, setSaveMessage] = useState("")

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  const loadData = async () => {
    const { data: pData } = await supabase.from('products').select('*').order('id', { ascending: false })
    setProducts(pData || [])

    const { data: aData } = await supabase.from('site_analytics').select('*').order('created_at', { ascending: false })
    setAnalytics(aData || [])

    const { data: cData } = await supabase.from('culture_posts').select('*').order('created_at', { ascending: false })
    setCulturePosts(cData || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadData()
  }, [isLoggedIn])

  const saveProduct = async (product: any) => {
    const { error } = await supabase.from('products').upsert(product)
    if (error) alert("შეცდომა: " + error.message)
    else {
      showMessage("✅ შენახულია!")
      loadData()
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from('products').delete().eq('id', id)
    loadData()
    showMessage("წაიშალა")
  }

  const saveCulturePost = async (post: any) => {
    const { error } = await supabase.from('culture_posts').upsert(post)
    if (error) alert("შეცდომა: " + error.message)
    else {
      showMessage("✅ პოსტი შენახულია!")
      loadData()
    }
  }

  const deleteCulturePost = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from('culture_posts').delete().eq('id', id)
    loadData()
    showMessage("პოსტი წაიშალა")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-12 rounded-3xl w-full max-w-md text-center border border-zinc-800">
          <h1 className="text-red-600 text-5xl font-black mb-8">Urban Deal</h1>
          <h2 className="text-3xl mb-8 font-bold">ადმინ პანელი</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && (password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true))}
            placeholder="პაროლი" 
            className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center text-xl border border-zinc-700 focus:border-red-600 outline-none" 
          />
          <button onClick={() => password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true)} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold hover:bg-red-700 transition">შესვლა</button>
          {error && <p className="text-red-500 mt-4 font-medium">არასწორი პაროლი</p>}
          <p className="text-zinc-500 mt-8 text-sm">პაროლის შესაცვლელად გამოიყენეთ Vercel Environment Variables</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {saveMessage && <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50 shadow-2xl animate-bounce">{saveMessage}</div>}

      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-2xl inline-block shadow-[0_0_20px_rgba(220,38,38,0.3)]">Urban Deal</div>
        </div>
        <nav className="space-y-2 flex-1">
          <TabButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={<Package />} label="პროდუქტები" />
          <TabButton active={activeTab === "preorders"} onClick={() => setActiveTab("preorders")} icon={<Flame />} label="პრი-ორდერები" />
          <TabButton active={activeTab === "culture"} onClick={() => setActiveTab("culture")} icon={<BookOpen />} label="კულტურა / ბლოგი" />
          <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<BarChart3 />} label="ანალიტიკა" />
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 text-zinc-500 hover:text-red-500 transition font-bold">
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <PreordersPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "culture" && <CulturePanel posts={culturePosts} onSave={saveCulturePost} onDelete={deleteCulturePost} />}
        {activeTab === "analytics" && <AnalyticsPanel data={analytics} products={products} />}
      </main>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition font-bold ${active ? "bg-red-600 text-white shadow-lg" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}>
      {icon} {label}
    </button>
  )
}

// --- ANALYTICS PANEL ---
function AnalyticsPanel({ data, products }: any) {
  const totalViews = data.length
  const uniquePaths = Array.from(new Set(data.map((d: any) => d.page_path)))
  
  const viewsByPath = uniquePaths.map(path => ({
    path,
    count: data.filter((d: any) => d.page_path === path).length
  })).sort((a, b) => b.count - a.count)

  return (
    <div>
      <h1 className="text-4xl font-black mb-8">ანალიტიკა</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Eye className="text-blue-500" />} label="სულ ნახვები" value={totalViews} />
        <StatCard icon={<Users className="text-green-500" />} label="უნიკალური გვერდები" value={uniquePaths.length} />
        <StatCard icon={<TrendingUp className="text-red-500" />} label="ყველაზე პოპულარული" value={viewsByPath[0]?.path || "N/A"} />
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-6">ნახვები გვერდების მიხედვით</h2>
        <div className="space-y-4">
          {viewsByPath.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-800 rounded-2xl">
              <span className="font-mono text-zinc-400">{item.path}</span>
              <span className="font-bold text-xl">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 flex items-center gap-6">
      <div className="p-4 bg-zinc-800 rounded-2xl">{icon}</div>
      <div>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  )
}

// --- CULTURE PANEL ---
function CulturePanel({ posts, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-black">კულტურა & ბლოგი</h1>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold">
          <Plus /> ახალი პოსტი
        </button>
      </div>
      {editing && <CultureForm post={editing} onSave={onSave} onCancel={() => setEditing(null)} />}
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6 border border-zinc-800 hover:border-zinc-700 transition group">
            <img src={post.image_url || "/placeholder.jpg"} className="w-32 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-zinc-500 line-clamp-1">{post.description}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => setEditing(post)} className="p-3 bg-zinc-800 rounded-xl hover:text-blue-500"><Pencil /></button>
              <button onClick={() => onDelete(post.id)} className="p-3 bg-zinc-800 rounded-xl hover:text-red-500"><Trash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CultureForm({ post, onSave, onCancel }: any) {
  const [form, setForm] = useState(post || {})
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `blog-${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from("product-images").upload(fileName, file)
    if (error) alert(error.message)
    else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
      setForm({ ...form, image_url: data.publicUrl })
    }
    setUploading(false)
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-red-500">ბლოგ პოსტის რედაქტირება</h2>
      <div className="space-y-6">
        <input placeholder="სათაური" value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        <input placeholder="მოკლე აღწერა" value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        <textarea placeholder="პოსტის შინაარსი..." value={form.content || ""} onChange={e => setForm({...form, content: e.target.value})} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 h-64" />
        
        <div className="flex items-center gap-6 bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
          <div className="w-40 h-24 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700">
            {form.image_url ? <img src={form.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600"><Eye /></div>}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-2">ფონის სურათი</p>
            <label className="inline-flex items-center gap-2 bg-zinc-700 px-6 py-3 rounded-xl cursor-pointer hover:bg-zinc-600 transition font-bold">
              {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
              ატვირთვა
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <button onClick={() => { onSave(form); onCancel(); }} className="bg-red-600 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-red-700 transition"><Save /> შენახვა</button>
        <button onClick={onCancel} className="bg-zinc-800 px-10 py-4 rounded-2xl font-bold border border-zinc-700 hover:bg-zinc-700 transition">გაუქმება</button>
      </div>
    </div>
  )
}

// --- PRODUCT PANELS (WITH FIXED FIELDS) ---
function ProductsPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-black">პროდუქტები</h1>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold">
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
        <button onClick={() => setEditing({ isPreorder: true })} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold">
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

  const handleUpload = async (e: any) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setUploading(true)
    const newUrls = [...imageUrls]
    for (const file of files as File[]) {
      const fileName = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from("product-images").upload(fileName, file)
      if (!error) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
        newUrls.push(data.publicUrl)
      }
    }
    setImageUrls(newUrls)
    setUploading(false)
  }

  const handleSave = () => {
    const finalImages = imageUrls.join(",")
    onSave({ 
      ...form, 
      images: finalImages, 
      img: imageUrls[0] || "",
      isPreorder: isPreorder 
    })
    onCancel()
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-red-500">{isPreorder ? "პრი-ორდერის რედაქტირება" : "პროდუქტის რედაქტირება"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">სახელი</label>
          <input value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">ბრენდი</label>
          <input value={form.brand || ""} onChange={e => setForm({...form, brand: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">კატეგორია</label>
          <input value={form.cat || ""} onChange={e => setForm({...form, cat: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">სქესი</label>
          <select value={form.gender || "unisex"} onChange={e => setForm({...form, gender: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600">
            <option value="men">მამაკაცი</option>
            <option value="women">ქალი</option>
            <option value="unisex">Unisex</option>
            <option value="kids">ბავშვები</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">ზოგადი ფასი (საჩვენებლად)</label>
          <input value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">ზომები</label>
          <input value={form.sizes || ""} onChange={e => setForm({...form, sizes: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase">აღწერა (Description)</label>
        <textarea value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 h-32" />
      </div>

      {isPreorder && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-800/50 rounded-3xl border border-zinc-700">
          <div className="space-y-2">
            <label className="text-xs font-bold text-red-500 uppercase">პრი-ორდერ ფასი</label>
            <input type="number" value={form.preorderPrice || ""} onChange={e => setForm({...form, preorderPrice: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">ჩვეულებრივი ფასი</label>
            <input type="number" value={form.regularPrice || ""} onChange={e => setForm({...form, regularPrice: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">ჩამოსვლის თარიღი</label>
            <input value={form.expected_arrival || ""} onChange={e => setForm({...form, expected_arrival: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600" placeholder="მაგ: 15 მაისი" />
          </div>
        </div>
      )}

      <div className="mt-8">
        <label className="text-xs font-bold text-zinc-500 uppercase mb-4 block">ფოტოების გალერეა</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700 group">
              <img src={url} className="w-full h-full object-cover" />
              <button onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl cursor-pointer hover:border-red-600 hover:bg-zinc-800 transition">
            {uploading ? <Loader2 className="animate-spin" /> : <Plus className="w-8 h-8 text-zinc-500" />}
            <span className="text-xs mt-2 font-bold text-zinc-500">ატვირთვა</span>
            <input type="file" multiple className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button onClick={handleSave} className="bg-red-600 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-red-700 transition"><Save /> შენახვა</button>
        <button onClick={onCancel} className="bg-zinc-800 px-10 py-4 rounded-2xl font-bold border border-zinc-700 hover:bg-zinc-700 transition">გაუქმება</button>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: any) {
  return (
    <div className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition group border border-zinc-800">
      <img src={product.img || "/placeholder.jpg"} className="w-20 h-20 object-cover rounded-2xl" />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-red-500 font-bold">{product.brand} — {product.price}</p>
        <p className="text-sm text-zinc-500">კატეგორია: {product.cat} • {product.isPreorder ? "პრი-ორდერი" : "მარაგშია"}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => onEdit(product)} className="p-3 bg-zinc-800 rounded-xl hover:text-blue-500"><Pencil /></button>
        <button onClick={() => onDelete(product.id)} className="p-3 bg-zinc-800 rounded-xl hover:text-red-500"><Trash2 /></button>
      </div>
    </div>
  )
}
