"use client"

import Link from "next/link"
import { Settings } from "lucide-react"

export function AdminFloatButton() {
  return (
    <Link
      href="/admin"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-600/30 hover:shadow-xl group"
    >
      <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      <span className="font-semibold text-sm">Admin Panel</span>
    </Link>
  )
}
