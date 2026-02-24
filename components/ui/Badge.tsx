import type { HTMLAttributes, ReactNode } from 'react';

type Segment = 'A+' | 'A' | 'B+' | 'B' | 'C';
type BadgeVariant = 'cyan' | 'violet' | 'success' | 'warning' | 'muted' | 'error';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Directly specify a color variant. Overridden by `segment` if both are provided. */
  variant?: BadgeVariant;
  /** HCP segment tier -- automatically maps to the correct color. */
  segment?: Segment;
  /** Render as a small dot indicator instead of text pill. */
  dot?: boolean;
}

const segmentVariantMap: Record<Segment, BadgeVariant> = {
  'A+': 'cyan',
  A: 'violet',
  'B+': 'success',
  B: 'warning',
  C: 'muted',
};

const variantStyles: Record<BadgeVariant, string> = {
  cyan: 'bg-cyan/15 text-cyan border-cyan/25',
  violet: 'bg-violet/15 text-violet border-violet/25',
  success: 'bg-success/15 text-success border-success/25',
  warning: 'bg-warning/15 text-warning border-warning/25',
  muted: 'bg-text-muted/15 text-text-muted border-text-muted/25',
  error: 'bg-error/15 text-error border-error/25',
};

const dotColorStyles: Record<BadgeVariant, string> = {
  cyan: 'bg-cyan',
  violet: 'bg-violet',
  success: 'bg-success',
  warning: 'bg-warning',
  muted: 'bg-text-muted',
  error: 'bg-error',
};

function Badge({ variant, segment, dot = false, className = '', children, ...props }: BadgeProps) {
  const resolvedVariant = segment ? segmentVariantMap[segment] : variant ?? 'muted';

  if (dot) {
    return (
      <span
        className={[
          'inline-flex items-center gap-1.5 text-xs font-medium font-[family-name:var(--font-ibm)]',
          className,
        ].join(' ')}
        {...props}
      >
        <span className={['inline-block h-2 w-2 rounded-full', dotColorStyles[resolvedVariant]].join(' ')} />
        {children}
      </span>
    );
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-0.5',
        'text-[11px] font-semibold leading-none tracking-wide uppercase',
        'font-[family-name:var(--font-ibm)]',
        variantStyles[resolvedVariant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant, Segment };
