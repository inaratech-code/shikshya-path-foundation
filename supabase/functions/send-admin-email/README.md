# send-admin-email

Supabase Edge Function to email the admin when a new lead is received.

## Env vars (set on Supabase, server-side)

- `GMAIL_USER`
- `GMAIL_PASS`

## Deploy

```bash
supabase functions deploy send-admin-email
supabase secrets set GMAIL_USER="..." GMAIL_PASS="..."
```

