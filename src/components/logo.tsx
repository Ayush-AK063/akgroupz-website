export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="ak-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3b4ff" />
          <stop offset="0.55" stopColor="#8b6cff" />
          <stop offset="1" stopColor="#ffb547" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#0c0c13" stroke="url(#ak-g)" strokeWidth="1.5" />
      {/* A */}
      <path d="M9 29 L16 11 L23 29" fill="none" stroke="url(#ak-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 23 H20" stroke="url(#ak-g)" strokeWidth="2.6" strokeLinecap="round" />
      {/* K */}
      <path d="M26 11 V29 M26 21 L32 11 M27.5 19 L32.5 29" fill="none" stroke="url(#ak-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">
        AK<span className="text-muted">groupz</span>
      </span>
    </span>
  );
}
