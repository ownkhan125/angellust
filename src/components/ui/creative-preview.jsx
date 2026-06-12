'use client'

import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

// Renders an HTML creative inside a sandboxed iframe and scales it down with
// a CSS transform so the full design is always visible — never cropped.
// The wrapper holds the aspect ratio; the iframe is fixed at the creative's
// native size and shrunk by the measured width / native width ratio.
const CreativePreview = ({
  path,
  width,
  height,
  title,
  className,
  interactive = false,
  loading = 'lazy',
  rounded = true,
}) => {
  const hostRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      setScale(rect.width / width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={hostRef}
      className={cn(
        'relative w-full overflow-hidden bg-[var(--color-ink-2)]',
        rounded && 'rounded-2xl',
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        src={path}
        title={title}
        loading={loading}
        scrolling="no"
        tabIndex={interactive ? 0 : -1}
        sandbox="allow-same-origin"
        className="absolute top-0 left-0 border-0"
        style={{
          width,
          height,
          transform: `scale(${scale || 0.0001})`,
          transformOrigin: 'top left',
          pointerEvents: interactive ? 'auto' : 'none',
          opacity: scale ? 1 : 0,
          transition: 'opacity 0.4s var(--ease-out-quart)',
        }}
      />
    </div>
  )
}

CreativePreview.propTypes = {
  path: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  interactive: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  rounded: PropTypes.bool,
}

export default CreativePreview
