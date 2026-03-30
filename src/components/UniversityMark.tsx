type Props = {
  name: string;
  className?: string;
};

function hashString(input: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function initials(name: string): string {
  const parts = name
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3);
  const chars = parts.map((p) => p[0] ?? '').join('');
  return chars.toUpperCase() || 'U';
}

const PALETTE: Array<[string, string]> = [
  ['#2563EB', '#06B6D4'], // blue → cyan
  ['#4F46E5', '#EC4899'], // indigo → pink
  ['#0EA5E9', '#22C55E'], // sky → green
  ['#F97316', '#EF4444'], // orange → red
  ['#10B981', '#22C55E'], // emerald → green
  ['#7C3AED', '#3B82F6'], // violet → blue
  ['#E11D48', '#F59E0B'], // rose → amber
  ['#0891B2', '#6366F1'], // cyan → indigo
];

export default function UniversityMark({ name, className = '' }: Props) {
  const h = hashString(name.toLowerCase().trim());
  const [a, b] = PALETTE[h % PALETTE.length] ?? PALETTE[0]!;
  const id = `g-${(h % 1_000_000).toString(10)}`;

  return (
    <svg
      viewBox="0 0 160 48"
      className={className}
      role="img"
      aria-label={name}
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="160" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="48" rx="14" fill={`url(#${id})`} />
      <rect x="0.5" y="0.5" width="159" height="47" rx="13.5" fill="none" stroke="rgba(255,255,255,0.22)" />
      <text
        x="80"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        fill="white"
        fontFamily="var(--font-outfit), ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1"
      >
        {initials(name)}
      </text>
    </svg>
  );
}

