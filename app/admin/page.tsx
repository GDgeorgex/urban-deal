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
import { PRODUCTS, type Product } from "@/lib/products"

const ADMIN_PASSWORD = "udeal2025"
const STORAGE_KEY = "urbandeal_admin_data"

type AdminTab = "dashboard" | "products" | "preorders" | "homepage" | "banners" | "promotions" | "settings"

interface AdminData {
  products: Product[]
  homepage: {
    title1: string
    title2: string
    subtitle: string
    badge: string
    cta1: string
  }
  preorderBanner: {
    mainText: string
    subText: string
  }
  banners: {
    heroImage: string
    heroLink: string
    heroActive: boolean
  }
  promotions: Array<{
    id: string
    name: string
    discount: string
    endDate: string
    status: "active" | "pending" | "expired"
  }>
  settings: {
    siteName: string
    phone: string
    email: string
    city: string
    instagram: string
    facebook: string
    tiktok: string
    whatsapp: string
  }
}

const defaultData: AdminData = {
  products: PRODUCTS,
  homepage: {
    title1: "URBAN",
    title2: "DEAL",
    subtitle: "ევროპული სნიკერები — პირდაპირ თბილისში. ორიგინალი. პრემიუმ. შენთვის.",
    badge: "ახალი კოლექცია 2025",
    cta1: "კოლექცია →"
  },
  preorderBanner: {
    mainText: "პრი-ორდერი გახსნილია!",
    subText: "დაჯავშნე სადეზირო სნიკერი ევროპიდან — 20%-ით იაფად"
  },
  banners: {
    heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    heroLink: "/products",
    heroActive: true
  },
  promotions: [
    { id: "1", name: "პრი-ორდერ 20%", discount: "20%", endDate: "მიმდინარე", status: "active" },
    { id: "2", name: "გაზაფხული 2025", discount: "15%", endDate: "2025-06-30", status: "pending" }
  ],
  settings: {
    siteName: "Urban Deal",
    phone: "+995 592 01 36 11",
    email: "shop.udeal@gmail.com",
    city: "თბილისი, საქართველო",
    instagram: "https://instagram.com/urbandeal_",
    facebook: "https://www.facebook.com/profile.php?id=61577061391179",
    tiktok: "https://tiktok.com/@urabandeal",
    whatsapp: "995592013611"
  }
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [data, setData] = useState<AdminData>(defaultData)
  const [saveMessage, setSaveMessage] = useState("")

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setData({ ...defaultData, ...parsed })
      } catch (e) {
        console.error("Error loading admin data:", e)
      }
    }
  }, [])

  // Save data to localStorage
  const saveData = (newData: AdminData) => {
    setData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setSaveMessage("შენახულია!")
    setTimeout(() => setSaveMessage(""), 2000)
  }

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

  if (!isLoggedIn) {
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
          {error && (
            <p className="text-red-500 text-sm mt-4">არასწორი პაროლი</p>
          )}
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
      {/* Save notification */}
      {saveMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {saveMessage}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
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
              <NavItem icon={Home} label="მთავარი გვერდი" tab="homepage" activeTab={activeTab} onClick={setActiveTab} />
              <NavItem icon={Image} label="ბანერები" tab="banners" activeTab={activeTab} onClick={setActiveTab} />
              <NavItem icon={Tag} label="პრომოქციები" tab="promotions" activeTab={activeTab} onClick={setActiveTab} />
              <NavItem icon={Settings} label="პარამეტრები" tab="settings" activeTab={activeTab} onClick={setActiveTab} />
            </ul>
          </nav>
          
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground py-2 rounded-lg hover:bg-background transition-colors"
            >
              <LogOut className="w-4 h-4" />
              გამოსვლა
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && <DashboardPanel data={data} />}
          {activeTab === "products" && <ProductsPanel data={data} saveData={saveData} />}
          {activeTab === "preorders" && <PreordersPanel data={data} saveData={saveData} />}
          {activeTab === "homepage" && <HomepagePanel data={data} saveData={saveData} />}
          {activeTab === "banners" && <BannersPanel data={data} saveData={saveData} />}
          {activeTab === "promotions" && <PromotionsPanel data={data} saveData={saveData} />}
          {activeTab === "settings" && <SettingsPanel data={data} saveData={saveData} />}
        </main>
      </div>
    </div>
  )
}

