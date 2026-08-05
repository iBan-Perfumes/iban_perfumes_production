'use client';

import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { contactInfo } from '@/lib/site';

const socials = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Twitter, label: 'Twitter' },
] as const;

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal direction="left">
            <div>
              <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">GET IN TOUCH</p>
              <h2 className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                Get in Touch
              </h2>
              <p className="text-stone-500 leading-relaxed mb-10">
                Subscribe for early access to new releases, private events, and the stories behind
                each composition. Or reach us directly — we would love to hear from you.
              </p>

              <div className="space-y-5">
                {contactInfo.address && (
                  <div className="flex items-center gap-4 text-stone-600">
                    <MapPin size={20} className="text-amber-700" aria-hidden />
                    <span>{contactInfo.address}</span>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-4 text-stone-600">
                    <Phone size={20} className="text-amber-700" aria-hidden />
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-4 text-stone-600">
                    <Mail size={20} className="text-amber-700" aria-hidden />
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                )}
                {!contactInfo.address && !contactInfo.phone && !contactInfo.email && (
                  <p className="text-sm text-stone-500">
                    Use the form to send us a message — we typically respond within 1–2 business days.
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-10">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6" noValidate={false}>
              <div>
                <label htmlFor="contact-name" className="block text-stone-700 text-sm mb-2 tracking-wider">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-stone-700 text-sm mb-2 tracking-wider">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-stone-700 text-sm mb-2 tracking-wider">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="How may we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-stone-900 text-white tracking-widest text-sm hover:bg-amber-700 transition-all duration-300"
                aria-live="polite"
              >
                {sent ? 'MESSAGE SENT — THANK YOU' : 'SEND MESSAGE'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
