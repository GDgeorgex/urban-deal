import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/products"

export default function PreorderPage() {
  const preorderProducts = PRODUCTS.filter((p) => p.isPreorder)

  const reasons = [
    {
      icon: "💰",
      title: "20% ფასდაკლება",
      desc: "პრი-ორდერ ფასი ყოველთვის 20% ნაკლებია საბოლოო ფასზე. შენახე ფული.",
    },
    {
      icon: "✅",
      title: "100% ორიგინალი",
      desc: "ყველა სნიკერი პირდაპირ ევროპული ოფიციალური დილერებიდან — ყალბი გამორიცხულია.",
    },
    {
      icon: "🚀",
      title: "პრიორიტეტული მიტანა",
      desc: "პრი-ორდერ კლიენტები პირველები იღებენ შეკვეთას, როგორც კი ნივთი ჩამოვა.",
    },
    {
      icon: "🛡️",
      title: "რისკი — ნული",
      desc: "თუ ნივთი დაგვიანდა 30 დღეზე მეტით — ვაბრუნებთ სრულ თანხას.",
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1a0008] to-background py-20 pb-16 border-b border-border relative overflow-hidden">
          <div className="absolute right-[-40px] top-10 font-black text-[180px] tracking-[-0.05em] text-[rgba(159,18,57,0.05)] pointer-events-none whitespace-nowrap leading-none hidden lg:block">
            PRE-ORDER
          </div>

          <div className="max-w-[1300px] mx-auto px-7 relative">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] mb-6 shadow-[0_0_24px_var(--red-glow)]">
              PRE-ORDER
            </div>

            <h1 className="font-black text-[clamp(44px,7vw,92px)] tracking-[-0.03em] leading-[0.9] text-white mb-4">
              დაჯავშნე
              <br />
              <span className="text-primary">20%-ით</span> იაფად
            </h1>

            <p className="text-lg font-light text-white/75 max-w-[600px] mb-10 leading-relaxed">
              დაბლოკე შენი სასურველი სნიკერი ახლავე. ჩვენ შეუკვეთავთ შენთვის ევროპიდან — გარანტირებულად ორიგინალი,
              პრიორიტეტული მიტანით, ბოლო ფასად.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {reasons.map((reason, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-[rgba(159,18,57,0.2)] rounded-[14px] p-5 text-center"
                >
                  <div className="text-3xl mb-3">{reason.icon}</div>
                  <h4 className="font-extrabold text-sm mb-1.5">{reason.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3.5 flex-wrap">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg bg-primary text-white font-bold text-sm tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] transition-all hover:-translate-y-0.5"
              >
                ნახე პრი-ორდერ პროდუქტები ↓
              </a>
              <a
                href="https://wa.me/995592013611?text=გამარჯობა!%20პრი-ორდერი%20მინდა%20განვიხილო."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg bg-transparent text-white font-bold text-sm tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
              >
                WhatsApp-ით კონსულტაცია
              </a>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section id="products" className="py-14 pb-20">
          <div className="max-w-[1300px] mx-auto px-7">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">
              პრი-ორდერ კატალოგი
            </div>
            <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-9">
              ახლავე <span className="text-muted-foreground">დაჯავშნე</span>
            </h2>

            {preorderProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {preorderProducts.map((product) => (
                  <ProductCard key={product.id} product={product} isPreorderPage />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg mb-4">ამჟამად პრი-ორდერ პროდუქტები არ არის.</p>
                <p>
                  მალე დაემატება —{" "}
                  <a
                    href="https://instagram.com/urbandeal_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    გამოგვყევი Instagram-ზე
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
