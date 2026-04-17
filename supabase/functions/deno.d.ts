/**
 * Minimal Deno runtime types for Supabase Edge Functions.
 *
 * This repo is typechecked with TypeScript/Next tooling (not Deno's language server),
 * so we declare the small subset we use to avoid `Cannot find name 'Deno'`.
 */
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

declare module "npm:nodemailer" {
  type MailOptions = {
    from?: string | null;
    to: string;
    subject: string;
    html?: string;
    text?: string;
  };

  type Transporter = {
    sendMail(options: MailOptions): Promise<unknown>;
  };

  const nodemailer: {
    createTransport(options: unknown): Transporter;
  };
  export default nodemailer;
}

