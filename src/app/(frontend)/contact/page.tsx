'use client';

import InnerPageHero from '@/components/InnerPageHero';
import { Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      <InnerPageHero 
        title="Contact Us" 
        description="Ready to take the first step towards your international education? Reach out to us today for a free consultation." 
      />
      
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Book Your Free Consultation</h2>
          <p className="text-slate-600 mb-10">
            Fill out the form below with your details and study preferences. Our expert counselors will get back to you within 24 hours.
          </p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50" placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50" placeholder="john@example.com" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50" placeholder="+977 98XXXXXXX" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Study Destination</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50">
                <option value="">Select a country</option>
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="usa">United States</option>
                <option value="europe">Europe</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message or Questions</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50" placeholder="Tell us about your educational background and goals..."></textarea>
            </div>
            
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-[var(--color-primary)]/20 text-lg">
              Submit Request <Send size={20} />
            </button>
          </form>
        </div>
        
        {/* Contact Info & Map */}
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Our Location</h2>
          <p className="text-slate-600 mb-10">
            Visit our head office for an in-person session, or give us a call.
          </p>
          
          <div className="w-full h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            {/* Placeholder Google Maps iframe pointing to Kathmandu */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.316259508544!2d85.2849329769389!3d27.70895594440051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1709848123412!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
