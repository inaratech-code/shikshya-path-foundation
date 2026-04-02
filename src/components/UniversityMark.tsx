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

/** Brand blue (#015290) + green (#257e43) gradients — distinct pairs per hash */
const PALETTE: Array<[string, string]> = [
  ['#015290', '#257e43'],
  ['#0d6ea3', '#257e43'],
  ['#015290', '#3d9a5c'],
  ['#1273a8', '#257e43'],
  ['#013a5c', '#257e43'],
  ['#015290', '#1a5c30'],
  ['#0f6fa3', '#3d9a5c'],
  ['#014a6e', '#257e43'],
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

