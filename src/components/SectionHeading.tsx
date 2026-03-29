export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Use on photo/dark banner sections */
  tone?: 'light' | 'dark';
}) {
  const alignCls =
    align === 'left' ? 'text-center sm:text-left' : 'text-center';
  const descAlignCls = align === 'left' ? 'mx-auto sm:mx-0' : 'mx-auto';

  const eyebrowTone =
    tone === 'dark' ? 'text-slate-300' : 'text-slate-400';
  const titleTone = tone === 'dark' ? 'text-white' : 'text-slate-900';
  const descTone =
    tone === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`${alignCls}`}>
      {eyebrow && (
        <p className={`text-sm font-bold ${eyebrowTone} uppercase tracking-widest mb-3`}>{eyebrow}</p>
      )}
      <h2
        className={`text-3xl md:text-5xl font-black ${titleTone} mb-4 ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`${descTone} max-w-2xl ${descAlignCls} text-base md:text-lg leading-relaxed text-justify`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

