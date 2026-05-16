"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-[200] bg-[rgba(13,13,13,0.96)] backdrop-blur-xl border-b border-[var(--border)]">
        <div className="flex items-center justify-between max-w-[1300px] mx-auto px-7 py-3.5">
          <Link href="/" className="cursor-pointer">
            <div className="flex flex-col items-center gap-0.5">
              <div className="border-[2.5px] border-primary px-3 py-1 relative before:content-[''] before:absolute before:left-[-4px] before:top-[-4px] before:w-1 before:h-[calc(100%+8px)] before:bg-primary">
                <span className="font-bold text-xl tracking-wide bg-gradient-to-br from-[#8a8fa8] via-[#6b7080] to-[#8a8fa8] bg-clip-text text-transparent">
                  Urban Deal
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-[#8a8fa8]">U-DEAL</span>
            </div>
          </Link>

          <ul className="hidden md:flex gap-1.5 items-center">
            <li>
              <Link
                href="/"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground px-3 py-2 rounded-md transition-colors hover:text-foreground hover:bg-white/5"
              >
                მთავარი
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground px-3 py-2 rounded-md transition-colors hover:text-foreground hover:bg-white/5"
              >
                პროდუქტები
              </Link>
            </li>
            <li>
              <Link
                href="/preorder"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-white px-3 py-2 rounded-md bg-primary shadow-[0_0_16px_var(--red-glow)] hover:bg-[var(--red-light)]"
              >
                პრი-ორდერი
              </Link>
            </li>
            <li>
              <Link
                href="/culture"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground px-3 py-2 rounded-md transition-colors hover:text-foreground hover:bg-white/5"
              >
                სტილი
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground px-3 py-2 rounded-md transition-colors hover:text-foreground hover:bg-white/5"
              >
                კონტაქტი
              </Link>
            </li>
          </ul>

          <Link
            href="/products"
            className="hidden md:inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_4px_18px_var(--red-glow)] hover:bg-[var(--red-light)] hover:shadow-[0_6px_28px_rgba(190,18,60,0.55)] transition-all hover:-translate-y-0.5"
          >
            შეიძინე
          </Link>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/97 z-[300] flex flex-col items-center justify-center gap-6 transition-all ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          className="absolute top-5 right-6 text-muted-foreground text-3xl"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="text-4xl font-black text-foreground hover:text-primary transition-colors"
        >
          მთავარი
        </Link>
        <Link
          href="/products"
          onClick={() => setMobileOpen(false)}
          className="text-4xl font-black text-foreground hover:text-primary transition-colors"
        >
          პროდუქტები
        </Link>
        <Link
          href="/preorder"
          onClick={() => setMobileOpen(false)}
          className="text-4xl font-black text-primary hover:text-primary transition-colors"
        >
          პრი-ორდერი
        </Link>
        <Link
          href="/culture"
          onClick={() => setMobileOpen(false)}
          className="text-4xl font-black text-foreground hover:text-primary transition-colors"
        >
          სტილი
        </Link>
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="text-4xl font-black text-foreground hover:text-primary transition-colors"
        >
          კონტაქტი
        </Link>
      </div>
    </>
  )
}
