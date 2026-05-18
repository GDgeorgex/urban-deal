"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Globe, MapPin } from "lucide-react"
import { CmsContent } from "../app/layout"; // Import CmsContent type

// Helper to get content by ID with a fallback
const getContent = (cms: CmsContent, id: string, fallback: string) => {
  const item = cms.find(c => c.id === id);
  return item ? item.value : fallback;
};

export function Hero({ cmsContent }: { cmsContent: CmsContent }) {
  const heroBadge = getContent(cmsContent, 'hero_badge', 'ახალი კოლექცია 2025');
  const heroTitleUrban = getContent(cmsContent, 'hero_title_urban', 'URBAN');
  const heroTitleDeal = getContent(cmsContent, 'hero_title_deal', 'DEAL');
  const heroSubtitleLine1 = getContent(cmsContent, 'hero_subtitle_line1', 'ევროპული სნიკერები — პირდაპირ თბილისში.');
  const heroSubtitleLine2 = getContent(cmsContent, 'hero_subtitle_line2', 'ორიგინალი. პრემიუმ. შენთვის.');
  const heroBg = getContent(cmsContent, 'hero_bg', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&q=85' );
  const heroProductsButtonText = getContent(cmsContent, 'hero_button_products_text', 'კოლექცია →');
  const heroPreorderButtonText = getContent(cmsContent, 'hero_button_preorder_text', 'პრი-ორდერი');
  const heroScrollText = getContent(cmsContent, 'hero_scroll_text', 'ქვემოთ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
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
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-primary text-white font-bold text-sm tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] hover:shadow-[0_6px_28px_rgba(190,18,60,0.55)] transition-all hover:-translate-y-0.5"
          >
            {heroProductsButtonText}
          </Link>
          <Link
            href="/preorder"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-transparent text-white font-bold text-sm tracking-[0.06em] border-[1.5px] border-[var(--border2)] hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
          >
            {heroPreorderButtonText}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40 text-[10px] tracking-[0.2em] uppercase animate-bounce-scroll">
        <div className="w-5 h-8 border-[1.5px] border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-primary rounded animate-scroll-dot" />
        </div>
        {heroScrollText}
      </div>
    </section>
  )
}

export function PreorderStrip({ cmsContent }: { cmsContent: CmsContent }) {
  const preorderStripStrongText = getContent(cmsContent, 'preorder_strip_strong_text', 'პრი-ორდერი გახსნილია!');
  const preorderStripText = getContent(cmsContent, 'preorder_strip_text', 'დაჯავშნე სადეზირო სნიკერი ევროპიდან — 20%-ით იაფად, მიტანამდე');
  const preorderStripButtonText = getContent(cmsContent, 'preorder_strip_button_text', 'დეტალები →');

  return (
    <div className="bg-gradient-to-r from-primary to-[#7f0a2e] py-4 overflow-hidden">
      <div className="flex items-center justify-center gap-5 flex-wrap max-w-[1300px] mx-auto px-7 text-center">
        <strong className="font-extrabold text-[15px]">{preorderStripStrongText}</strong>
        <span className="text-[13px] opacity-90">
          {preorderStripText}
        </span>
        <Link
          href="/preorder"
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white text-primary font-bold text-xs hover:bg-white/90 transition-colors"
        >
          {preorderStripButtonText}
        </Link>
      </div>
    </div>
  )
}

