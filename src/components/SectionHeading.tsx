export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  const alignCls = align === 'left' ? 'text-left' : 'text-center';
  const descAlignCls = align === 'left' ? 'mx-0' : 'mx-auto';

  return (
    <div className={`${alignCls}`}>
      {eyebrow && (
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{title}</h2>
      {description && (
        <p className={`text-slate-600 max-w-2xl ${descAlignCls} text-base md:text-lg leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}

