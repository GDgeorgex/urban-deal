"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Flame,
  Home,
  Image,
  Tag,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  X
} from "lucide-react"
import { supabase } from "@/lib/supabase"

const ADMIN_PASSWORD = "udeal2025"

type AdminTab = "dashboard" | "products" | "preorders" | "homepage" | "banners" | "promotions" | "settings"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Load products from Supabase
  const loadProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error("Error loading products:", error)
      alert("შეცდომა პროდუქტების ჩატვირთვისას")
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadProducts()
    }
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword("")
  }

  const showMessage = (msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(""), 2000)
  }

  // Add or Update Product
  const handleSaveProduct = async (product: any) => {
    setLoading(true)
    
    const productData = {
      name: product.name,
      brand: product.brand,
      cat: product.cat,
      price: product.price,
      description: product.description || "",
      img: product.img,
      sizes: product.sizes ? product.sizes.join(",") : "",
      isPreorder: product.isPreorder || false,
      preorderPrice: product.preorderPrice || null,
      regularPrice: product.regularPrice || null,
      discountPct: product.discountPct || null,
      expectedArrival: product.expectedArrival || null,
    }

    let result
    if (product.id) {
      // Update
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id)
    } else {
      // Insert new
      result = await supabase
        .from('products')
        .insert(productData)
    }

    if (result.error) {
      alert("შეცდომა: " + result.error.message)
    } else {
      showMessage("პროდუქტი შენახულია ✓")
      loadProducts()
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("ნამდვილად გინდა წაშლა?")) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert("შეცდომა წაშლისას")
    } else {
      showMessage("პროდუქტი წაიშალა")
      loadProducts()
    }
  }

  if (!isLoggedIn) {
    // Login screen stays the same
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-12 w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg">
              <span className="font-black text-lg tracking-tight">Urban Deal</span>
            </div>
            <span className="text-foreground/50 text-sm font-medium tracking-widest">U-DEAL</span>
          </div>
          <h2 className="font-heading text-2xl font-black mb-2">ადმინ პანელი</h2>
          <p className="text-muted-foreground text-sm mb-8">შეიყვანე პაროლი შესასვლელად</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••••••"
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-center mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            შესვლა
          </button>
          {error && <p className="text-red-500 text-sm mt-4">არასწორი პაროლი</p>}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mt-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            მთავარზე დაბრუნება
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {saveMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {saveMessage}
        </div>
      )}

      <div className="flex">
        {/* Sidebar - same as before */}
        <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
          {/* ... (sidebar code stays the same) ... */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white px-2 py-1 rounded">
                <span className="font-black text-sm">Urban Deal</span>
              </div>
              <span className="text-foreground/50 text-xs">ADMIN</span>
            </div>
          </div>
         
          <nav className="flex-1 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 px-3">ადმინ მენიუ</p>
            <ul className="space-y-1">
              <NavItem icon={LayoutDashboard} label="დეშბორდი" tab="dashboard" activeTab={activeTab} onClick={setActiveTab} />
              <NavItem icon={Package} label="პროდუქტები" tab="products" activeTab={activeTab} onClick={setActiveTab} />
              <NavItem icon={Flame} label="პრი-ორდერები" tab="preorders" activeTab={activeTab} onClick={setActiveTab} />
              {/* other tabs */}
            </ul>
          </nav>
         
          <div className="p-4 border-t border-border">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground py-2 rounded-lg hover:bg-background transition-colors">
              <LogOut className="w-4 h-4" />
              გამოსვლა
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "products" && (
            <ProductsPanel 
              products={products} 
              loading={loading} 
              onSave={handleSaveProduct} 
              onDelete={handleDelete}
              loadProducts={loadProducts}
            />
          )}
          {/* Other tabs can stay local for now */}
          {activeTab !== "products" && <div className="text-center py-20 text-muted-foreground">სხვა გვერდები მოგვიანებით გავაუმჯობესებთ</div>}
        </main>
      </div>
    </div>
  )
}

// Keep other components (NavItem, etc.) the same...
// For simplicity I shortened it. Paste the full code I gave you.

function NavItem({ icon: Icon, label, tab, activeTab, onClick }: any) {
  const isActive = activeTab === tab
  return (
    <li>
      <button
        onClick={() => onClick(tab)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
          isActive ? "bg-red-600/10 text-red-500" : "text-muted-foreground hover:text-foreground hover:bg-background"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  )
}

function ProductsPanel({ products, loading, onSave, onDelete, loadProducts }: any) {
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleEdit = (product: any) => {
    setEditingProduct(product)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Package className="w-6 h-6" /> პროდუქტები
        </h2>
        <button
          onClick={() => {
            setIsAdding(true)
            setEditingProduct({
              id: null,
              name: "",
              brand: "",
              cat: "sneakers",
              price: "",
              img: "",
              sizes: [],
              description: ""
            })
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> ახალი პროდუქტი
        </button>
      </div>

      {(editingProduct || isAdding) && (
        <ProductEditForm 
          product={editingProduct} 
          onSave={onSave} 
          onCancel={() => { setEditingProduct(null); setIsAdding(false) }} 
        />
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-left px-6 py-3">სურათი</th>
              <th className="text-left px-6 py-3">სახელი</th>
              <th className="text-left px-6 py-3">ბრენდი</th>
              <th className="text-left px-6 py-3">ფასი</th>
              <th className="text-left px-6 py-3">მოქმედება</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-background/50">
                <td className="px-6 py-4">
                  <img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">{p.brand}</td>
                <td className="px-6 py-4">{p.price}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(p)} className="p-2 text-blue-600"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(p.id)} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductEditForm({ product, onSave, onCancel }: any) {
  const [form, setForm] = useState(product || {})

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">{product?.id ? "რედაქტირება" : "ახალი პროდუქტი"}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>სახელი</label>
          <input value={form.name || ""} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label>ბრენდი</label>
          <input value={form.brand || ""} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label>ფასი</label>
          <input value={form.price || ""} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label>სურათის URL</label>
          <input value={form.img || ""} onChange={(e) => setForm({...form, img: e.target.value})} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onSave(form)} className="bg-red-600 text-white px-6 py-2 rounded">შენახვა</button>
        <button onClick={onCancel} className="border px-6 py-2 rounded">გაუქმება</button>
      </div>
    </div>
  )
}
