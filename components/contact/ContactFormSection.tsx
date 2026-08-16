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

export function ContactFormSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="bg-white py-24" aria-labelledby="contact-form-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal direction="left">
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
                GET IN TOUCH
              </p>
              <h2
                id="contact-form-heading"
                className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
              >
                Get in Touch
              </h2>
              <p className="mb-10 leading-relaxed text-stone-500">
                Subscribe for early access to new releases, private events, and
                the stories behind each composition. Or reach us directly — we
                would love to hear from you.
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
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-4 text-stone-600">
                    <Mail size={20} className="text-amber-700" aria-hidden />
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                )}
                {!contactInfo.address &&
                  !contactInfo.phone &&
                  !contactInfo.email && (
                    <p className="text-sm text-stone-500">
                      Use the form to send us a message — we typically respond
                      within 1–2 business days.
                    </p>
                  )}
              </div>

              <div className="mt-10 flex gap-4">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-stone-600 transition-all duration-300 hover:border-amber-700 hover:bg-amber-700 hover:text-white"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <form
              onSubmit={handleSubmit}
              className="glass-card space-y-6 p-8"
              noValidate={false}
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm tracking-wider text-stone-700"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-stone-200 bg-white/60 px-4 py-3 text-stone-800 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm tracking-wider text-stone-700"
                >
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-lg border border-stone-200 bg-white/60 px-4 py-3 text-stone-800 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm tracking-wider text-stone-700"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-stone-200 bg-white/60 px-4 py-3 text-stone-800 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm tracking-wider text-stone-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-stone-200 bg-white/60 px-4 py-3 text-stone-800 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="How may we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-stone-900 py-3 text-sm tracking-widest text-white transition-all duration-300 hover:bg-amber-700"
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
