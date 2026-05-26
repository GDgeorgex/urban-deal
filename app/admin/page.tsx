"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Package, Flame, Plus, Pencil, Trash2, LogOut, 
  BarChart3, BookOpen, Save, UploadCloud, Loader2,
  Users, Eye, TrendingUp, Layout
} from "lucide-react"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "udeal2025"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"products" | "preorders" | "cms" | "culture" | "analytics">("products")
  const [products, setProducts] = useState<any[]>([])
  const [cmsContent, setCmsContent] = useState<any[]>([])
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

    const { data: cData } = await supabase.from('site_content').select('*').order('section', { ascending: true })
    setCmsContent(cData || [])

    const { data: aData } = await supabase.from('site_analytics').select('*').order('created_at', { ascending: false })
    setAnalytics(aData || [])

    const { data: cultData } = await supabase.from('culture_posts').select('*').order('created_at', { ascending: false })
    setCulturePosts(cultData || [])
  }

  useEffect(() => {
    if (isLoggedIn) loadData()
  }, [isLoggedIn])

  const saveProduct = async (product: any) => {
    const { error } = await supabase.from('products').upsert(product)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ შენახულია!"); loadData(); }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from('products').delete().eq('id', id)
    loadData(); showMessage("წაიშალა");
  }

  const saveCms = async (item: any) => {
    const { error } = await supabase.from('site_content').upsert(item)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ კონტენტი განახლდა!"); loadData(); }
  }

  const saveCulture = async (post: any) => {
    const { error } = await supabase.from('culture_posts').upsert(post)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ პოსტი შენახულია!"); loadData(); }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 p-12 rounded-3xl w-full max-w-md text-center border border-zinc-800">
          <h1 className="text-red-600 text-5xl font-black mb-8">Urban Deal</h1>
          <h2 className="text-3xl mb-8 font-bold text-white">ადმინ პანელი</h2>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && (password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true))}
            placeholder="პაროლი" 
            className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center text-xl border border-zinc-700 text-white outline-none focus:border-red-600" 
          />
          <button onClick={() => password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true)} className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold hover:bg-red-700 transition text-white">შესვლა</button>
          {error && <p className="text-red-500 mt-4 font-medium">არასწორი პაროლი</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {saveMessage && <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50 shadow-2xl animate-bounce">{saveMessage}</div>}

      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-2xl inline-block">Urban Deal</div>
        </div>
        <nav className="space-y-2 flex-1">
          <TabButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={<Package />} label="პროდუქტები" />
          <TabButton active={activeTab === "preorders"} onClick={() => setActiveTab("preorders")} icon={<Flame />} label="პრი-ორდერები" />
          <TabButton active={activeTab === "cms"} onClick={() => setActiveTab("cms")} icon={<Layout />} label="საიტის კონტენტი" />
          <TabButton active={activeTab === "culture"} onClick={() => setActiveTab("culture")} icon={<BookOpen />} label="კულტურა" />
          <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<BarChart3 />} label="ანალიტიკა" />
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 text-zinc-500 hover:text-red-500 transition font-bold">
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <PreordersPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "cms" && <CmsPanel content={cmsContent} onSave={saveCms} />}
        {activeTab === "culture" && <CulturePanel posts={culturePosts} onSave={saveCulture} onDelete={(id: any) => { if(confirm("წაშლა?")) supabase.from('culture_posts').delete().eq('id', id).then(loadData) }} />}
        {activeTab === "analytics" && <AnalyticsPanel data={analytics} />}
      </main>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition font-bold ${active ? "bg-red-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}>
      {icon} {label}
    </button>
  )
}

