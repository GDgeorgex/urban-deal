"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { PageTracker } from "@/components/home-sections"

export default function CulturePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('culture_posts').select('*').order('created_at', { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <>
      <Navbar />
      <PageTracker path="Culture" />
      <main className="bg-black min-h-screen">
        {/* Hero */}
        <div className="relative py-48 text-center overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1800&q=80" alt="Culture hero" fill className="object-cover opacity-50 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
          <div className="relative z-10 max-w-[1300px] mx-auto px-7">
            <div className="text-[11px] font-black tracking-[0.5em] uppercase text-primary mb-6">ურბანული კულტურა</div>
            <h1 className="font-black text-[clamp(50px,10vw,120px )] leading-none tracking-tighter text-white mb-8 italic">
              URBAN  
<span className="text-zinc-700">CULTURE</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">სნიკერ-კულტურა საქართველოში — ეს ჩვენი ვნებაა. გაეცანით უახლეს ტრენდებსა და სტილს.</p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-24">
          <div className="max-w-[1300px] mx-auto px-7">
            {loading ? (
              <div className="text-center py-20 text-zinc-500 font-bold">იტვირთება...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-zinc-500 font-bold italic">პოსტები ჯერ არ არის დამატებული.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="relative aspect-video rounded-[40px] overflow-hidden mb-8 border border-white/5">
                      <Image src={post.image_url || "/placeholder.jpg"} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="px-4">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">სტილი</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString('ka-GE')}</span>
                      </div>
                      <h2 className="text-4xl font-black text-white mb-4 tracking-tighter italic group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-zinc-400 text-lg leading-relaxed font-medium mb-8 line-clamp-3">{post.description}</p>
                      
                      {/* Expanded Content (Simple Modal or Accordion can be added here) */}
                      <div className="pt-8 border-t border-white/5">
                        <p className="text-zinc-500 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-32 bg-zinc-950">
          <div className="max-w-[1000px] mx-auto px-7 text-center">
            <h2 className="font-black text-6xl tracking-tighter italic mb-10">ვართ ჩვენ, ვართ <span className="text-primary">Urban Deal</span></h2>
            <p className="text-2xl text-zinc-400 leading-relaxed font-medium italic">
              ჩვენ არ ვყიდით მხოლოდ სნიკერებს, ჩვენ ვქმნით მოძრაობას. Urban Deal-ი არის სტილის, თავისუფლების და ავთენტურობის სიმბოლო საქართველოში.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
