# Supabase Auth setup

The app uses Supabase email/password authentication with the PKCE flow and cookie-backed sessions through `@supabase/ssr`.

## Project settings

In the Supabase Dashboard:

1. Under **Authentication → Providers**, enable **Email** and configure whether new users must confirm their email address.
2. Under **Authentication → URL Configuration**, set the **Site URL** to the deployed app origin (for local development, `http://localhost:3000`).
3. Add these entries to **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-PRODUCTION-HOST/auth/callback`
   - Add any preview deployment callback URLs that need password recovery.
4. Under **Authentication → Email Templates → Reset Password**, keep the confirmation link (`{{ .ConfirmationURL }}`) so Supabase can validate the recovery token and redirect to the app callback.

The reset form requests a redirect to `/auth/callback?next=/update-password`. The callback exchanges the one-time PKCE code for a session and then sends the user to `/update-password`. The app intentionally fixes that destination instead of trusting a user-provided redirect parameter.

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the project API settings. The publishable/anon key is intended for client use; do not put a service-role or other secret key in a `NEXT_PUBLIC_` variable.
