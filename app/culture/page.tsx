"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { ChevronDown } from "lucide-react"

export default function CulturePage() {
  const [cms, setCms] = useState<any[]>([])
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<any[]>([])
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    async function fetchCms() {
      const { data } = await supabase.from('site_content').select('*')
      if (data) setCms(data)
    }
    fetchCms()

    async function fetchPosts() {
      const { data } = await supabase
        .from('culture_posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) {
        setAllPosts(data)
        setDisplayedPosts(data.slice(0, 4))
      }
    }
    fetchPosts()

    const subscription = supabase
      .channel('culture_posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'culture_posts' }, () => {
        fetchPosts()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getContent = (id: string, fallback: string) => {
    const item = cms.find(c => c.id === id)
    return item ? item.value : fallback
  }

  const heroBadge = getContent('culture_hero_badge', 'ურბანული კულტურა')
  const titleUrban = getContent('culture_hero_title_urban', 'URBAN')
  const titleCulture = getContent('culture_hero_title_culture', 'CULTURE')
  const heroDesc = getContent('culture_hero_description', 'სნიკერი — ეს არ არის უბრალო ფეხსაცმელი. ეს შენი სტილია, შენი ვიბი, შენი ნაბიჯი.')
  const heroBg = getContent('culture_hero_bg', 'https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=1600&q=80')

  const m1 = getContent('culture_manifesto_title_part1', 'ვართ ჩვენ, ვართ')
  const m2 = getContent('culture_manifesto_title_part2', 'Urban Deal')
  const mText = getContent('culture_manifesto_text', 'ჩვენ ვაყიდით სნიკერებს, მაგრამ ასევე ვყიდით ენერგიას. სნიკერ-კულტურა საქართველოში — ეს ჩვენი ვნებაა. ყოველი ახალი კოლექცია — ეს გამოცხადება. Urban Deal-ი ეს არ არის უბრალო მაღაზია — ეს სტილის სახლია.')

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative py-32 text-center overflow-hidden">
          <Image src={heroBg} alt="Culture hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
          <div className="relative z-10 max-w-[1300px] mx-auto px-7">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-3">{heroBadge}</div>
            <h1 className="font-black text-[clamp(68px,13vw,155px)] leading-[0.9] tracking-[-0.03em] text-white mb-4">
              {titleUrban}
              <span className="text-primary">{titleCulture}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-[540px] mx-auto">{heroDesc}</p>
          </div>
        </div>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-[1300px] mx-auto px-7">
            {displayedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16">
                  {displayedPosts.map((post) => (
                    <Link key={post.id} href={`/culture/${post.id}`}>
                      <div className="relative overflow-hidden rounded-[14px] cursor-pointer group">
                        <Image 
                          src={post.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'} 
                          alt={post.title} 
                          width={800} 
                          height={320} 
                          className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                          <div>
                            <h3 className="font-black text-[22px] mb-1">{post.title}</h3>
                            <p className="text-[13px] text-white/70 line-clamp-2">{post.description || post.content}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* See More Button */}
                {allPosts.length > 4 && !showMore && (
                  <div className="flex justify-center mb-16">
                    <button
                      onClick={() => setDisplayedPosts(allPosts)}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-[var(--red-light)] transition-all"
                    >
                      <span>კიდევ ნახე</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* All Posts Grid (when expanded) */}
                {displayedPosts.length > 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16">
                    {displayedPosts.slice(4).map((post) => (
                      <Link key={post.id} href={`/culture/${post.id}`}>
                        <div className="relative overflow-hidden rounded-[14px] cursor-pointer group">
                          <Image 
                            src={post.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'} 
                            alt={post.title} 
                            width={800} 
                            height={320} 
                            className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                            <div>
                              <h3 className="font-black text-[22px] mb-1">{post.title}</h3>
                              <p className="text-[13px] text-white/70 line-clamp-2">{post.description || post.content}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-zinc-400 text-lg">კულტურული პოსტები მალე დაემატება...</p>
              </div>
            )}

            {/* Manifesto Section */}
            <div className="bg-card rounded-[14px] p-14 text-center">
              <h2 className="font-black text-[clamp(32px,4vw,52px)] tracking-[-0.02em] leading-tight mb-5">
                {m1} <span className="text-primary">{m2}</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-[680px] mx-auto leading-relaxed">{mText}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
