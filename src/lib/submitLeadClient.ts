export type SubmitLeadInput = {
  full_name?: string | null;
  email: string;
  phone?: string | null;
  destination?: string | null;
  message?: string | null;
};

export async function submitLeadPublic(
  input: SubmitLeadInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch('/api/leads/public', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const j = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    return { ok: false, error: typeof j.error === 'string' ? j.error : 'Submission failed' };
  }
  return { ok: true };
}
