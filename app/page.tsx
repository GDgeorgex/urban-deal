"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Rich Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black z-10" />

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="inline-block bg-red-600 text-white text-sm font-bold tracking-widest px-8 py-3 rounded-full mb-8">
            🔥 ახალი კოლექცია 
          </div>

          <h1 className="text-7xl md:text-[110px] font-black tracking-[-4px] leading-none mb-6">
            URBAN<br />DEAL
          </h1>

          <p className="text-2xl md:text-3xl text-zinc-300 max-w-2xl mx-auto mb-12">
            ევროპული პრემიუმ სნიკერები და ტანსაცმელი — პირდაპირ თბილისში
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/products" 
              className="bg-white text-black px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-zinc-100 transition"
            >
              იხილე კოლექცია
            </Link>
            <Link 
              href="/preorder" 
              className="border-2 border-white px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 transition"
            >
              პრი-ორდერი
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-zinc-900 py-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-sm text-zinc-400">
          <div>✅ ორიგინალი პროდუქტები</div>
          <div>✅ სწრაფი მიწოდება თბილისში</div>
          <div>✅ 10 დღიანი დაბრუნება</div>
          <div>✅ უფასო საკონსულტაციო</div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/products" className="group bg-zinc-900 rounded-3xl p-10 hover:bg-zinc-800 transition">
          <div className="text-red-500 text-sm font-bold mb-3">ახალი მარაგი</div>
          <h3 className="text-4xl font-black mb-4">პროდუქტები</h3>
          <p className="text-zinc-400">მიმდინარე კოლექცია მარაგში</p>
        </Link>

        <Link href="/preorder" className="group bg-gradient-to-br from-orange-900 to-black border border-orange-500/30 rounded-3xl p-10 hover:border-orange-500 transition">
          <div className="text-orange-500 text-sm font-bold mb-3">PRE-ORDER</div>
          <h3 className="text-4xl font-black mb-4">პრი-ორდერი</h3>
          <p className="text-zinc-400">დაჯავშნე მომავალი მოდელები</p>
        </Link>

        <div className="group bg-zinc-900 rounded-3xl p-10 hover:bg-zinc-800 transition">
          <div className="text-yellow-500 text-sm font-bold mb-3">აქციები</div>
          <h3 className="text-4xl font-black mb-4">სპეციალური შეთავაზებები</h3>
          <p className="text-zinc-400">ფასდაკლებები და ლიმიტირებული კოლექციები</p>
        </div>
      </div>
    </div>
  )
}
