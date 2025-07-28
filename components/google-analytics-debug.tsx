'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const GA_TRACKING_ID = 'G-1ZZLC2GJW9'

// Debug version with console logging
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function GoogleAnalyticsDebug() {
  const pathname = usePathname()

  useEffect(() => {
    console.log('🔍 GA Debug - Environment:', process.env.NODE_ENV)
    console.log('🔍 GA Debug - Tracking ID:', GA_TRACKING_ID)
    
    // Load GA script immediately for testing
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    script.async = true
    
    script.onload = () => {
      console.log('✅ GA Debug - Script loaded successfully')
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        console.log('📊 GA Debug - gtag called with:', args)
        window.dataLayer.push(args)
      }
      
      window.gtag = gtag
      
      gtag('js', new Date())
      gtag('config', GA_TRACKING_ID, {
        debug_mode: true, // Enable debug mode
        page_title: document.title,
        page_location: window.location.href,
      })
      
      console.log('✅ GA Debug - Configuration complete')
    }
    
    script.onerror = (error) => {
      console.error('❌ GA Debug - Script loading failed:', error)
    }
    
    document.head.appendChild(script)
  }, [])

  // Track page views
  useEffect(() => {
    console.log('🔍 GA Debug - Page change:', pathname)
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname,
      })
      console.log('📊 GA Debug - Page view tracked:', pathname)
    } else {
      console.log('⚠️ GA Debug - gtag not available yet')
    }
  }, [pathname])
  
  return null
}
