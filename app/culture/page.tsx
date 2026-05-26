"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/navbar"

interface CulturePost {
  id: number
  title: string
  description: string
  content: string
  image_url: string
  created_at: string
}

export default function CulturePage() {
  const [posts, setPosts] = useState<CulturePost[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<CulturePost | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("culture_posts")
        .select("*")
        .order("created_at", { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-zinc-500 text-xl">იტვირთება...</div>
        </div>
      </>
    )
  }

  if (selected) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-zinc-950 text-white">
          {selected.image_url && (
            <div
              className="w-full h-96 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${selected.image_url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="max-w-4xl mx-auto">
                  <button
                    onClick={() => setSelected(null)}
                    className="text-zinc-400 hover:text-white text-sm mb-4 flex items-center gap-2 transition"
                  >
                    ← უკან
                  </button>
                  <h1 className="text-5xl font-black leading-tight">{selected.title}</h1>
                </div>
              </div>
            </div>
          )}
          <div className="max-w-4xl mx-auto px-6 py-16">
            {!selected.image_url && (
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-400 hover:text-white text-sm mb-8 flex items-center gap-2 transition"
              >
                ← უკან
              </button>
            )}
            {!selected.image_url && (
              <h1 className="text-5xl font-black mb-10 leading-tight">{selected.title}</h1>
            )}
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">{selected.description}</p>
            <div className="text-zinc-400 leading-8 text-base whitespace-pre-wrap">{selected.content}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero */}
        <div
          className="relative py-32 text-center"
          style={{
            background: "linear-gradient(135deg, #1a0008 0%, #0d0d0d 60%)",
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <p className="text-red-600 text-xs font-black tracking-widest uppercase mb-4">ურბანული კულტურა</p>
            <h1 className="text-7xl font-black leading-none mb-6">
              URBAN<br />
              <span className="text-red-600">CULTURE</span>
            </h1>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              სნიკერი — ეს არ არის უბრალო ფეხსაცმელი.<br />
              ეს შენი სტილია, შენი ვიბი, შენი ნაბიჯი.
            </p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          {posts.length === 0 ? (
            <div className="text-center py-32 text-zinc-600">
              <p className="text-xl">სტატიები მალე დაემატება.</p>
              <p className="text-sm mt-2">გამოგვყევი Instagram-ზე განახლებებისთვის.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelected(post)}
                  className="group cursor-pointer bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-56 bg-zinc-800 overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <span className="text-zinc-600 text-6xl font-black opacity-20">UD</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-black mb-3 group-hover:text-red-500 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{post.description}</p>
                    <div className="mt-4 flex items-center text-red-600 text-sm font-bold">
                      წაიკითხე →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
