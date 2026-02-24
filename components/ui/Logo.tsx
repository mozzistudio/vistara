type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  size?: LogoSize;
  className?: string;
  /** When true, only render the icon mark (no wordmark). */
  iconOnly?: boolean;
}

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 120, height: 30 },
  md: { width: 180, height: 45 },
  lg: { width: 240, height: 60 },
};

const iconOnlySizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 28, height: 28 },
  md: { width: 40, height: 40 },
  lg: { width: 56, height: 56 },
};

function Logo({ size = 'md', iconOnly = false, className = '' }: LogoProps) {
  if (iconOnly) {
    const { width, height } = iconOnlySizeMap[size];
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 56 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Vistara"
        role="img"
      >
        <circle cx="12" cy="30" r="5" fill="#22D3EE" />
        <circle cx="28" cy="14" r="4" fill="#8B5CF6" />
        <circle cx="28" cy="46" r="4" fill="#8B5CF6" />
        <circle cx="44" cy="30" r="6" stroke="url(#g1-icon)" strokeWidth="2" fill="none" />
        <line x1="16" y1="27" x2="24" y2="16" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
        <line x1="16" y1="33" x2="24" y2="44" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
        <line x1="32" y1="16" x2="40" y2="27" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
        <line x1="32" y1="44" x2="40" y2="33" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="g1-icon" x1="38" y1="24" x2="50" y2="36">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  const { width, height } = sizeMap[size];
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vistara"
      role="img"
    >
      <circle cx="12" cy="30" r="5" fill="#22D3EE" />
      <circle cx="28" cy="14" r="4" fill="#8B5CF6" />
      <circle cx="28" cy="46" r="4" fill="#8B5CF6" />
      <circle cx="44" cy="30" r="6" stroke="url(#g1)" strokeWidth="2" fill="none" />
      <line x1="16" y1="27" x2="24" y2="16" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
      <line x1="16" y1="33" x2="24" y2="44" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="16" x2="40" y2="27" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="44" x2="40" y2="33" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      <text
        x="62"
        y="38"
        fontFamily="Syne"
        fontWeight="700"
        fontSize="26"
        fill="#F8FAFC"
        letterSpacing="-1"
      >
        Vistara
      </text>
      <defs>
        <linearGradient id="g1" x1="38" y1="24" x2="50" y2="36">
          <stop stopColor="#22D3EE" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { Logo };
export type { LogoProps, LogoSize };
