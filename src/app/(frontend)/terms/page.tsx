import InnerPageHero from '@/components/InnerPageHero';

export default function TermsPage() {
  return (
    <main>
      <InnerPageHero
        title="Terms of Service"
        description="Please review the terms and conditions for using the Shikshya Path Foundation website and services."
      />

      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 space-y-10 text-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By using this website or engaging with our counselling and application services, you agree to these Terms
            of Service. If you do not agree, please discontinue use of the website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Services</h2>
          <p className="leading-relaxed">
            Shikshya Path Foundation provides education counselling, application guidance, and related advisory
            services. While we strive for accuracy and transparency, admission and visa decisions are always made by the
            respective institutions and authorities.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Use of Website</h2>
          <p className="leading-relaxed mb-3">
            You agree not to misuse this website, including (but not limited to):
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Submitting false or misleading information.</li>
            <li>Attempting to interfere with site security or performance.</li>
            <li>Copying content without permission where prohibited.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Liability</h2>
          <p className="leading-relaxed">
            We aim to provide reliable guidance, but we are not liable for losses arising from admission outcomes, visa
            decisions, or changes to university or immigration policies beyond our control.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Changes to Terms</h2>
          <p className="leading-relaxed">
            We may update these Terms of Service from time to time. Continued use of the website after changes are
            posted constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Contact</h2>
          <p className="leading-relaxed">
            For questions about these terms, please contact us at{' '}
            <span className="font-semibold">info@shikshyapath.edu.np</span>.
          </p>
        </div>
      </section>
    </main>
  );
}

