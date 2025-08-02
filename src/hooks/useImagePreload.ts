import { useEffect } from 'react'

/**
 * Custom hook to preload images for better performance
 * @param imageSources Array of image URLs to preload
 */
export function useImagePreload(imageSources: string[]) {
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageSources.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      try {
        await Promise.allSettled(imagePromises)
      } catch (error) {
        console.warn('Some images failed to preload:', error)
      }
    }

    preloadImages()
  }, [imageSources])
}
