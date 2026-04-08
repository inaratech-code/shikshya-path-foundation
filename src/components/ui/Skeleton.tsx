import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const roundMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

/** Shimmer skeleton — prefer over spinners for layout-stable loading. */
export default function Skeleton({ className = '', rounded = 'lg', ...rest }: Props) {
  return (
    <div
      role="presentation"
      className={`skeleton-shimmer bg-slate-200/80 ${roundMap[rounded]} ${className}`}
      {...rest}
    />
  );
}
