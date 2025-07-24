'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const GA_TRACKING_ID = 'G-1ZZLC2GJW9'

// Initialize Google Analytics with performance optimizations
export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only load GA in production
    if (process.env.NODE_ENV !== 'production') return

    // Use requestIdleCallback to load GA when browser is idle
    // This ensures it doesn't interfere with critical rendering
    const loadGA = () => {
      // Create and load gtag script asynchronously
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
      script.async = true
      
      // Load with low priority to not block main thread
      script.setAttribute('importance', 'low')
      
      script.onload = () => {
        // Initialize gtag after script loads
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          window.dataLayer.push(args)
        }
        
        // Make gtag globally available
        ;(window as any).gtag = gtag
        
        gtag('js', new Date())
        gtag('config', GA_TRACKING_ID, {
          // Optimize for performance
          page_title: document.title,
          page_location: window.location.href,
          // Reduce data collection for better performance
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure',
          // Enable enhanced measurement for better insights
          enhanced_measurement: {
            scrolls: true,
            outbound_clicks: true,
            site_search: false,
            video_engagement: false,
            file_downloads: true
          }
        })
        
        // Set up site-specific tracking
        setupSiteSpecificTracking()
      }
      
      document.head.appendChild(script)
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(loadGA)
    } else {
      setTimeout(loadGA, 100)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    
    const url = pathname + searchParams.toString()
    
    // Only track if gtag is loaded
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('config', GA_TRACKING_ID, {
        page_path: url,
      })
      
      // Track section-specific page views
      trackPageSection(pathname)
    }
  }, [pathname, searchParams])
  
  return null
}

// Site-specific tracking setup
function setupSiteSpecificTracking() {
  if (typeof window === 'undefined') return
  
  // Track typewriter animation completion on homepage
  const observeTypewriter = () => {
    const typewriterElements = document.querySelectorAll('[class*="typewriter"], [class*="typing"]')
    typewriterElements.forEach(element => {
      const observer = new MutationObserver(() => {
        if (element.textContent && element.textContent.length > 0) {
          trackEvent('engagement', 'typewriter', 'animation_complete', element.textContent.length)
        }
      })
      observer.observe(element, { childList: true, subtree: true, characterData: true })
    })
  }
  
  // Track scroll depth on homepage hero section
  let maxScrollDepth = 0
  const trackScrollDepth = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
      maxScrollDepth = scrollPercent
      trackEvent('engagement', 'scroll_depth', `${scrollPercent}%`, scrollPercent)
    }
  }
  
  // Track time spent on different sections
  const trackTimeOnSection = () => {
    const sections = ['hero', 'about', 'spotify', 'projects']
    const sectionTimes: Record<string, number> = {}
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id
        if (entry.isIntersecting) {
          sectionTimes[sectionId] = Date.now()
        } else if (sectionTimes[sectionId]) {
          const timeSpent = Math.round((Date.now() - sectionTimes[sectionId]) / 1000)
          if (timeSpent > 3) { // Only track if spent more than 3 seconds
            trackEvent('engagement', 'section_time', sectionId, timeSpent)
          }
          delete sectionTimes[sectionId]
        }
      })
    }, { threshold: 0.5 })
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })
  }
  
  // Set up tracking with delay to ensure DOM is ready
  setTimeout(() => {
    observeTypewriter()
    trackTimeOnSection()
    window.addEventListener('scroll', trackScrollDepth, { passive: true })
  }, 2000)
}

// Track page section visits
function trackPageSection(pathname: string) {
  const sectionMap: Record<string, string> = {
    '/': 'homepage',
    '/projects': 'projects_page',
    '/pacing': 'running_times',
    '/places': 'places_page'
  }
  
  const section = sectionMap[pathname] || 'other'
  trackEvent('navigation', 'page_visit', section)
}

// Enhanced event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (process.env.NODE_ENV !== 'production') return
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
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

// Declare global gtag types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
