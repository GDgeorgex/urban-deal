"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [hero, setHero] = useState({
    title1: "URBAN",
    title2: "DEAL",
    subtitle: "ევროპული სნიკერები — პირდაპირ თბილისში",
    badge: "ახალი კოლექცია 2025"
  })

  const [banners, setBanners] = useState<any[]>([])

  useEffect(() => {
    // Load hero settings (we'll store in a separate table later)
    // For now using defaults
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="inline-block bg-red-600 text-white text-sm font-bold tracking-widest px-6 py-2 rounded-full mb-6">
            {hero.badge}
          </div>
          
          <h1 className="text-8xl md:text-[120px] font-black leading-none tracking-tighter mb-6">
            {hero.title1}<br />{hero.title2}
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-zinc-200 transition">
              იხილე კოლექცია
            </Link>
            <Link href="/preorder" className="border border-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 transition">
              პრი-ორდერი
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/products" className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition group">
          <h3 className="text-3xl font-bold mb-4">ახალი პროდუქცია</h3>
          <p className="text-zinc-400">მარაგში არსებული სნიკერები</p>
        </Link>
        <Link href="/preorder" className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition group">
          <h3 className="text-3xl font-bold mb-4 text-orange-500">პრი-ორდერი</h3>
          <p className="text-zinc-400">დაჯავშნე მომავალი კოლექცია</p>
        </Link>
        <div className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition group">
          <h3 className="text-3xl font-bold mb-4">აქციები</h3>
          <p className="text-zinc-400">სპეციალური შეთავაზებები</p>
        </div>
      </div>
    </div>
  )
}
