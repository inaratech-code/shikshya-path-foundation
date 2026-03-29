/** Row shape for `public.leads` (Supabase). */
export type LeadRecord = {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  destination: string | null;
  message: string | null;
  status: string;
  created_at: string;
};
