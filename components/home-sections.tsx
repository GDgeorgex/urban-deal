"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Globe, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"

// --- CMS HELPER ---
function useCms() {
  const [cms, setCms] = useState<any[]>([])
  useEffect(() => {
    async function fetchCms() {
      const { data } = await supabase.from('site_content').select('*')
      if (data) setCms(data)
    }
    fetchCms()
  }, [])

  const getContent = (id: string, fallback: string) => {
    const item = cms.find(c => c.id === id)
    return item ? item.value : fallback
  }

  return { getContent }
}

export function Hero() {
  const { getContent } = useCms()
  
  const heroBadge = getContent('hero_badge', 'ახალი კოლექცია 2025');
  const heroTitleUrban = getContent('hero_title_urban', 'URBAN');
  const heroTitleDeal = getContent('hero_title_deal', 'DEAL');
  const heroSubtitleLine1 = getContent('hero_subtitle_line1', 'ევროპული სნიკერები — პირდაპირ თბილისში.');
  const heroSubtitleLine2 = getContent('hero_subtitle_line2', 'ორიგინალი. პრემიუმ. შენთვის.');
  const heroBg = getContent('hero_bg', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&q=85' );
  const heroProductsButtonText = getContent('hero_button_products_text', 'კოლექცია →');
  const heroPreorderButtonText = getContent('hero_button_preorder_text', 'პრი-ორდერი');
  const heroScrollText = getContent('hero_scroll_text', 'ქვემოთ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={heroBg} alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
      </div>

      <div className="relative z-10 text-center px-5 py-10">
        <div className="inline-block bg-primary text-white text-[11px] font-bold tracking-[0.3em] px-4 py-1.5 rounded-full mb-7 shadow-[0_0_20px_var(--red-glow)] animate-fadeUp-delay-1">
          {heroBadge}
        </div>

        <h1 className="font-black text-[clamp(68px,13vw,155px)] leading-[0.9] tracking-[-0.03em] text-white mb-2.5 animate-fadeUp-delay-2">
          {heroTitleUrban}  

          <span className="text-primary drop-shadow-[0_0_40px_rgba(159,18,57,0.7)]">{heroTitleDeal}</span>
        </h1>

        <p className="text-[clamp(15px,2vw,20px)] font-light text-white/75 tracking-wide mb-10 animate-fadeUp-delay-3">
          {heroSubtitleLine1}  
{heroSubtitleLine2}
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap animate-fadeUp-delay-4">
          <Link href="/products" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-primary text-white font-bold text-sm tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] hover:shadow-[0_6px_28px_rgba(190,18,60,0.55)] transition-all hover:-translate-y-0.5">
            {heroProductsButtonText}
          </Link>
          <Link href="/preorder" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-transparent text-white font-bold text-sm tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5">
            {heroPreorderButtonText}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40 text-[10px] tracking-[0.2em] uppercase animate-bounce-scroll">
        <div className="w-5 h-8 border-[1.5px] border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-primary rounded animate-scroll-dot" />
        </div>
        {heroScrollText}
      </div>
    </section>
  )
}

export function PreorderStrip() {
  const { getContent } = useCms()
  const preorderStripStrongText = getContent('preorder_strip_strong_text', 'პრი-ორდერი გახსნილია!');
  const preorderStripText = getContent('preorder_strip_text', 'დაჯავშნე სადეზირო სნიკერი ევროპიდან — 20%-ით იაფად, მიტანამდე');
  const preorderStripButtonText = getContent('preorder_strip_button_text', 'დეტალები →');

  return (
    <div className="bg-gradient-to-r from-primary to-[#7f0a2e] py-4 overflow-hidden">
      <div className="flex items-center justify-center gap-5 flex-wrap max-w-[1300px] mx-auto px-7 text-center">
        <strong className="font-extrabold text-[15px]">{preorderStripStrongText}</strong>
        <span className="text-[13px] opacity-90">{preorderStripText}</span>
        <Link href="/preorder" className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white text-primary font-bold text-xs hover:bg-white/90 transition-colors">
          {preorderStripButtonText}
        </Link>
      </div>
    </div>
  )
}

