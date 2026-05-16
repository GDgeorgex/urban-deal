import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CulturePage() {
  const tiles = [
    {
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      title: "Nike Air Collection",
      desc: "ლეგენდა, რომელიც არასდროს კვდება",
    },
    {
      img: "https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=800&q=80",
      title: "Adidas Yeezy",
      desc: "ყველაზე სასწაული სნიკერი ოდესმე",
    },
    {
      img: "https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=800&q=80",
      title: "Jordan Heritage",
      desc: "ნამდვილი ქუჩის ლეგენდა",
    },
    {
      img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      title: "New Balance",
      desc: "კომფორტი შეხვდა სტილს",
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative py-32 text-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=1600&q=80"
            alt="Culture hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />

          <div className="relative z-10 max-w-[1300px] mx-auto px-7">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent mb-3">
              ურბანული კულტურა
            </div>
            <h1 className="font-black text-[clamp(68px,13vw,155px)] leading-[0.9] tracking-[-0.03em] text-white mb-4">
              URBAN
              <br />
              <span className="text-primary">CULTURE</span>
            </h1>
            <p className="text-lg text-white/70 max-w-[540px] mx-auto">
              სნიკერი — ეს არ არის უბრალო ფეხსაცმელი. ეს შენი სტილია, შენი ვიბი, შენი ნაბიჯი.
            </p>
          </div>
        </div>

        {/* Culture Grid */}
        <section className="py-16">
          <div className="max-w-[1300px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16">
              {tiles.map((tile, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-[14px] cursor-pointer group"
                >
                  <Image
                    src={tile.img}
                    alt={tile.title}
                    width={800}
                    height={320}
                    className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <h3 className="font-black text-[22px] mb-1">{tile.title}</h3>
                      <p className="text-[13px] text-white/70">{tile.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manifesto */}
            <div className="bg-card rounded-[14px] p-14 text-center">
              <h2 className="font-black text-[clamp(32px,4vw,52px)] tracking-[-0.02em] leading-tight mb-5">
                ვართ ჩვენ, ვართ <span className="text-primary">Urban Deal</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-[680px] mx-auto leading-relaxed">
                ჩვენ ვაყიდით სნიკერებს, მაგრამ ასევე ვყიდით ენერგიას. სნიკერ-კულტურა საქართველოში — ეს ჩვენი ვნებაა.
                ყოველი ახალი კოლექცია — ეს გამოცხადება. Urban Deal-ი ეს არ არის უბრალო მაღაზია — ეს სტილის სახლია.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
