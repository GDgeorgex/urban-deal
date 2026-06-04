"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const track = async () => {
      const { data } = await supabase
        .from("site_analytics")
        .select("id, views")
        .eq("page", pathname)
        .single()

      if (data) {
        await supabase
          .from("site_analytics")
          .update({ views: data.views + 1 })
          .eq("id", data.id)
      } else {
        await supabase
          .from("site_analytics")
          .insert({ page: pathname, views: 1, visitors: 1 })
      }
    }

    track()
  }, [pathname])

  return null
}
