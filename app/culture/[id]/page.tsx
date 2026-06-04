"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"

export default function CulturePostPage() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("culture_posts")
        .select("*")
        .eq("id", id)
        .single()
      if (!data) router.push("/culture")
      setPost(data)
      setLoading(false)
    }
    if (id) fetchPost()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!post) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">

          <Link href="/culture" className="text-zinc-500 hover:text-white transition text-sm mb-10 block">
            ← კულტურა
          </Link>

          {post.image_url && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl font-black mb-4">{post.title}</h1>

          {post.description && (
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">{post.description}</p>
          )}

          {post.content && (
            <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-base">
              {post.content}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
