'use client';

import { ArrowRight, Globe2, BookOpen, GraduationCap, Users, Award, MapPin, Compass, CheckCircle2, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Simple fade-up animation configuration
const fadeUpConfig = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerChildrenConfig = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { staggerChildren: 0.15 }
};

const childFadeConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="min-h-screen">


      <main className="pt-20">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-white pt-24 pb-32">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 -mr-48 -mt-48 w-[40rem] h-[40rem] rounded-full bg-blue-100/40 blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              className="flex flex-col items-start gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-[var(--color-primary-dark)] rounded-full text-sm font-semibold mb-2 shadow-sm">
                <Globe2 size={16} className="text-[var(--color-primary)]" /> 
                Guiding Nepalese Students Globally
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
                Your Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500">Partner</span> for Studying Abroad
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg mt-2">
                We simplify your journey from Nepal to world-class universities in Australia, Canada, UK, USA, and Europe with expert, personalized guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-[var(--color-primary)]/20 text-lg w-full sm:w-auto">
                  Start Your Journey <ArrowRight size={20} />
                </Link>
                <Link href="/destinations" className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 font-semibold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors text-lg w-full sm:w-auto group">
                  Explore Destinations <Compass size={20} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm font-medium text-slate-500">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-800">UoM</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-red-100 flex items-center justify-center text-xs font-bold text-red-800">NYU</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-800">UBC</div>
                </div>
                Trusted by Top Global Universities
              </div>
            </motion.div>
            
            <motion.div 
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Replace with actual high quality image */}
              <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-4 text-slate-400">
                <GraduationCap size={64} className="opacity-20" />
                <span className="font-semibold text-xl">High Quality Hero Image Here</span>
              </div>

              {/* Floating Element 1 */}
              <motion.div 
                className="absolute bottom-10 left-[-30px] md:left-[-40px] glass p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 leading-none">98%</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">Visa Success</div>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                className="absolute top-10 right-[-20px] md:right-[-30px] glass p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-20"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 leading-none">Free Assessment</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">Available today</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- STATISTICS BAR --- */}
        <section className="bg-white border-b border-slate-100 relative z-20 -mt-10 md:-mt-16 mx-4">
          <motion.div 
            className="max-w-6xl mx-auto rounded-3xl shadow-xl shadow-slate-200/50 bg-white p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: <Users size={32} />, stat: "5000+", label: "Students Placed" },
              { icon: <GraduationCap size={32} />, stat: "300+", label: "Universities Partnered" },
              { icon: <Globe2 size={32} />, stat: "20+", label: "Global Destinations" },
              { icon: <Award size={32} />, stat: "10+", label: "Years Experience" }
            ].map((item, idx) => (
              <div key={idx} className="text-center flex flex-col items-center gap-2 group">
                <div className="text-[var(--color-primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--color-primary)]">
                  {item.icon}
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900">{item.stat}</h3>
                <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- FEATURED UNIVERSITIES MARQUEE --- */}
        <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Proudly Partnered With Leading Universities</p>
          </div>
          <div className="relative flex overflow-hidden">
            {/* Gradient Fades for Marquee */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
            
            <div className="flex w-[200%] animate-marquee">
              {/* First Set */}
              <div className="flex w-1/2 justify-around items-center opacity-60 grayscale hover:grayscale-0 transition-all">
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">University of Sydney</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Toronto Met</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Harvard</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Oxford</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">MIT</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">UBC</span>
              </div>
              {/* Second Set (Duplicate for smooth loop) */}
              <div className="flex w-1/2 justify-around items-center opacity-60 grayscale hover:grayscale-0 transition-all">
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">University of Sydney</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Toronto Met</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Harvard</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">Oxford</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">MIT</span>
                 <span className="font-heading font-black pr-12 text-2xl text-slate-400">UBC</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- STUDY DESTINATIONS --- */}
        <section id="destinations" className="py-28 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="text-center mb-16" {...fadeUpConfig}>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Top Study Destinations</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Explore endless opportunities in the world's most welcoming countries for international students. We have you covered globally.
              </p>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-3 gap-8" {...staggerChildrenConfig}>
              {[
                { name: "Australia", desc: "Post-study work rights & world-class lifestyle.", span: "col-span-1" },
                { name: "United Kingdom", desc: "A world-class education with historic prestige and a diverse environment.", span: "col-span-1 md:col-span-2" },
                { name: "Canada", desc: "Affordable education, multicultural society, and excellent permanent residency opportunities.", span: "col-span-1 md:col-span-2" },
                { name: "USA", desc: "Incomparable STEM programs and generous scholarships.", span: "col-span-1" }
              ].map((dest, idx) => (
                <motion.div key={idx} className={`group relative rounded-[2rem] overflow-hidden bg-white shadow-lg cursor-pointer transform transition-all duration-300 h-[28rem] ${dest.span}`} variants={childFadeConfig}>
                  <div className="absolute inset-0 bg-slate-200">
                     <img src={`/api/placeholder/${dest.span.includes('col-span-2') ? '800' : '600'}/800`} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
                    <h3 className="text-4xl font-bold text-white mb-3">{dest.name}</h3>
                    <p className="text-slate-200 mb-6 text-lg max-w-md">{dest.desc}</p>
                    <Link href={`/destinations/${dest.name.toLowerCase()}`} className="inline-flex w-fit items-center gap-2 text-white font-semibold transition-all hover:text-[var(--color-brand-accent)]">
                      Explore Programs <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- OFFERS / SCHOLARSHIPS SECTION --- */}
        <section id="offers" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" {...fadeUpConfig}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold mb-4">
                  <Star size={16} fill="currentColor" /> Limited Time Offers
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">Exclusive Scholarships</h2>
              </div>
              <Link href="/offers" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All Offers <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8" {...staggerChildrenConfig}>
              {[
                { title: "100% Application Fee Waiver", region: "UK Universities", badge: "Expiring Soon", color: "bg-red-500" },
                { title: "$10,000 Merit Scholarship", region: "USA IT Programs", badge: "High Value", color: "bg-green-500" },
                { title: "Free IELTS Preparation", region: "All Branches", badge: "Exclusive", color: "bg-blue-500" }
              ].map((offer, idx) => (
                <motion.div key={idx} variants={childFadeConfig} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-black/5 rounded-bl-[100px] z-0" />
                  <div className="relative z-10">
                    <span className={`inline-block px-3 py-1 ${offer.color} text-white text-xs font-bold rounded-full mb-4`}>{offer.badge}</span>
                    <p className="text-slate-500 font-semibold mb-2">{offer.region}</p>
                    <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[var(--color-primary)] transition-colors">{offer.title}</h3>
                    <button className="font-semibold text-[var(--color-primary)] flex items-center gap-2">
                      Claim Offer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-28 bg-slate-900 text-white relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
           <div className="absolute right-0 top-1/4 w-96 h-96 bg-[var(--color-primary)]/20 blur-[100px] rounded-full" />
           
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16 relative z-10">
            <motion.div className="lg:col-span-1 flex flex-col justify-center" {...fadeUpConfig}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Our Services</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                From finding the right course to settling into your new country, we provide end-to-end support for a seamless transition. Your success is our mission.
              </p>
              <Link href="/services" className="flex items-center gap-2 text-white font-bold text-lg group bg-white/10 hover:bg-white/20 w-fit px-6 py-3 rounded-xl transition-all border border-white/10">
                View All Services <span className="group-hover:translate-x-2 transition-transform"><ArrowRight /></span>
              </Link>
            </motion.div>
            
            <motion.div className="lg:col-span-2 grid sm:grid-cols-2 gap-6" {...staggerChildrenConfig}>
              {[
                { title: "Career Counseling", desc: "Expert advice tailored to your goals.", icon: <Compass size={28} /> },
                { title: "University Selection", desc: "Find the perfect fit for your profile.", icon: <BookOpen size={28} /> },
                { title: "Application Assistance", desc: "Crafting winning applications & SOPs.", icon: <Award size={28} /> },
                { title: "Visa Guidance", desc: "Mock interviews & documentation support.", icon: <MapPin size={28} /> },
              ].map((service, idx) => (
                <motion.div key={idx} variants={childFadeConfig} className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all p-8 rounded-[2rem] group backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- STUDENT TESTIMONIALS --- */}
        <section className="py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="text-center mb-16" {...fadeUpConfig}>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Success Stories</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Hear from our students who have successfully placed in top universities globally.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8" {...staggerChildrenConfig}>
              {[
                { name: "Aarushi M.", uni: "University of Sydney", country: "Australia", text: "The visa process was incredibly smooth. Shikshya Path guided me at every step from SOP drafting to interview prep." },
                { name: "Roshan P.", uni: "Toronto Met University", country: "Canada", text: "I was confused about my options, but the counseling team helped me select a course that fits my career goals perfectly." },
                { name: "Sneha K.", uni: "Aston University", country: "UK", text: "Got an unconditional offer and a 20% scholarship thanks to their application assistance! Highly recommended." },
              ].map((testimonial, idx) => (
                <motion.div key={idx} variants={childFadeConfig} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex gap-1 text-amber-500 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.uni}, {testimonial.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- LATEST NEWS / BLOGS --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" {...fadeUpConfig}>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Latest Insights</h2>
                <p className="text-slate-600 text-lg">Updates, guides, and tips for studying abroad.</p>
              </div>
              <Link href="/blogs" className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Read All Articles <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8" {...staggerChildrenConfig}>
              {[
                { title: "Changes to Australia Student Visa Rules in 2024", date: "March 10, 2024" },
                { title: "How to write a winning SOP for Canadian Universities", date: "March 5, 2024" },
                { title: "Top 10 Affordable Universities in the UK", date: "Feb 28, 2024" }
              ].map((blog, idx) => (
                <motion.div key={idx} variants={childFadeConfig} className="group cursor-pointer">
                  <div className="w-full aspect-video bg-slate-200 rounded-3xl overflow-hidden mb-6">
                    <img src={`/api/placeholder/600/400`} alt="Blog thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-50" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-semibold mb-3">
                    <Calendar size={14} /> {blog.date}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{blog.title}</h3>
                  <span className="text-slate-600 font-medium group-hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1">Read Article <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all" /></span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-24 bg-[var(--color-text-main)] overflow-hidden relative text-white text-center rounded-[3rem] mx-4 md:mx-10 mb-10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-text-main)] opacity-30 z-0" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/20 blur-[100px] rounded-full" />
          
          <motion.div className="max-w-3xl mx-auto px-6 flex flex-col items-center relative z-10" {...fadeUpConfig}>
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8">
              <Globe2 size={40} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to Shape Your Future?</h2>
            <p className="text-slate-300 text-xl mb-10 max-w-xl font-medium">
              Don't leave your dreams to chance. Let our experts guide you to the perfect university abroad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-[var(--color-primary-dark)] font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-blue-900/50 text-xl border border-white">
                Book Your Free Consultation
              </Link>
            </div>
          </motion.div>
        </section>
      </main>


    </div>
  );
}
