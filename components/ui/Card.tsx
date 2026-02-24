'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type GlowColor = 'cyan' | 'violet' | 'none';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: GlowColor;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const glowStyles: Record<GlowColor, string> = {
  cyan: 'shadow-[0_0_20px_rgba(34,211,238,0.15),0_0_60px_rgba(34,211,238,0.05)]',
  violet: 'shadow-[0_0_20px_rgba(139,92,246,0.15),0_0_60px_rgba(139,92,246,0.05)]',
  none: '',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glow = 'none', padding = 'md', hoverable = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'rounded-2xl',
          'bg-surface/70 backdrop-blur-xl',
          'border border-border',
          glowStyles[glow],
          paddingStyles[padding],
          hoverable
            ? 'transition-all duration-300 ease-out hover:border-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:-translate-y-0.5'
            : '',
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/* ── Sub-components ────────────────────────────────────────── */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={['mb-4 flex items-center justify-between', className].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Tag = 'h3', className = '', children, ...props }, ref) => (
    <Tag
      ref={ref}
      className={[
        'font-[family-name:var(--font-syne)] font-semibold text-text',
        Tag === 'h2' ? 'text-xl' : Tag === 'h3' ? 'text-lg' : 'text-base',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
);
CardTitle.displayName = 'CardTitle';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
export type { CardProps, GlowColor };
