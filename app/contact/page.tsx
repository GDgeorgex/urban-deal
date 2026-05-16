import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <div className="bg-card border-b border-border py-14 pb-9">
          <div className="max-w-[1300px] mx-auto px-7">
            <h1 className="font-black text-[clamp(44px,7vw,88px)] tracking-[-0.03em] leading-[0.9] text-foreground">
              კონ<span className="text-primary">ტაქტი</span>
            </h1>
            <p className="text-muted-foreground text-[15px] mt-3">
              გამოგვიგზავნე შეტყობინება — ვუპასუხებთ სწრაფად.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="max-w-[1300px] mx-auto px-7">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[860px] mx-auto mb-14">
              <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
                <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.32h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l1-1.31a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-xl mb-2">ტელეფონი</h3>
                <a href="tel:+995592013611" className="text-primary font-semibold text-sm hover:underline">
                  +995 592 01 36 11
                </a>
              </div>

              <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
                <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-xl mb-2">ელ-ფოსტა</h3>
                <a href="mailto:shop.udeal@gmail.com" className="text-primary font-semibold text-sm hover:underline">
                  shop.udeal@gmail.com
                </a>
              </div>

              <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
                <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-xl mb-2">მდებარეობა</h3>
                <p className="text-[#ccc] text-[13px]">თბილისი, საქართველო</p>
              </div>
            </div>

            {/* Social CTAs */}
            <div className="text-center pt-8">
              <div className="flex gap-3.5 justify-center flex-wrap">
                <a
                  href="https://instagram.com/urbandeal_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] transition-all hover:-translate-y-0.5"
                >
                  Instagram @urbandeal_
                </a>
                <a
                  href="https://wa.me/995592013611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-transparent text-muted-foreground font-bold text-[13px] tracking-[0.06em] border-[1.5px] border-border hover:border-primary hover:text-foreground transition-all hover:-translate-y-0.5"
                >
                  WhatsApp
                </a>
                <a
                  href="https://tiktok.com/@urabandeal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-transparent text-foreground font-bold text-[13px] tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61577061391179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-transparent text-foreground font-bold text-[13px] tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
