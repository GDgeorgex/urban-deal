"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  isPreorderPage?: boolean
}

export function ProductCard({ product, isPreorderPage = false }: ProductCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const isPreorder = isPreorderPage || product.isPreorder
  const images = product.imgs?.length ? product.imgs : [product.img]

  const waText = isPreorder
    ? `გამარჯობა! ${product.name}-ზე პრი-ორდერი მინდა (${product.brand}). რა დეტალებია?`
    : `გამარჯობა! ${product.name}-ზე (${product.brand}) ინტერესი მაქვს. მეტი ინფო?`

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("ka-GE", { day: "numeric", month: "long", year: "numeric" })
    } catch {
      return dateString
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="bg-card border border-border rounded-[14px] overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-[0_10px_40px_rgba(159,18,57,0.2)] hover:-translate-y-1.5">
        <div
          className="relative bg-[#111] p-4 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          {isPreorder && (
            <div className="absolute top-4 left-4 bg-accent text-black text-[10px] font-extrabold tracking-wide px-2.5 py-0.5 rounded z-10">
              PRE-ORDER
            </div>
          )}
          <Image
            src={product.img}
            alt={product.name}
            width={400}
            height={260}
            className="w-full h-[260px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`absolute top-6 right-6 text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wide uppercase ${
              isPreorder ? "bg-accent text-black" : "bg-primary text-white"
            }`}
          >
            {isPreorder ? "PRE-ORDER" : product.cat}
          </span>
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              {images.length}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-1">
            {product.brand}
          </div>
          <h3 className="text-xl font-black tracking-tight text-foreground mb-1.5 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3.5 min-h-[36px]">
            {product.desc}
          </p>

          {isPreorder && product.expectedArrival && (
            <div className="text-[11px] text-accent font-semibold mb-2.5">
              მოსალოდნელი ჩამოსვლა: {formatDate(product.expectedArrival)}
            </div>
          )}

          {isPreorder ? (
            <div className="mb-3">
              <span className="text-2xl font-black text-primary">{product.preorderPrice || product.price}</span>
              <span className="text-[13px] text-[var(--fg3)] line-through ml-2">
                {product.regularPrice || product.price}
              </span>
              <span className="text-xs font-bold text-accent ml-2">-{product.discountPct || 0}%</span>
            </div>
          ) : (
            <div className="text-2xl font-black text-primary mb-2.5">{product.price}</div>
          )}

          <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--fg3)] mb-1.5">
            ხელმისაწვდომი ზომები
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2.5 py-0.5 bg-background border border-border rounded text-[11px] text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>

          <a
            href={`https://wa.me/995592013611?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-lg text-xs font-bold tracking-[0.06em] transition-all hover:bg-[var(--red-light)] hover:shadow-[0_4px_18px_var(--red-glow)] hover:-translate-y-0.5"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {isPreorder ? "პრი-ორდერი WhatsApp-ით" : "WhatsApp-ით შეკვეთა"}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[600] flex flex-col items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false)
          }}
        >
          <button
            className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl transition-opacity"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            width={800}
            height={600}
            className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg"
          />

          {images.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-5 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-2 mt-5 flex-wrap justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(i)
                    }}
                    className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                      i === currentImageIndex ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-85"
                    }`}
                  >
                    <Image src={img} alt="" width={64} height={48} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="mt-3 text-[13px] text-white/60 tracking-wide">
            {currentImageIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
