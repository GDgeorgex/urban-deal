"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Globe, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&q=85"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 py-10">
        <div className="inline-block bg-primary text-white text-[11px] font-bold tracking-[0.3em] px-4 py-1.5 rounded-full mb-7 shadow-[0_0_20px_var(--red-glow)] animate-fadeUp-delay-1">
          ახალი კოლექცია 2025
        </div>

        <h1 className="font-black text-[clamp(68px,13vw,155px)] leading-[0.9] tracking-[-0.03em] text-white mb-2.5 animate-fadeUp-delay-2">
          URBAN
          <br />
          <span className="text-primary drop-shadow-[0_0_40px_rgba(159,18,57,0.7)]">DEAL</span>
        </h1>

        <p className="text-[clamp(15px,2vw,20px)] font-light text-white/75 tracking-wide mb-10 animate-fadeUp-delay-3">
          ევროპული სნიკერები — პირდაპირ თბილისში.
          <br />
          ორიგინალი. პრემიუმ. შენთვის.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap animate-fadeUp-delay-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-primary text-white font-bold text-sm tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] hover:shadow-[0_6px_28px_rgba(190,18,60,0.55)] transition-all hover:-translate-y-0.5"
          >
            კოლექცია →
          </Link>
          <Link
            href="/preorder"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-transparent text-white font-bold text-sm tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
          >
            პრი-ორდერი
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40 text-[10px] tracking-[0.2em] uppercase animate-bounce-scroll">
        <div className="w-5 h-8 border-[1.5px] border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-primary rounded animate-scroll-dot" />
        </div>
        ქვემოთ
      </div>
    </section>
  )
}

export function PreorderStrip() {
  return (
    <div className="bg-gradient-to-r from-primary to-[#7f0a2e] py-4 overflow-hidden">
      <div className="flex items-center justify-center gap-5 flex-wrap max-w-[1300px] mx-auto px-7 text-center">
        <strong className="font-extrabold text-[15px]">პრი-ორდერი გახსნილია!</strong>
        <span className="text-[13px] opacity-90">
          დაჯავშნე სადეზირო სნიკერი ევროპიდან — 20%-ით იაფად, მიტანამდე
        </span>
        <Link
          href="/preorder"
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white text-primary font-bold text-xs hover:bg-white/90 transition-colors"
        >
          დეტალები →
        </Link>
      </div>
    </div>
  )
}

export function FeaturedSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">
            სტრიტვეარ კოლექცია
          </div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-4">
            URBAN <span className="text-muted-foreground">DEAL</span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-[500px] leading-relaxed">
            საუკეთესო სნიკერები, კლასიკური სტრიტვეარი — ყველაფერი ორიგინალი.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 mb-16">
          <Link href="/products" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80"
              alt="კოლექცია"
              width={900}
              height={400}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
              <div>
                <span className="font-black text-[22px] text-primary block mb-1">ახალი ჩამოსული</span>
                <p className="text-[13px] text-white/70">ექსკლუზიური მოდელები ჩვენ მაღაზიაში</p>
              </div>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-5">
            <Link href="/culture" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=700&q=80"
                alt="სტილი"
                width={700}
                height={190}
                className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-accent block mb-1">ურბანული სტილი</span>
                  <p className="text-[13px] text-white/70">გამოხატე საკუთარი ვიბი</p>
                </div>
              </div>
            </Link>

            <Link href="/preorder" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image
                src="https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=700&q=80"
                alt="პრი-ორდერი"
                width={700}
                height={190}
                className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(100,0,0,0.9)] via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-primary block mb-1">პრი-ორდერი</span>
                  <p className="text-[13px] text-white/70">დაჯავშნე ახლავე — 20% ფასდაკლება</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg mb-2">100% ორიგინალი</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              ყველა პროდუქტი დადასტურებულია. ყალბ ნივთებს ჩვენ თან არ ვყიდით — გარანტია ყველა შეკვეთაზე.
            </p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg mb-2">ევრო-იმპორტი</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              პირდაპირ ევროპის მომწოდებლებიდან — საუკეთესო ფასები, ყველაზე ახალი მოდელები.
            </p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg mb-2">სწრაფი მიტანა</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              თბილისის მასშტაბით სამე-ოთხ სამუშაო დღეში. საქართველოს მასშტაბით — კურიერით.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-[1300px] mx-auto px-7">
        <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-14">
          ჩვენს <span className="text-muted-foreground">შესახებ</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">
              Urban Deal — საქართველოს წამყვანი ონლაინ სნიკერ-მაღაზია. ჩვენ სპეციალიზდებით ევროპიდან ორიგინალი
              სნიკერებისა და სტრიტვეარ-ბრენდების იმპორტში — Nike, Adidas, New Balance, Puma, Reebok და სხვა.
            </p>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">
              ჩვენი მისია მარტივია: მოგაწოდოთ ის, რაც გინდათ — ნამდვილი, ახალი, და ფასადეკვატური. სნიკერ-ოსტატები,
              სტილის მოყვარულები — Urban Deal თქვენი სახლია.
            </p>

            <ul className="flex flex-col gap-3 mt-7">
              {[
                "ვერიფიცირებული ორიგინალი პროდუქტები",
                "პრემიუმ ბრენდების სელექცია",
                "ექსპერტული კლიენტ-სერვისი 7/7",
                "უსაფრთხო ონლაინ გადახდა",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 shadow-[0_0_8px_var(--red-glow)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border-2 border-primary rounded-[14px] p-9 shadow-[0_0_28px_rgba(159,18,57,0.12)]">
            <h3 className="font-black text-2xl text-primary mb-5">რატომ Urban Deal?</h3>
            <ul className="flex flex-col gap-3.5">
              {[
                "ევროპიდან პირდაპირ — ყველაზე ახალი სნიკერები",
                "ყველა ზომა ხელმისაწვდომი — S-დან XXL-მდე",
                "პრი-ორდერი 20% ფასდაკლებით",
                "სწრაფი მიტანა თბილისსა და მთელ საქართველოში",
                "ყველა შეკვეთაზე ავთენტურობის გარანტია",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#ccc] leading-relaxed">
                  <span className="text-primary font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">კონტაქტი</div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
            დაგვიკავშირდი
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[860px] mx-auto mb-14">
          <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
            <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.32h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l1-1.31a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-xl mb-2">���ელეფონი</h3>
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
    </section>
  )
}
