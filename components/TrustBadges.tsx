import { CheckCircle2 } from 'lucide-react'

interface TrustBadgesProps {
  title?: string
  badges: string[]
  className?: string
}

export function TrustBadges({ title, badges, className = '' }: TrustBadgesProps) {
  return (
    <div className={className}>
      {title ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
          {title}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs sm:text-sm font-medium text-foreground shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}
