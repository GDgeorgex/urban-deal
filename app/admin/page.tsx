"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import {
  Package, Flame, Plus, Pencil, Trash2, LogOut,
  Settings, BarChart3, BookOpen, Save, UploadCloud,
  Loader2, Users, Eye, TrendingUp
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
    setTimeout(() => setSaveMessage(""), 2500)
  }

  const loadData = async () => {
    const { data: pData } = await supabase.from("products").select("*").order("id", { ascending: false })
    setProducts(pData || [])
    const { data: cData } = await supabase.from("site_content").select("*").order("section", { ascending: true })
    setCmsContent(cData || [])
    const { data: aData } = await supabase.from("site_analytics").select("*").order("created_at", { ascending: false })
    setAnalytics(aData || [])
    const { data: bData } = await supabase.from("culture_posts").select("*").order("created_at", { ascending: false })
    setCulturePosts(bData || [])
  }

  useEffect(() => { if (isLoggedIn) loadData() }, [isLoggedIn])

  const saveProduct = async (product: any) => {
    const { error } = await supabase.from("products").upsert(product)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ შენახულია!"); loadData() }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from("products").delete().eq("id", id)
    loadData(); showMessage("წაიშალა")
  }

  const saveCmsItem = async (item: any) => {
    const { error } = await supabase.from("site_content").upsert(item)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ კონტენტი განახლდა!"); loadData() }
  }

  const saveCulturePost = async (post: any) => {
    const { error } = await supabase.from("culture_posts").upsert(post)
    if (error) alert("შეცდომა: " + error.message)
    else { showMessage("✅ პოსტი შენახულია!"); loadData() }
  }

  const deleteCulturePost = async (id: number) => {
    if (!confirm("წაშლა?")) return
    await supabase.from("culture_posts").delete().eq("id", id)
    loadData(); showMessage("პოსტი წაიშალა")
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
            onKeyDown={e => e.key === "Enter" && (password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true))}
            placeholder="პაროლი"
            className="w-full p-5 bg-zinc-800 rounded-2xl mb-6 text-center text-xl border border-zinc-700 focus:border-red-600 outline-none"
          />
          <button
            onClick={() => password === ADMIN_PASSWORD ? setIsLoggedIn(true) : setError(true)}
            className="w-full bg-red-600 py-5 rounded-2xl text-xl font-bold hover:bg-red-700 transition"
          >შესვლა</button>
          {error && <p className="text-red-500 mt-4 font-medium">არასწორი პაროლი</p>}
          <p className="text-zinc-600 mt-8 text-xs leading-relaxed">
            პაროლის შეცვლა: Vercel → Settings → Environment Variables → NEXT_PUBLIC_ADMIN_PASSWORD
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {saveMessage && (
        <div className="fixed top-6 right-6 bg-green-600 px-8 py-4 rounded-2xl z-50 shadow-2xl font-bold">
          {saveMessage}
        </div>
      )}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="mb-10">
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black text-2xl inline-block">
            Urban Deal
          </div>
        </div>
        <nav className="space-y-2 flex-1">
          <TabButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={<Package />} label="პროდუქტები" />
          <TabButton active={activeTab === "preorders"} onClick={() => setActiveTab("preorders")} icon={<Flame />} label="პრი-ორდერები" />
          <TabButton active={activeTab === "cms"} onClick={() => setActiveTab("cms")} icon={<Settings />} label="საიტის კონტენტი" />
          <TabButton active={activeTab === "culture"} onClick={() => setActiveTab("culture")} icon={<BookOpen />} label="კულტურა / ბლოგი" />
          <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<BarChart3 />} label="ანალიტიკა" />
        </nav>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-auto flex items-center gap-3 text-zinc-500 hover:text-red-500 transition font-bold pt-6 border-t border-zinc-800"
        >
          <LogOut className="w-5 h-5" /> გამოსვლა
        </button>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "products" && <ProductsPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "preorders" && <PreordersPanel products={products} onSave={saveProduct} onDelete={deleteProduct} />}
        {activeTab === "cms" && <CmsPanel content={cmsContent} onSave={saveCmsItem} />}
        {activeTab === "culture" && <CulturePanel posts={culturePosts} onSave={saveCulturePost} onDelete={deleteCulturePost} />}
        {activeTab === "analytics" && <AnalyticsPanel data={analytics} products={products} />}
      </main>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition font-bold ${
        active ? "bg-red-600 text-white shadow-lg" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {icon} {label}
    </button>
  )
}