export function FeaturedSection({ cmsContent }: { cmsContent: CmsContent }) {
  const featuredSectionBadge = getContent(cmsContent, 'featured_section_badge', 'სტრიტვეარ კოლექცია');
  const featuredSectionTitleUrban = getContent(cmsContent, 'featured_section_title_urban', 'URBAN');
  const featuredSectionTitleDeal = getContent(cmsContent, 'featured_section_title_deal', 'DEAL');
  const featuredSectionDescription = getContent(cmsContent, 'featured_section_description', 'საუკეთესო სნიკერები, კლასიკური სტრიტვეარი — ყველაფერი ორიგინალი.');

  const featuredSectionLink1Img = getContent(cmsContent, 'featured_section_link1_img', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80' );
  const featuredSectionLink1Title = getContent(cmsContent, 'featured_section_link1_title', 'ახალი ჩამოსული');
  const featuredSectionLink1Desc = getContent(cmsContent, 'featured_section_link1_desc', 'ექსკლუზიური მოდელები ჩვენ მაღაზიაში');

  const featuredSectionLink2Img = getContent(cmsContent, 'featured_section_link2_img', 'https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=700&q=80' );
  const featuredSectionLink2Title = getContent(cmsContent, 'featured_section_link2_title', 'ურბანული სტილი');
  const featuredSectionLink2Desc = getContent(cmsContent, 'featured_section_link2_desc', 'გამოხატე საკუთარი ვიბი');

  const featuredSectionLink3Img = getContent(cmsContent, 'featured_section_link3_img', 'https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=700&q=80' );
  const featuredSectionLink3Title = getContent(cmsContent, 'featured_section_link3_title', 'პრი-ორდერი');
  const featuredSectionLink3Desc = getContent(cmsContent, 'featured_section_link3_desc', 'დაჯავშნე ახლავე — 20% ფასდაკლება');

  const pillar1Title = getContent(cmsContent, 'pillar1_title', '100% ორიგინალი');
  const pillar1Desc = getContent(cmsContent, 'pillar1_desc', 'ყველა პროდუქტი დადასტურებულია. ყალბ ნივთებს ჩვენ თან არ ვყიდით — გარანტია ყველა შეკვეთაზე.');
  const pillar2Title = getContent(cmsContent, 'pillar2_title', 'ევრო-იმპორტი');
  const pillar2Desc = getContent(cmsContent, 'pillar2_desc', 'პირდაპირ ევროპის მომწოდებლებიდან — საუკეთესო ფასები, ყველაზე ახალი მოდელები.');
  const pillar3Title = getContent(cmsContent, 'pillar3_title', 'სწრაფი მიტანა');
  const pillar3Desc = getContent(cmsContent, 'pillar3_desc', 'თბილისის მასშტაბით სამე-ოთხ სამუშაო დღეში. საქართველოს მასშტაბით — კურიერით.');

  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">
            {featuredSectionBadge}
          </div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-4">
            {featuredSectionTitleUrban} <span className="text-muted-foreground">{featuredSectionTitleDeal}</span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-[500px] leading-relaxed">
            {featuredSectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 mb-16">
          <Link href="/products" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
            <Image
              src={featuredSectionLink1Img}
              alt={featuredSectionLink1Title}
              width={900}
              height={400}
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
              <div>
                <span className="font-black text-[22px] text-primary block mb-1">{featuredSectionLink1Title}</span>
                <p className="text-[13px] text-white/70">{featuredSectionLink1Desc}</p>
              </div>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-5">
            <Link href="/culture" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image
                src={featuredSectionLink2Img}
                alt={featuredSectionLink2Title}
                width={700}
                height={190}
                className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-accent block mb-1">{featuredSectionLink2Title}</span>
                  <p className="text-[13px] text-white/70">{featuredSectionLink2Desc}</p>
                </div>
              </div>
            </Link>

            <Link href="/preorder" className="relative overflow-hidden rounded-[14px] cursor-pointer group">
              <Image
                src={featuredSectionLink3Img}
                alt={featuredSectionLink3Title}
                width={700}
                height={190}
                className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(100,0,0,0.9)] via-transparent to-transparent flex items-end p-7">
                <div>
                  <span className="font-black text-[22px] text-primary block mb-1">{featuredSectionLink3Title}</span>
                  <p className="text-[13px] text-white/70">{featuredSectionLink3Desc}</p>
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
            <h3 className="font-extrabold text-lg mb-2">{pillar1Title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {pillar1Desc}
            </p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg mb-2">{pillar2Title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {pillar2Desc}
            </p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-7 transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-[var(--red-faint)] border border-[rgba(159,18,57,0.2)] rounded-xl flex items-center justify-center mb-4 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg mb-2">{pillar3Title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {pillar3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSection({ cmsContent }: { cmsContent: CmsContent }) {
  const aboutSectionTitlePart1 = getContent(cmsContent, 'about_section_title_part1', 'ჩვენს');
  const aboutSectionTitlePart2 = getContent(cmsContent, 'about_section_title_part2', 'შესახებ');
  const aboutTextParagraph1 = getContent(cmsContent, 'about_text_paragraph1', 'Urban Deal — საქართველოს წამყვანი ონლაინ სნიკერ-მაღაზია. ჩვენ სპეციალიზდებით ევროპიდან ორიგინალი სნიკერებისა და სტრიტვეარ-ბრენდების იმპორტში — Nike, Adidas, New Balance, Puma, Reebok და სხვა.');
  const aboutTextParagraph2 = getContent(cmsContent, 'about_text_paragraph2', 'ჩვენი მისია მარტივია: მოგაწოდოთ ის, რაც გინდათ — ნამდვილი, ახალი, და ფასადეკვატური. სნიკერ-ოსტატები, სტილის მოყვარულები — Urban Deal თქვენი სახლია.');
  const aboutListItem1 = getContent(cmsContent, 'about_list_item1', 'ვერიფიცირებული ორიგინალი პროდუქტები');
  const aboutListItem2 = getContent(cmsContent, 'about_list_item2', 'პრემიუმ ბრენდების სელექცია');
  const aboutListItem3 = getContent(cmsContent, 'about_list_item3', 'ექსპერტული კლიენტ-სერვისი 7/7');
  const aboutListItem4 = getContent(cmsContent, 'about_list_item4', 'უსაფრთხო ონლაინ გადახდა');
  const whyUrbanDealTitle = getContent(cmsContent, 'why_urban_deal_title', 'რატომ Urban Deal?');
  const whyUrbanDealItem1 = getContent(cmsContent, 'why_urban_deal_item1', 'ევროპიდან პირდაპირ — ყველაზე ახალი სნიკერები');
  const whyUrbanDealItem2 = getContent(cmsContent, 'why_urban_deal_item2', 'ყველა ზომა ხელმისაწვდომი — S-დან XXL-მდე');
  const whyUrbanDealItem3 = getContent(cmsContent, 'why_urban_deal_item3', 'პრი-ორდერი 20% ფასდაკლებით');
  const whyUrbanDealItem4 = getContent(cmsContent, 'why_urban_deal_item4', 'სწრაფი მიტანა თბილისსა და მთელ საქართველოში');
  const whyUrbanDealItem5 = getContent(cmsContent, 'why_urban_deal_item5', 'ყველა შეკვეთაზე ავთენტურობის გარანტია');

  return (
    <section className="py-24 bg-card">
      <div className="max-w-[1300px] mx-auto px-7">
        <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground mb-14">
          {aboutSectionTitlePart1} <span className="text-muted-foreground">{aboutSectionTitlePart2}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">
              {aboutTextParagraph1}
            </p>
            <p className="text-[15px] text-[#ccc] leading-relaxed mb-5">
              {aboutTextParagraph2}
            </p>

            <ul className="flex flex-col gap-3 mt-7">
              {[aboutListItem1, aboutListItem2, aboutListItem3, aboutListItem4].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 shadow-[0_0_8px_var(--red-glow)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border-2 border-primary rounded-[14px] p-9 shadow-[0_0_28px_rgba(159,18,57,0.12)]">
            <h3 className="font-black text-2xl text-primary mb-5">{whyUrbanDealTitle}</h3>
            <ul className="flex flex-col gap-3.5">
              {[whyUrbanDealItem1, whyUrbanDealItem2, whyUrbanDealItem3, whyUrbanDealItem4, whyUrbanDealItem5].map((item, i) => (
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

export function ContactSection({ cmsContent }: { cmsContent: CmsContent }) {
  const contactBadge = getContent(cmsContent, 'contact_badge', 'კონტაქტი');
  const contactTitle = getContent(cmsContent, 'contact_title', 'დაგვიკავშირდი');

  return (
    <section className="py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-3">{contactBadge}</div>
          <h2 className="font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
            {contactTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[860px] mx-auto mb-14">
          <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
            <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.32h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l1-1.31a2 2 0 012.11-.45 12.84 12.84 0 002.81 0A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg mb-2">დაგვირეკე</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">+995 592 013 611</p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
            <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg mb-2">მოგვწერე</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">urban.deal.ge@gmail.com</p>
          </div>

          <div className="bg-card border border-border rounded-[14px] p-8 text-center transition-all hover:border-primary hover:shadow-[0_4px_24px_var(--red-glow)]">
            <div className="w-13 h-13 bg-[var(--red-faint)] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg mb-2">მისამართი</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">თბილისი, საქართველო</p>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-sm">
          <p>Urban Deal © 2025. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </section>
  )
}