// --- CMS PANEL ---
function CmsPanel({ content, onSave }: any) {
  const sections = Array.from(new Set(content.map((c: any) => c.section)))
  return (
    <div>
      <h1 className="text-4xl font-black mb-8 text-white">საიტის კონტენტი (CMS)</h1>
      <div className="space-y-12">
        {sections.map(section => (
          <div key={section as string} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-red-500 border-b border-zinc-800 pb-4">{section as string}</h2>
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
    if (!error) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
      setVal(data.publicUrl)
      onSave({ ...item, value: data.publicUrl })
    }
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-zinc-500 uppercase">{item.label}</label>
      <div className="flex gap-4">
        {item.content_type === 'text' ? (
          <input value={val} onChange={e => setVal(e.target.value)} onBlur={() => onSave({ ...item, value: val })} className="flex-1 bg-zinc-800 p-4 rounded-xl border border-zinc-700 outline-none focus:border-red-600 text-white" />
        ) : (
          <div className="flex-1 flex gap-4 items-center">
            <img src={val} className="w-20 h-20 object-cover rounded-xl border border-zinc-700" />
            <input value={val} onChange={e => setVal(e.target.value)} onBlur={() => onSave({ ...item, value: val })} className="flex-1 bg-zinc-800 p-4 rounded-xl border border-zinc-700 outline-none focus:border-red-600 text-white" />
            <label className="bg-zinc-700 px-4 py-4 rounded-xl cursor-pointer hover:bg-zinc-600">
              {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

// --- PRODUCT PANEL (FIXED FIELDS) ---
function ProductForm({ product, onSave, onCancel, isPreorder = false }: any) {
  const [form, setForm] = useState(product || { cat: "sneakers", gender: "unisex" })
  const [imageUrls, setImageUrls] = useState<string[]>((product?.images || "").split(",").filter(Boolean))
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: any) => {
    const files = Array.from(e.target.files)
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
    setImageUrls(newUrls); setUploading(false);
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-8 text-red-500">{isPreorder ? "პრი-ორდერი" : "პროდუქტი"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input placeholder="სახელი" value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
        <input placeholder="ბრენდი" value={form.brand || ""} onChange={e => setForm({...form, brand: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
        <input placeholder="კატეგორია" value={form.cat || ""} onChange={e => setForm({...form, cat: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
        <select value={form.gender || "unisex"} onChange={e => setForm({...form, gender: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white">
          <option value="men">მამაკაცი</option><option value="women">ქალი</option><option value="unisex">Unisex</option>
        </select>
        <input placeholder="ფასი" value={form.price || ""} onChange={e => setForm({...form, price: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
        <input placeholder="ზომები" value={form.sizes || ""} onChange={e => setForm({...form, sizes: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
      </div>
      <textarea placeholder="აღწერა (Description)" value={form.description || ""} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white mt-6 h-32" />
      
      {isPreorder && (
        <div className="grid grid-cols-3 gap-6 mt-6 p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700">
          <input placeholder="პრი-ორდერ ფასი" value={form.preorderPrice || ""} onChange={e => setForm({...form, preorderPrice: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
          <input placeholder="ჩვეულებრივი ფასი" value={form.regularPrice || ""} onChange={e => setForm({...form, regularPrice: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
          <input placeholder="თარიღი" value={form.expected_arrival || ""} onChange={e => setForm({...form, expected_arrival: e.target.value})} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-white" />
        </div>
      )}

      <div className="mt-8">
        <div className="grid grid-cols-5 gap-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-700 group">
              <img src={url} className="w-full h-full object-cover" />
              <button onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-600 p-1 rounded-lg opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-red-600">
            {uploading ? <Loader2 className="animate-spin" /> : <Plus />}
            <input type="file" multiple className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <button onClick={() => onSave({...form, images: imageUrls.join(","), img: imageUrls[0] || "", isPreorder: isPreorder})} className="bg-red-600 px-10 py-4 rounded-xl font-bold text-white">შენახვა</button>
        <button onClick={onCancel} className="bg-zinc-800 px-10 py-4 rounded-xl font-bold text-white">გაუქმება</button>
      </div>
    </div>
  )
}

// --- OTHER PANELS (SIMPLE VERSIONS) ---
function ProductsPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8"><h1 className="text-4xl font-black text-white">პროდუქტები</h1><button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-xl font-bold text-white">+ ახალი</button></div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} />}
      <div className="space-y-4">{products.filter((p: any) => !p.isPreorder).map((p: any) => <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />)}</div>
    </div>
  )
}

function PreordersPanel({ products, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8"><h1 className="text-4xl font-black text-white">პრი-ორდერები</h1><button onClick={() => setEditing({isPreorder:true})} className="bg-red-600 px-6 py-3 rounded-xl font-bold text-white">+ ახალი</button></div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} isPreorder />}
      <div className="space-y-4">{products.filter((p: any) => p.isPreorder).map((p: any) => <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />)}</div>
    </div>
  )
}

function CulturePanel({ posts, onSave, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between mb-8"><h1 className="text-4xl font-black text-white">კულტურა</h1><button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-xl font-bold text-white">+ ახალი პოსტი</button></div>
      {editing && <CultureForm post={editing} onSave={(p: any) => { onSave(p); setEditing(null); }} onCancel={() => setEditing(null)} />}
      <div className="grid grid-cols-1 gap-4">{posts.map((post: any) => <div key={post.id} className="bg-zinc-900 p-4 rounded-xl flex items-center gap-4 border border-zinc-800">
        <img src={post.image_url} className="w-20 h-12 object-cover rounded-lg" />
        <div className="flex-1 font-bold text-white">{post.title}</div>
        <button onClick={() => setEditing(post)} className="text-blue-500"><Pencil /></button>
        <button onClick={() => onDelete(post.id)} className="text-red-500"><Trash2 /></button>
      </div>)}</div>
    </div>
  )
}

function CultureForm({ post, onSave, onCancel }: any) {
  const [form, setForm] = useState(post || {})
  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800">
      <input placeholder="სათაური" value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-xl mb-4 text-white" />
      <textarea placeholder="შინაარსი" value={form.content || ""} onChange={e => setForm({...form, content: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-xl mb-4 h-40 text-white" />
      <input placeholder="სურათის URL" value={form.image_url || ""} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full bg-zinc-800 p-4 rounded-xl mb-4 text-white" />
      <div className="flex gap-4"><button onClick={() => onSave(form)} className="bg-red-600 px-8 py-3 rounded-xl font-bold text-white">შენახვა</button><button onClick={onCancel} className="bg-zinc-800 px-8 py-3 rounded-xl font-bold text-white">გაუქმება</button></div>
    </div>
  )
}

function AnalyticsPanel({ data }: any) {
  return (
    <div>
      <h1 className="text-4xl font-black mb-8 text-white">ანალიტიკა</h1>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800"><p className="text-zinc-500 font-bold">ნახვები</p><p className="text-4xl font-black text-white">{data.length}</p></div>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl flex items-center gap-4 border border-zinc-800 group">
      <img src={product.img} className="w-16 h-16 object-cover rounded-lg" />
      <div className="flex-1"><h3 className="font-bold text-white">{product.name}</h3><p className="text-red-500 text-sm">{product.price}</p></div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100"><button onClick={() => onEdit(product)} className="text-blue-500"><Pencil /></button><button onClick={() => onDelete(product.id)} className="text-red-500"><Trash2 /></button></div>
    </div>
  )
}
