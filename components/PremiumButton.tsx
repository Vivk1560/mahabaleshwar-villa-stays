import type { ReactNode } from 'react'
import Link from 'next/link'

interface PremiumButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PremiumButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
}: PremiumButtonProps) {
  const baseStyles =
    'font-lato font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap'

  const variantStyles = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-elevated',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-card',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  }

  const sizeStyles = {
    sm: 'px-3 sm:px-4 py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base',
    lg: 'px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-lg',
  }

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return <button type="button" className={classes}>{children}</button>
}
