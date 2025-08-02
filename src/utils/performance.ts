// Performance utilities for monitoring and optimization

export const measurePageLoad = () => {
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    return {
      // Critical metrics
      domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
      loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
      firstPaint: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
      
      // Network timings
      dns: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
      tcp: Math.round(perfData.connectEnd - perfData.connectStart),
      ttfb: Math.round(perfData.responseStart - perfData.requestStart),
      
      // Resource loading
      resourceLoad: Math.round(perfData.loadEventEnd - perfData.domContentLoadedEventEnd)
    }
  }
  return null
}

export const preloadResource = (url: string, as: 'image' | 'script' | 'style' = 'image') => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  link.as = as
  document.head.appendChild(link)
}

export const prefetchResource = (url: string) => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  document.head.appendChild(link)
}

export const measureComponentRender = (componentName: string) => {
  const startTime = performance.now()
  
  return () => {
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    if (renderTime > 16) { // More than 1 frame at 60fps
      console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`)
    }
    
    return renderTime
  }
}

// Web Vitals monitoring
export const measureWebVitals = () => {
  if ('web-vital' in window) {
    // This would integrate with web-vitals library if added
    // For now, we'll use basic performance API
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming
          console.log('FID:', fidEntry.processingStart - entry.startTime)
        }
      }
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
  }
}
