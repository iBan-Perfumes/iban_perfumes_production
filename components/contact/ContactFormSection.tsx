'use client';

import { useState, FormEvent, type ReactNode } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { contactInfo, getSocialLinks, type SocialLink } from '@/lib/site';

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialIcons: Record<SocialLink['label'], (size: number) => ReactNode> = {
  WhatsApp: (size) => <WhatsAppIcon size={size} />,
  Instagram: (size) => <Instagram size={size} aria-hidden />,
  Facebook: (size) => <Facebook size={size} aria-hidden />,
};

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
                {getSocialLinks().map((s) => {
                  const icon = socialIcons[s.label](18);
                  const iconClass =
                    'flex h-11 w-11 items-center justify-center rounded-full border';

                  if (s.href) {
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`${iconClass} border-stone-200 bg-stone-100 text-stone-600 transition-all duration-300 hover:border-amber-700 hover:bg-amber-700 hover:text-white`}
                      >
                        {icon}
                      </a>
                    );
                  }

                  return (
                    <span
                      key={s.label}
                      aria-disabled="true"
                      aria-label={`${s.label} — coming soon`}
                      title={`${s.label} — coming soon`}
                      className={`${iconClass} pointer-events-none border-stone-200 bg-stone-100 text-stone-400 opacity-60`}
                    >
                      {icon}
                    </span>
                  );
                })}
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
