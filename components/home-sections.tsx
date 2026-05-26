"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Globe, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"

// --- TRACKING COMPONENT ---
export function PageTracker({ path }: { path: string }) {
  useEffect(() => {
    const track = async () => {
      await supabase.from('site_analytics').insert({ page_path: path })
    }
    track()
  }, [path])
  return null
}

export function Hero() {
  // Pattern for fetching Hero background from CMS later if needed
  const [bgUrl, setBgUrl] = useState("https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1800&q=80" ) // New Urban Background

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <PageTracker path="Home" />
      
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image 
          src={bgUrl} 
          alt="Urban background" 
          fill 
          className="object-cover opacity-60 animate-pulse-slow scale-110"
          priority
        />
        {/* Animated Overlay Circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 py-10">
        <div className="inline-block bg-primary text-white text-[11px] font-bold tracking-[0.3em] px-4 py-1.5 rounded-full mb-7 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-fadeUp-delay-1">
          ახალი კოლექცია 2025
        </div>

        <h1 className="font-black text-[clamp(68px,13vw,155px)] leading-[0.9] tracking-[-0.03em] text-white mb-2.5 animate-fadeUp-delay-2 drop-shadow-2xl">
          URBAN  

          <span className="text-primary drop-shadow-[0_0_40px_rgba(159,18,57,0.7)]">DEAL</span>
        </h1>

        <p className="text-[clamp(15px,2vw,20px)] font-light text-white/75 tracking-wide mb-10 animate-fadeUp-delay-3 max-w-2xl mx-auto">
          ევროპული სნიკერები — პირდაპირ თბილისში. ორიგინალი. პრემიუმ. შენთვის.
        </p>

        <div className="flex gap-4 justify-center flex-wrap animate-fadeUp-delay-4">
          <Link href="/products" className="group relative px-10 py-5 bg-primary text-white font-black text-sm tracking-widest rounded-xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            <span className="relative z-10">კოლექცია →</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link href="/preorder" className="px-10 py-5 border-2 border-zinc-700 text-white font-black text-sm tracking-widest rounded-xl hover:border-white transition-all hover:bg-white/5">
            პრი-ორდერი
          </Link>
        </div>
      </div>
    </section>
  )
}

export function PreorderStrip() {
  return (
    <div className="bg-gradient-to-r from-primary via-red-900 to-zinc-900 py-5 overflow-hidden border-y border-white/5">
      <div className="flex items-center justify-center gap-6 flex-wrap max-w-[1300px] mx-auto px-7 text-center">
        <strong className="font-black text-lg tracking-tight uppercase italic">პრი-ორდერი გახსნილია!</strong>
        <span className="text-sm font-medium text-white/80">დაჯავშნე სნიკერი ევროპიდან — 20%-ით იაფად</span>
        <Link href="/preorder" className="px-6 py-2 bg-white text-black font-black text-xs rounded-lg hover:scale-105 transition-transform">დეტალები →</Link>
      </div>
    </div>
  )
}

export function FeaturedSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="mb-16">
          <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-primary mb-4">სტრიტვეარ კოლექცია</div>
          <h2 className="font-black text-[clamp(40px,5vw,80px)] leading-none tracking-tighter mb-6">
            URBAN <span className="text-zinc-700">DEAL</span>
          </h2>
          <p className="text-zinc-400 max-w-md text-lg font-medium leading-relaxed">საუკეთესო სნიკერები, კლასიკური სტრიტვეარი — ყველაფერი ორიგინალი.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeatureCard href="/products" img="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" title="ახალი ჩამოსული" desc="ექსკლუზიური მოდელები" color="text-primary" />
          <FeatureCard href="/culture" img="https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=800" title="ურბანული სტილი" desc="გამოხატე შენი ვიბი" color="text-blue-500" />
          <FeatureCard href="/preorder" img="https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=800" title="პრი-ორდერი" desc="20% ფასდაკლება" color="text-red-500" />
        </div>
      </div>
    </section>
   )
}

function FeatureCard({ href, img, title, desc, color }: any) {
  return (
    <Link href={href} className="relative aspect-[4/5] overflow-hidden rounded-3xl group">
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8">
        <h3 className={`font-black text-3xl mb-2 ${color}`}>{title}</h3>
        <p className="text-white/70 font-bold">{desc}</p>
      </div>
    </Link>
  )
}

export function AboutSection() {
  return (
    <section className="py-32 bg-zinc-950 border-y border-white/5">
      <div className="max-w-[1300px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="font-black text-6xl tracking-tighter mb-10 italic">ჩვენს <span className="text-primary">შესახებ</span></h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-medium">Urban Deal — საქართველოს წამყვანი ონლაინ სნიკერ-მაღაზია. ჩვენ სპეციალიზდებით ევროპიდან ორიგინალი სნიკერებისა და სტრიტვეარ-ბრენდების იმპორტში.</p>
          <div className="space-y-4">
            <AboutItem text="ვერიფიცირებული ორიგინალი" />
            <AboutItem text="პრემიუმ ბრენდების სელექცია" />
            <AboutItem text="ექსპერტული სერვისი 7/7" />
          </div>
        </div>
        <div className="relative p-1 bg-gradient-to-br from-primary to-zinc-800 rounded-[40px]">
          <div className="bg-zinc-950 p-12 rounded-[39px]">
            <h3 className="font-black text-3xl text-primary mb-8 uppercase italic tracking-widest">რატომ Urban Deal?</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 font-bold text-zinc-300 italic"><span className="text-primary">✓</span> ევროპიდან პირდაპირ — ყველაზე ახალი</li>
              <li className="flex gap-4 font-bold text-zinc-300 italic"><span className="text-primary">✓</span> ყველა ზომა ხელმისაწვდომი</li>
              <li className="flex gap-4 font-bold text-zinc-300 italic"><span className="text-primary">✓</span> პრი-ორდერი 20% ფასდაკლებით</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutItem({ text }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
      <span className="font-black text-sm uppercase tracking-widest italic">{text}</span>
    </div>
  )
}

export function ContactSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1300px] mx-auto px-7 text-center">
        <h2 className="font-black text-5xl mb-16 tracking-tighter italic">დაგვიკავშირდი</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <ContactBox label="დაგვირეკე" value="+995 592 013 611" />
          <ContactBox label="მოგვწერე" value="urban.deal.ge@gmail.com" />
          <ContactBox label="ლოკაცია" value="თბილისი, საქართველო" />
        </div>
      </div>
    </section>
  )
}

function ContactBox({ label, value }: any) {
  return (
    <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-primary transition-all group">
      <p className="text-zinc-500 font-black text-xs uppercase tracking-[0.3em] mb-4 group-hover:text-primary transition-colors">{label}</p>
      <p className="font-black text-lg">{value}</p>
    </div>
  )
}
