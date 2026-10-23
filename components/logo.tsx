import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  strokeWidth?: number
}

/**
 * The Safe Net folded-shield mark. Drawn as paths so it stays crisp at any
 * size and always sits cleanly on the dark canvas.
 */
export function LogoMark({ className, strokeWidth = 1.6 }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d="M24 3.5 44 11.6v15.6c0 12.2-8.1 20.7-20 25.3C12.1 47.9 4 39.4 4 27.2V11.6L24 3.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path
        d="M24 11.8 12 7v20.2c0 7.1 4.7 13 12 16.6"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinejoin="round"
        opacity="0.72"
      />
      <path
        d="M24 11.8 36 7v20.2c0 7.1-4.7 13-12 16.6"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.75}
        strokeLinejoin="round"
        opacity="0.72"
      />
      <path d="M24 4v43.2" stroke="currentColor" strokeWidth={strokeWidth * 0.6} opacity="0.5" />
      <path
        d="m17.5 6.2 6.5 6 6.5-6"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-start gap-[0.16em] leading-none', className)}>
      <span className="font-medium tracking-[-0.04em]">Safe&nbsp;Net</span>
      <span className="mt-[0.16em] font-mono text-[0.48em] tracking-[0.16em] text-electric/80">LLC</span>
    </span>
  )
}
