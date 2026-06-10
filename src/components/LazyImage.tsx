import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  /** Applied to the <img> itself (object-fit, etc.). */
  imgClassName?: string
  sizes?: string
}

/**
 * Native-lazy image with a subtle fade-in once decoded.
 * The wrapper holds a faint paper-tinted placeholder while loading.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  sizes,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span
      className={`block overflow-hidden bg-ink-08 ${className}`}
      aria-hidden={false}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full transition-opacity duration-700 ease-editorial ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </span>
  )
}
