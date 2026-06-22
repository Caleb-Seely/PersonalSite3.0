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

// Device tracking
export const trackDeviceType = () => {
  if (typeof window === 'undefined') return

  const width = window.innerWidth
  const height = window.innerHeight
  const category = width <= 768 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop'

  const connection = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number } }).connection
  const ua = navigator.userAgent

  // Rough OS detection from user agent
  let os = 'unknown'
  if (/Windows/.test(ua)) os = 'Windows'
  else if (/Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) os = 'macOS'
  else if (/iPhone/.test(ua)) os = 'iOS'
  else if (/iPad/.test(ua)) os = 'iPadOS'
  else if (/Android/.test(ua)) os = 'Android'
  else if (/Linux/.test(ua)) os = 'Linux'

  // Rough browser detection from user agent
  let browser = 'unknown'
  if (/Edg\//.test(ua)) browser = 'Edge'
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera'
  else if (/Firefox/.test(ua)) browser = 'Firefox'
  else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari'
  else if (/Chrome/.test(ua)) browser = 'Chrome'

  const shouldTrack = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_GA_DEBUG
  if (!shouldTrack) return

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'device_info', {
      device_category: category,
      viewport_width: width,
      viewport_height: height,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      pixel_ratio: window.devicePixelRatio,
      os,
      browser,
      language: navigator.language,
      touch_support: navigator.maxTouchPoints > 0,
      dark_mode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      connection_type: connection?.effectiveType ?? 'unknown',
      connection_downlink: connection?.downlink ?? null,
    })
  }
}