export function FeaturedSection() {
  const { getContent } = useCms()
  const featuredSectionBadge = getContent('featured_section_badge', 'სტრიტვეარ კოლექცია');
  const featuredSectionTitleUrban = getContent('featured_section_title_urban', 'URBAN');
  const featuredSectionTitleDeal = getContent('featured_section_title_deal', 'DEAL');
  const featuredSectionDescription = getContent('featured_section_description', 'საუკეთესო სნიკერები, კლასიკური სტრიტვეარი — ყველაფერი ორიგინალი.');
  const link1Img = getContent('featured_section_link1_img', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80' );
  const link1Title = getContent('featured_section_link1_title', 'ახალი ჩამოსული');
  const link1Desc = getContent('featured_section_link1_desc', 'ექსკლუზიური მოდელები ჩვენ მაღაზიაში');
  const link2Img = getContent('featured_section_link2_img', 'https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=700&q=80' );
  const link2Title = getContent('featured_section_link2_title', 'ურბანული სტილი');
  const link2Desc = getContent('featured_section_link2_desc', 'გამოხატე საკუთარი ვიბი');
  const link3Img = getContent('featured_section_link3_img', 'https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=700&q=80' );
  const link3Title = getContent('featured_section_link3_title', 'პრი-ორდერი');
  const link3Desc = getContent('featured_section_link3_desc', 'დაჯავშნე ახლავე — 20% ფასდაკლება');

  const p1T = getContent('pillar1_title', '100% ორიგინალი');
  const p1D = getContent('pillar1_desc', 'ყველა პროდუქტი დადასტურებულია. ყალბ ნივთებს ჩვენ თან არ ვყიდით — გარანტია ყველა შეკვეთაზე.');
  const p2T = getContent('pillar2_title', 'ევრო-იმპორტი');
  const p2D = getContent('pillar2_desc', 'პირდაპირ ევროპის მომწოდებლებიდან — საუკეთესო ფასები, ყველაზე ახალი მოდელები.');
  const p3T = getContent('pillar3_title', 'სწრაფი მიტანა');
  const p3D = getContent('pillar3_desc', 'თბილისის მასშტაბით სამე-ოთხ სამუშაო დღეში. საქართველოს მასშტაბით — კურიერით.');

  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">{featuredSectionBadge}</div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-4">
            {featuredSectionTitleUrban} <span className="text-muted-foreground">{featuredSectionTitleDeal}</span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-[500px] leading-relaxed">{featuredSectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 mb-16">
          <Link href="/products" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
            <Image src={link1Img} alt={link1Title} width={900} height={400} className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
              <div>
                <span className="font-black text-[22px] text-primary block mb-1">{link1Title}</span>
                <p className="text-[13px] text-white/70">{link1Desc}</p>
              </div>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-5">
            <Link href="/culture" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image src={link2Img} alt={link2Title} width={700} height={190} className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-accent block mb-1">{link2Title}</span>
                  <p className="text-[13px] text-white/70">{link2Desc}</p>
                </div>
              </div>
            </Link>

            <Link href="/preorder" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image src={link3Img} alt={link3Title} width={700} height={190} className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(100,0,0,0.9)] via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-primary block mb-1">{link3Title}</span>
                  <p className="text-[13px] text-white/70">{link3Desc}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Pillar icon={<CheckCircle />} title={p1T} desc={p1D} />
          <Pillar icon={<Globe />} title={p2T} desc={p2D} />
          <Pillar icon={<MapPin />} title={p3T} desc={p3D} />
        </div>
      </div>
    </section>
  )
}

function Pillar({ icon, title, desc }: any) {
  return (
    <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
      <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="font-extrabold text-lg mb-2">{title}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export function AboutSection() {
  const { getContent } = useCms()
  const t1 = getContent('about_section_title_part1', 'ჩვენს');
  const t2 = getContent('about_section_title_part2', 'შესახებ');
  const p1 = getContent('about_text_paragraph1', 'Urban Deal — საქართველოს წამყვანი ონლაინ სნიკერ-მაღაზია. ჩვენ სპეციალიზდებით ევროპიდან ორიგინალი სნიკერებისა და სტრიტვეარ-ბრენდების იმპორტში — Nike, Adidas, New Balance, Puma, Reebok და სხვა.');
  const p2 = getContent('about_text_paragraph2', 'ჩვენი მისია მარტივია: მოგაწოდოთ ის, რაც გინდათ — ნამდვილი, ახალი, და ფასადეკვატური. სნიკერ-ოსტატები, სტილის მოყვარულები — Urban Deal თქვენი სახლია.');
  
  const l1 = getContent('about_list_item1', 'ვერიფიცირებული ორიგინალი პროდუქტები');
  const l2 = getContent('about_list_item2', 'პრემიუმ ბრენდების სელექცია');
  const l3 = getContent('about_list_item3', 'ექსპერტული კლიენტ-სერვისი 7/7');
  const l4 = getContent('about_list_item4', 'უსაფრთხო ონლაინ გადახდა');

  const wt = getContent('why_urban_deal_title', 'რატომ Urban Deal?');
  const wi1 = getContent('why_urban_deal_item1', 'ევროპიდან პირდაპირ — ყველაზე ახალი სნიკერები');
  const wi2 = getContent('why_urban_deal_item2', 'ყველა ზომა ხელმისაწვდომი — S-დან XXL-მდე');
  const wi3 = getContent('why_urban_deal_item3', 'პრი-ორდერი 20% ფასდაკლებით');
  const wi4 = getContent('why_urban_deal_item4', 'სწრაფი მიტანა თბილისსა და მთელ საქართველოში');
  const wi5 = getContent('why_urban_deal_item5', 'ყველა შეკვეთაზე ავთენტურობის გარანტია');

  return (
    <section className="py-24 bg-card">
      <div className="max-w-[1300px] mx-auto px-7">
        <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-14">
          {t1} <span className="text-muted-foreground">{t2}</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">{p1}</p>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">{p2}</p>
            <ul className="flex flex-col gap-3 mt-7">
              {[l1, l2, l3, l4].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 shadow-[0_0_8px_var(--red-glow)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background border-2 border-primary rounded-[14px] p-9 shadow-[0_0_28px_rgba(159,18,57,0.12)]">
            <h3 className="font-black text-2xl text-primary mb-5">{wt}</h3>
            <ul className="flex flex-col gap-3.5">
              {[wi1, wi2, wi3, wi4, wi5].map((item, i) => (
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
  const { getContent } = useCms()
  const cb = getContent('contact_badge', 'კონტაქტი');
  const ct = getContent('contact_title', 'დაგვიკავშირდი');

  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">{cb}</div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">{ct}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[860px] mx-auto mb-14">
          <ContactCard icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.32h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l1-1.31a2 2 0 012.11-.45 12.84 12.84 0 002.81 0A2 2 0 0122 16.92z" /></svg>} title="დაგვირეკე" desc="+995 592 013 611" />
          <ContactCard icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>} title="მოგვწერე" desc="urban.deal.ge@gmail.com" />
          <ContactCard icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>} title="მისამართი" desc="თბილისი, საქართველო" />
        </div>
        <div className="text-center text-muted-foreground text-sm">
          <p>Urban Deal © 2025. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon, title, desc }: any) {
  return (
    <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
      <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">{icon}</div>
      <h3 className="font-extrabold text-lg mb-2">{title}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