function NavItem({ 
  icon: Icon, 
  label, 
  tab, 
  activeTab, 
  onClick 
}: { 
  icon: React.ElementType
  label: string
  tab: AdminTab
  activeTab: AdminTab
  onClick: (tab: AdminTab) => void 
}) {
  const isActive = activeTab === tab
  return (
    <li>
      <button
        onClick={() => onClick(tab)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
          isActive 
            ? "bg-red-600/10 text-red-500" 
            : "text-muted-foreground hover:text-foreground hover:bg-background"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  )
}

function DashboardPanel({ data }: { data: AdminData }) {
  const regularProducts = data.products.filter(p => !p.isPreorder)
  const preorderProducts = data.products.filter(p => p.isPreorder)
  const recentProducts = data.products.slice(0, 5)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> დეშბორდი
        </h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("ka-GE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard num={regularProducts.length.toString()} label="პროდუქტი" delta="მარაგში" />
        <StatCard num={preorderProducts.length.toString()} label="პრი-ორდერი" delta="აქტიური" />
        <StatCard num={data.promotions.filter(p => p.status === "active").length.toString()} label="პრომოქცია" delta="მოქმედი" />
        <StatCard num="24/7" label="ხელმისაწვდომობა" delta="ონლაინ" />
      </div>

      {/* Recent Products */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">ბოლო პროდუქტები</h3>
        </div>
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სურათი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სახელი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ბრენდი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ფასი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სტატუსი</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-background/50">
                <td className="px-6 py-4">
                  <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.brand}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.isPreorder 
                      ? "bg-amber-500/20 text-amber-500" 
                      : "bg-green-500/20 text-green-500"
                  }`}>
                    {product.isPreorder ? "პრი-ორდერი" : "მარაგში"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ num, label, delta }: { num: string; label: string; delta: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="text-3xl font-black text-red-500 mb-1">{num}</div>
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-xs text-muted-foreground">{delta}</div>
    </div>
  )
}

function ProductsPanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  const regularProducts = data.products.filter(p => !p.isPreorder)

  const handleDelete = (id: number) => {
    if (confirm("ნამდვილად გინდა წაშლა?")) {
      const newProducts = data.products.filter(p => p.id !== id)
      saveData({ ...data, products: newProducts })
    }
  }

  const handleSaveProduct = (product: Product) => {
    let newProducts: Product[]
    if (data.products.find(p => p.id === product.id)) {
      newProducts = data.products.map(p => p.id === product.id ? product : p)
    } else {
      newProducts = [...data.products, { ...product, id: Date.now() }]
    }
    saveData({ ...data, products: newProducts })
    setEditingProduct(null)
    setIsAdding(false)
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
              id: 0,
              name: "",
              brand: "",
              cat: "sneakers",
              price: "",
              sizes: [],
              img: "",
              gallery: [],
              isPreorder: false
            })
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> ახალი პროდუქტი
        </button>
      </div>

      {(editingProduct || isAdding) && (
        <ProductEditForm 
          product={editingProduct!} 
          onSave={handleSaveProduct} 
          onCancel={() => { setEditingProduct(null); setIsAdding(false) }}
        />
      )}
      
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სურათი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სახელი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ბრენდი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ფასი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ზომები</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">მოქმ.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {regularProducts.map((product) => (
              <tr key={product.id} className="hover:bg-background/50">
                <td className="px-6 py-4">
                  <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.brand}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{product.sizes.join(", ")}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-background rounded-lg text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductEditForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(product)

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{product.id ? "რედაქტირება" : "ახალი პროდუქტი"}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-background rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">სახელი</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ბრენდი</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ფასი</label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ზომები (მძიმით გამოყოფილი)</label>
          <input
            type="text"
            value={formData.sizes.join(", ")}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()) })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">სურათის URL</label>
          <input
            type="text"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => onSave(formData)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> შენახვა
        </button>
        <button 
          onClick={onCancel}
          className="border border-border hover:bg-background px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          გაუქმება
        </button>
      </div>
    </div>
  )
}

function PreordersPanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  const preorderProducts = data.products.filter(p => p.isPreorder)

  const handleDelete = (id: number) => {
    if (confirm("ნამდვილად გინდა წაშლა?")) {
      const newProducts = data.products.filter(p => p.id !== id)
      saveData({ ...data, products: newProducts })
    }
  }

  const handleSaveProduct = (product: Product) => {
    let newProducts: Product[]
    if (data.products.find(p => p.id === product.id)) {
      newProducts = data.products.map(p => p.id === product.id ? product : p)
    } else {
      newProducts = [...data.products, { ...product, id: Date.now(), isPreorder: true }]
    }
    saveData({ ...data, products: newProducts })
    setEditingProduct(null)
    setIsAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Flame className="w-6 h-6" /> პრი-ორდერ პროდუქტები
        </h2>
        <button 
          onClick={() => {
            setIsAdding(true)
            setEditingProduct({
              id: 0,
              name: "",
              brand: "",
              cat: "sneakers",
              price: "",
              sizes: [],
              img: "",
              gallery: [],
              isPreorder: true,
              preorderPrice: "",
              regularPrice: "",
              expectedArrival: ""
            })
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> პრი-ორდერ დამატება
        </button>
      </div>

      {(editingProduct || isAdding) && (
        <PreorderEditForm 
          product={editingProduct!} 
          onSave={handleSaveProduct} 
          onCancel={() => { setEditingProduct(null); setIsAdding(false) }}
        />
      )}
      
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სახელი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ბრენდი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">პრი-ფასი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ჩვ. ფასი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ჩამოსვლა</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">მოქმ.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {preorderProducts.map((product) => (
              <tr key={product.id} className="hover:bg-background/50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.brand}</td>
                <td className="px-6 py-4 text-red-500 font-semibold">{product.preorderPrice}</td>
                <td className="px-6 py-4 text-muted-foreground line-through">{product.regularPrice}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.expectedArrival}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-background rounded-lg text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PreorderEditForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(product)

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{product.id ? "რედაქტირება" : "ახალი პრი-ორდერი"}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-background rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">სახელი</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ბრენდი</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">პრი-ორდერ ფასი</label>
          <input
            type="text"
            value={formData.preorderPrice || ""}
            onChange={(e) => setFormData({ ...formData, preorderPrice: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ჩვეულებრივი ფასი</label>
          <input
            type="text"
            value={formData.regularPrice || ""}
            onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">მოსალოდნელი ჩამოსვლა</label>
          <input
            type="text"
            value={formData.expectedArrival || ""}
            onChange={(e) => setFormData({ ...formData, expectedArrival: e.target.value })}
            placeholder="მაგ. მაისი 2025"
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ზომები</label>
          <input
            type="text"
            value={formData.sizes.join(", ")}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()) })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">სურათის URL</label>
          <input
            type="text"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => onSave({ ...formData, isPreorder: true })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> შენახვა
        </button>
        <button 
          onClick={onCancel}
          className="border border-border hover:bg-background px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          გაუქმება
        </button>
      </div>
    </div>
  )
}

function HomepagePanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [homepage, setHomepage] = useState(data.homepage)
  const [preorderBanner, setPreorderBanner] = useState(data.preorderBanner)

  const handleSave = () => {
    saveData({ ...data, homepage, preorderBanner })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Home className="w-6 h-6" /> მთავარი გვერდი
        </h2>
        <button 
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> შენახვა
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">ჰეროს სექცია</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">სათაური სტრიქონი 1</label>
            <input
              type="text"
              value={homepage.title1}
              onChange={(e) => setHomepage({ ...homepage, title1: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">სათაური სტრიქონი 2</label>
            <input
              type="text"
              value={homepage.title2}
              onChange={(e) => setHomepage({ ...homepage, title2: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">ქვე-სათაური</label>
            <input
              type="text"
              value={homepage.subtitle}
              onChange={(e) => setHomepage({ ...homepage, subtitle: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ბეჯის ტექსტი</label>
            <input
              type="text"
              value={homepage.badge}
              onChange={(e) => setHomepage({ ...homepage, badge: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CTA ღილაკი 1</label>
            <input
              type="text"
              value={homepage.cta1}
              onChange={(e) => setHomepage({ ...homepage, cta1: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">პრი-ორდერ ბანერი</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">ძირითადი ტექსტი</label>
            <input
              type="text"
              value={preorderBanner.mainText}
              onChange={(e) => setPreorderBanner({ ...preorderBanner, mainText: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ქვე-ტექსტი</label>
            <input
              type="text"
              value={preorderBanner.subText}
              onChange={(e) => setPreorderBanner({ ...preorderBanner, subText: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function BannersPanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [banners, setBanners] = useState(data.banners)

  const handleSave = () => {
    saveData({ ...data, banners })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Image className="w-6 h-6" /> ბანერები & სლაიდები
        </h2>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">ჰეროს ბანერი</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">ფონის სურათის URL</label>
            <input
              type="text"
              value={banners.heroImage}
              onChange={(e) => setBanners({ ...banners, heroImage: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ბმული</label>
            <input
              type="text"
              value={banners.heroLink}
              onChange={(e) => setBanners({ ...banners, heroLink: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">სტატუსი</label>
            <select 
              value={banners.heroActive ? "active" : "inactive"}
              onChange={(e) => setBanners({ ...banners, heroActive: e.target.value === "active" })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="active">აქტიური</option>
              <option value="inactive">არააქტიური</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> შენახვა
        </button>
      </div>
    </div>
  )
}

function PromotionsPanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [promotions, setPromotions] = useState(data.promotions)
  const [newPromo, setNewPromo] = useState({ name: "", discount: "", startDate: "", endDate: "", target: "" })

  const handleAddPromo = () => {
    if (newPromo.name && newPromo.discount) {
      const promo = {
        id: Date.now().toString(),
        name: newPromo.name,
        discount: newPromo.discount + "%",
        endDate: newPromo.endDate || "მიმდინარე",
        status: "active" as const
      }
      const newPromotions = [...promotions, promo]
      setPromotions(newPromotions)
      saveData({ ...data, promotions: newPromotions })
      setNewPromo({ name: "", discount: "", startDate: "", endDate: "", target: "" })
    }
  }

  const handleDeletePromo = (id: string) => {
    if (confirm("ნამდვილად გინდა წაშლა?")) {
      const newPromotions = promotions.filter(p => p.id !== id)
      setPromotions(newPromotions)
      saveData({ ...data, promotions: newPromotions })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Tag className="w-6 h-6" /> პრომოქციები
        </h2>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">მოქმედი პრომოქციები</h3>
        </div>
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სახელი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">ფასდაკლება</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">დასრულება</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">სტატუსი</th>
              <th className="text-left text-xs text-muted-foreground uppercase tracking-wider px-6 py-3">მოქმ.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {promotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-background/50">
                <td className="px-6 py-4 font-medium">{promo.name}</td>
                <td className="px-6 py-4">{promo.discount}</td>
                <td className="px-6 py-4 text-muted-foreground">{promo.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    promo.status === "active" ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"
                  }`}>
                    {promo.status === "active" ? "აქტიური" : "მოლოდინში"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleDeletePromo(promo.id)}
                    className="p-2 hover:bg-background rounded-lg text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">ახალი პრომოქცია</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">სახელი</label>
            <input
              type="text"
              value={newPromo.name}
              onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
              placeholder="მაგ. ზაფხულის სეილი"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ფასდაკლება %</label>
            <input
              type="number"
              value={newPromo.discount}
              onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
              placeholder="20"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">დაწყება</label>
            <input
              type="date"
              value={newPromo.startDate}
              onChange={(e) => setNewPromo({ ...newPromo, startDate: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">დასრულება</label>
            <input
              type="date"
              value={newPromo.endDate}
              onChange={(e) => setNewPromo({ ...newPromo, endDate: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
        <button 
          onClick={handleAddPromo}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> დამატება
        </button>
      </div>
    </div>
  )
}

function SettingsPanel({ data, saveData }: { data: AdminData; saveData: (d: AdminData) => void }) {
  const [settings, setSettings] = useState(data.settings)

  const handleSave = () => {
    saveData({ ...data, settings })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Settings className="w-6 h-6" /> პარამეტრები
        </h2>
        <button 
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" /> შენახვა
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">საიტის ძირითადი ინფო</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">საიტის სახელი</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ტელეფონი</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ელ-ფოსტა</label>
            <input
              type="text"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ქალაქი</label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Instagram</label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Facebook</label>
            <input
              type="text"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">TikTok</label>
            <input
              type="text"
              value={settings.tiktok}
              onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp ნომერი</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
