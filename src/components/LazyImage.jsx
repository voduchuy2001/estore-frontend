import { useEffect, useRef, useState } from 'react'

const LazyImage = ({ className, src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.unobserve(entry.target)
        }
      })
    })

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : ''}
      alt={alt}
      loading="lazy"
      className={className}
    />
  )
}

export default LazyImage
