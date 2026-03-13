import InnerPageHero from '@/components/InnerPageHero';

export default function PrivacyPage() {
  return (
    <main>
      <InnerPageHero
        title="Privacy Policy"
        description="Learn how Shikshya Path Foundation collects, uses, and protects your personal information."
      />

      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 space-y-10 text-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
          <p className="leading-relaxed">
            We value your privacy and are committed to protecting your personal data. This Privacy Policy explains what
            information we collect, how we use it, and your rights in relation to that information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
          <p className="leading-relaxed mb-3">
            When you contact us, submit a consultation form, or interact with our website, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name and contact details (email, phone number).</li>
            <li>Academic background and study preferences.</li>
            <li>Technical data such as IP address and browser information.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
          <p className="leading-relaxed mb-3">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide counselling and study abroad guidance.</li>
            <li>Respond to your enquiries and consultation requests.</li>
            <li>Improve our services and website experience.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Data Sharing & Security</h2>
          <p className="leading-relaxed">
            We do not sell your personal data. We may share it with trusted partners (such as universities or test
            providers) only when necessary to process your application, and we take reasonable steps to keep your data
            secure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Your Rights</h2>
          <p className="leading-relaxed">
            You can contact us at any time to request access, correction, or deletion of your personal data, subject to
            legal and regulatory requirements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Contact</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please reach out to us at{' '}
            <span className="font-semibold">info@shikshyapath.edu.np</span>.
          </p>
        </div>
      </section>
    </main>
  );
}

