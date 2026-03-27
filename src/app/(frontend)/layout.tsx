import FrontendShell from '@/components/FrontendShell';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FrontendShell>{children}</FrontendShell>
  );
}