// ── CMS PANEL ─────────────────────────────────────────────────
function CmsPanel({ content, onSave }: { content: any[]; onSave: (item: any) => void }) {
  const sections: string[] = Array.from(new Set(content.map((c: any) => c.section)))
  return (
    <div>
      <h1 className="text-4xl font-black mb-2">საიტის კონტენტი (CMS)</h1>
      <p className="text-zinc-500 mb-10">შეცვალე ტექსტები, სათაურები და სურათები პირდაპირ ამ გვერდიდან.</p>
      {sections.length === 0 && (
        <div className="bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-800 text-zinc-500">
          <p className="text-lg">კონტენტი ვერ მოიძებნა.</p>
          <p className="text-sm mt-2">დარწმუნდი, რომ site_content ცხრილი Supabase-ში შევსებულია.</p>
        </div>
      )}
      <div className="space-y-12">
        {sections.map((section: string) => (
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

function CmsItem({ item, onSave }: { item: any; onSave: (item: any) => void }) {
  const [val, setVal] = useState(item.value)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
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
        {item.content_type === "text" ? (
          <textarea
            value={val}
            onChange={e => setVal(e.target.value)}
            className="flex-1 bg-zinc-800 p-4 rounded-2xl border border-zinc-700 focus:border-red-500 outline-none h-24 resize-none"
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
              {val && <img src={val} className="w-32 h-20 object-cover rounded-xl border border-zinc-700" alt="" />}
              <label className="bg-zinc-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2 text-sm font-bold transition">
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
          title="შენახვა"
        >
          <Save className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

// ── ANALYTICS PANEL ───────────────────────────────────────────
function AnalyticsPanel({ data, products }: { data: any[]; products: any[] }) {
  const totalViews = data.length
  const uniquePaths: string[] = Array.from(new Set(data.map((d: any) => d.page_path)))
  const viewsByPath = uniquePaths
    .map(path => ({ path, count: data.filter((d: any) => d.page_path === path).length }))
    .sort((a, b) => b.count - a.count)

  const today = new Date()
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (13 - i))
    const dateStr = d.toISOString().split("T")[0]
    return { date: dateStr, count: data.filter((x: any) => (x.created_at || "").startsWith(dateStr)).length }
  })
  const maxCount = Math.max(...last14.map(d => d.count), 1)

  return (
    <div>
      <h1 className="text-4xl font-black mb-2">ანალიტიკა</h1>
      <p className="text-zinc-500 mb-10">ვიზიტორების სტატისტიკა და ტენდენციები.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Eye className="text-blue-400" />} label="სულ ნახვები" value={String(totalViews)} />
        <StatCard icon={<Users className="text-green-400" />} label="გვერდები ნახული" value={String(uniquePaths.length)} />
        <StatCard icon={<TrendingUp className="text-red-500" />} label="ყველაზე პოპულარული" value={viewsByPath[0]?.path || "—"} />
      </div>
      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 mb-8">
        <h2 className="text-2xl font-bold mb-6">ბოლო 14 დღე</h2>
        <div className="flex items-end gap-2 h-40">
          {last14.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-red-600 rounded-t-lg transition-all"
                style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count > 0 ? "4px" : "0px" }}
                title={`${d.date}: ${d.count}`}
              />
              <span className="text-zinc-600 text-xs">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
        <h2 className="text-2xl font-bold mb-6">ნახვები გვერდების მიხედვით</h2>
        {viewsByPath.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">მონაცემები ჯერ არ არის. site_analytics ცხრილი უნდა შეიქმნას Supabase-ში.</p>
        ) : (
          <div className="space-y-3">
            {viewsByPath.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-800 rounded-2xl">
                <span className="font-mono text-zinc-300">{item.path}</span>
                <span className="font-black text-xl text-white">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 flex items-center gap-6 hover:border-zinc-700 transition">
      <div className="p-4 bg-zinc-800 rounded-2xl">{icon}</div>
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-black truncate max-w-xs">{value}</p>
      </div>
    </div>
  )
}

// ── CULTURE PANEL ─────────────────────────────────────────────
function CulturePanel({ posts, onSave, onDelete }: { posts: any[]; onSave: (p: any) => void; onDelete: (id: number) => void }) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-black">კულტურა & ბლოგი</h1>
          <p className="text-zinc-500 mt-1">დაამატე, შეცვალე ან წაშალე სტილის სტატიები.</p>
        </div>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-red-700 transition">
          <Plus /> ახალი პოსტი
        </button>
      </div>
      {editing && <CultureForm post={editing} onSave={onSave} onCancel={() => setEditing(null)} />}
      <div className="grid grid-cols-1 gap-6">
        {posts.length === 0 && !editing && (
          <div className="bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-800 text-zinc-500">
            <p className="text-lg">პოსტები ჯერ არ დამატებულა.</p>
          </div>
        )}
        {posts.map((post: any) => (
          <div key={post.id} className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6 border border-zinc-800 hover:border-zinc-700 transition group">
            <div className="w-32 h-20 rounded-xl overflow-hidden border border-zinc-700 flex-shrink-0 bg-zinc-800">
              {post.image_url
                ? <img src={post.image_url} className="w-full h-full object-cover" alt="" />
                : <div className="w-full h-full flex items-center justify-center text-zinc-600"><Eye /></div>
              }
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold truncate">{post.title}</h3>
              <p className="text-zinc-500 text-sm line-clamp-1 mt-1">{post.description}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
              <button onClick={() => setEditing(post)} className="p-3 bg-zinc-800 rounded-xl hover:text-blue-400 transition"><Pencil /></button>
              <button onClick={() => onDelete(post.id)} className="p-3 bg-zinc-800 rounded-xl hover:text-red-500 transition"><Trash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CultureForm({ post, onSave, onCancel }: { post: any; onSave: (p: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState(post || {})
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
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
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">სათაური</label>
          <input value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 text-white" placeholder="მაგ: Jordan 1-ის ისტორია" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">მოკლე აღწერა</label>
          <input value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 text-white" placeholder="ერთი-ორი წინადადება..." />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">სრული შინაარსი</label>
          <textarea value={form.content || ""} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 h-64 resize-y text-white" placeholder="პოსტის სრული ტექსტი..." />
        </div>
        <div className="flex items-center gap-6 bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
          <div className="w-40 h-24 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 flex-shrink-0">
            {form.image_url
              ? <img src={form.image_url} className="w-full h-full object-cover" alt="" />
              : <div className="w-full h-full flex items-center justify-center text-zinc-600"><Eye /></div>
            }
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-1">სურათი</p>
            <label className="inline-flex items-center gap-2 bg-zinc-700 px-6 py-3 rounded-xl cursor-pointer hover:bg-zinc-600 transition font-bold">
              {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
              ატვირთვა
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
            {form.image_url && (
              <button onClick={() => setForm({ ...form, image_url: "" })} className="ml-3 text-xs text-red-500 hover:text-red-400 underline">
                წაშლა
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <button onClick={() => { onSave(form); onCancel() }} className="bg-red-600 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition">
          <Save /> შენახვა
        </button>
        <button onClick={onCancel} className="bg-zinc-800 px-10 py-4 rounded-2xl font-bold border border-zinc-700 hover:bg-zinc-700 transition">
          გაუქმება
        </button>
      </div>
    </div>
  )
}

// ── PRODUCTS PANEL ────────────────────────────────────────────
function ProductsPanel({ products, onSave, onDelete }: { products: any[]; onSave: (p: any) => void; onDelete: (id: number) => void }) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">პროდუქტები</h1>
        <button onClick={() => setEditing({})} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-red-700 transition">
          <Plus /> ახალი პროდუქტი
        </button>
      </div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} />}
      <div className="space-y-4">
        {products.filter((p: any) => !p.isPreorder).map((p: any) => (
          <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />
        ))}
        {products.filter((p: any) => !p.isPreorder).length === 0 && !editing && (
          <div className="text-center py-16 text-zinc-500">პროდუქტები ჯერ არ დამატებულა.</div>
        )}
      </div>
    </div>
  )
}

function PreordersPanel({ products, onSave, onDelete }: { products: any[]; onSave: (p: any) => void; onDelete: (id: number) => void }) {
  const [editing, setEditing] = useState<any>(null)
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black flex items-center gap-3">
          <Flame className="text-orange-500" /> პრი-ორდერები
        </h1>
        <button onClick={() => setEditing({ isPreorder: true })} className="bg-red-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-red-700 transition">
          <Plus /> ახალი პრი-ორდერი
        </button>
      </div>
      {editing && <ProductForm product={editing} onSave={onSave} onCancel={() => setEditing(null)} isPreorder />}
      <div className="space-y-4">
        {products.filter((p: any) => p.isPreorder).map((p: any) => (
          <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={onDelete} />
        ))}
        {products.filter((p: any) => p.isPreorder).length === 0 && !editing && (
          <div className="text-center py-16 text-zinc-500">პრი-ორდერ პროდუქტები ჯერ არ დამატებულა.</div>
        )}
      </div>
    </div>
  )
}

const inputCls = "w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 outline-none focus:border-red-600 text-white text-sm"

function ProductForm({ product, onSave, onCancel, isPreorder = false }: {
  product: any; onSave: (p: any) => void; onCancel: () => void; isPreorder?: boolean
}) {
  const [form, setForm] = useState<any>(product || { cat: "sneakers", gender: "unisex" })
  const [imageUrls, setImageUrls] = useState<string[]>(
    (product?.images || "").split(",").filter(Boolean)
  )
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    const newUrls = [...imageUrls]
    for (const file of files) {
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
    onSave({ ...form, images: imageUrls.join(","), img: imageUrls[0] || "", isPreorder })
    onCancel()
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mb-10 border border-zinc-800 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-red-500">
        {isPreorder ? "პრი-ორდერის რედაქტირება" : "პროდუქტის რედაქტირება"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">სახელი</label>
          <input value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ბრენდი</label>
          <input value={form.brand || ""} onChange={e => setForm({ ...form, brand: e.target.value })} className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">კატეგორია</label>
          <input value={form.cat || ""} onChange={e => setForm({ ...form, cat: e.target.value })} className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">სქესი</label>
          <select value={form.gender || "unisex"} onChange={e => setForm({ ...form, gender: e.target.value })} className={inputCls}>
            <option value="men">მამაკაცი</option>
            <option value="women">ქალი</option>
            <option value="unisex">Unisex</option>
            <option value="kids">ბავშვები</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ზოგადი ფასი</label>
          <input value={form.price || ""} onChange={e => setForm({ ...form, price: e.target.value })} className={inputCls} placeholder="₾650" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ზომები (მძიმით)</label>
          <input value={form.sizes || ""} onChange={e => setForm({ ...form, sizes: e.target.value })} className={inputCls} placeholder="40, 41, 42, 43" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">აღწერა (Description)</label>
        <textarea value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inputCls} h-28 resize-none`} placeholder="პროდუქტის აღწერა..." />
      </div>

      {isPreorder && (
        <div className="mt-6 p-6 bg-zinc-800/50 rounded-3xl border border-zinc-700">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">🔥 პრი-ორდერის ველები</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">პრი-ორდერ ფასი</label>
              <input type="number" value={form.preorderPrice || ""} onChange={e => setForm({ ...form, preorderPrice: e.target.value })} className={inputCls} placeholder="520" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ჩვეულებრივი ფასი</label>
              <input type="number" value={form.regularPrice || ""} onChange={e => setForm({ ...form, regularPrice: e.target.value })} className={inputCls} placeholder="650" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">ჩამოსვლის თარიღი</label>
              <input value={form.expected_arrival || ""} onChange={e => setForm({ ...form, expected_arrival: e.target.value })} className={inputCls} placeholder="მაგ: 15 მაისი" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-4">ფოტოების გალერეა</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700 group">
              <img src={url} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl cursor-pointer hover:border-red-600 hover:bg-zinc-800 transition">
            {uploading ? <Loader2 className="animate-spin text-zinc-400" /> : <Plus className="w-8 h-8 text-zinc-500" />}
            <span className="text-xs mt-2 font-bold text-zinc-500">ატვირთვა</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button onClick={handleSave} className="bg-red-600 px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition">
          <Save /> შენახვა
        </button>
        <button onClick={onCancel} className="bg-zinc-800 px-10 py-4 rounded-2xl font-bold border border-zinc-700 hover:bg-zinc-700 transition">
          გაუქმება
        </button>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }: { product: any; onEdit: (p: any) => void; onDelete: (id: number) => void }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-6 hover:bg-zinc-800 transition group border border-zinc-800">
      <img src={product.img || "/placeholder.jpg"} className="w-20 h-20 object-cover rounded-2xl flex-shrink-0 bg-zinc-800" alt="" />
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold truncate">{product.name}</h3>
        <p className="text-red-500 font-bold text-sm">{product.brand} — {product.price}</p>
        <p className="text-zinc-500 text-xs mt-1">
          {product.cat} • {product.gender || "unisex"} •{" "}
          {product.isPreorder
            ? <span className="text-orange-400 font-bold">პრი-ორდერი</span>
            : <span className="text-green-400">მარაგშია</span>
          }
        </p>
        {product.description && <p className="text-zinc-600 text-xs mt-1 line-clamp-1">{product.description}</p>}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
        <button onClick={() => onEdit(product)} className="p-3 bg-zinc-800 rounded-xl hover:text-blue-400 transition"><Pencil /></button>
        <button onClick={() => onDelete(product.id)} className="p-3 bg-zinc-800 rounded-xl hover:text-red-500 transition"><Trash2 /></button>
      </div>
    </div>
  )
}
