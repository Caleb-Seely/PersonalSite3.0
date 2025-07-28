'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const GA_TRACKING_ID = 'G-1ZZLC2GJW9'

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route changes (Next.js SPA navigation)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_GA_DEBUG) {
      return
    }

    // Track page view once - no retry needed since GA is loaded in head
    if (typeof window !== 'undefined' && window.gtag) {
      if (process.env.NEXT_PUBLIC_GA_DEBUG) {
        console.log('📊 Page view:', pathname)
      }
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}


// Enhanced event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const shouldTrack = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_GA_DEBUG
  if (!shouldTrack) return
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Site-specific tracking functions
export const trackSpotifyInteraction = (action: 'song_submit' | 'playlist_click' | 'currently_playing_view', songName?: string) => {
  trackEvent(action, 'spotify_integration', songName)
}

export const trackStravaInteraction = (action: 'widget_view' | 'activity_load' | 'metric_hover', activityName?: string) => {
  trackEvent(action, 'strava_integration', activityName)
}

export const trackNavigationClick = (destination: string, source: 'nav_menu' | 'hero_cards' | 'footer') => {
  trackEvent('click', 'navigation', `${source}_to_${destination}`)
}

export const trackResumeDownload = () => {
  trackEvent('download', 'resume', 'pdf_download')
}

export const trackProjectInteraction = (projectName: string, action: 'view' | 'click' | 'hover') => {
  trackEvent(action, 'projects', projectName)
}

export const trackRunningDataView = (dataType: 'times' | 'pacing' | 'stats') => {
  trackEvent('view', 'running_data', dataType)
}

export const trackPlaceInteraction = (placeName: string, action: 'view' | 'click') => {
  trackEvent(action, 'places', placeName)
}

export const trackEngagement = (type: 'long_session' | 'return_visitor' | 'deep_scroll') => {
  trackEvent('engagement', 'user_behavior', type)
}

// Mobile vs Desktop tracking
export const trackDeviceType = () => {
  if (typeof window === 'undefined') return
  
  const isMobile = window.innerWidth <= 768
  const deviceType = isMobile ? 'mobile' : 'desktop'
  trackEvent('device_info', 'screen_size', deviceType, window.innerWidth)
}