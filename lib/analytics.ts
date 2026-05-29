import { supabase } from './supabase'

export async function trackPageView(page: string) {
  try {
    const { data } = await supabase
      .from('site_analytics')
      .select('*')
      .eq('page', page)
      .single()

    if (data) {
      await supabase
        .from('site_analytics')
        .update({ views: (data.views || 0) + 1 })
        .eq('page', page)
    } else {
      await supabase
        .from('site_analytics')
        .insert([{ page, views: 1, visitors: 1 }])
    }
  } catch (error) {
    console.log('Analytics tracking skipped:', error)
  }
}
