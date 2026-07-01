"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, MessageSquare } from "lucide-react";
import { INDUSTRIES } from "@/data/catalog";
import { SocialLinks } from "@/components/SocialLinks";

type Errors = Record<string, string>;

export default function ContactPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [ref, setRef] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", clinic: "", field: "General enquiry", subject: "", message: "",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.phone.trim()) next.phone = "Please enter a phone number";
    if (form.message.trim().length < 10) next.message = "Please add a little more detail (10+ characters)";
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setRef("ENQ-" + Math.abs(hashStr(form.email + form.message)).toString(36).slice(0, 7).toUpperCase());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fade-up">
      {/* header */}
      <section className="border-b border-line bg-section">
        <div className="container-page py-12 text-center">
          <span className="chip mx-auto mb-4 w-fit border border-line bg-white text-primary shadow-sm">
            <MessageSquare className="h-4 w-4 text-gold" /> We&apos;re here to help
          </span>
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Contact &amp; enquiries</h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-2">
            Questions about products, bulk pricing or equipment quotes across dental, medical,
            veterinary and physiotherapy? Send us an enquiry and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
        {/* form */}
        <div className="card p-6 md:p-8">
          {ref ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <h2 className="font-display text-2xl font-bold text-ink">Thank you — enquiry received</h2>
              <p className="max-w-md text-ink-2">
                Your reference is <span className="font-mono font-bold text-primary">{ref}</span>. Our team
                will respond by email or phone shortly.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="btn btn-primary">Continue browsing</Link>
                <button onClick={() => { setRef(null); setForm((f) => ({ ...f, subject: "", message: "" })); }} className="btn btn-outline">
                  Send another
                </button>
              </div>
              <p className="mt-4 text-xs text-ink-3">Demo form — no message is actually sent.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <h2 className="font-display text-xl font-bold text-ink">Send an enquiry</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" required />
                <Field label="Clinic / practice" name="clinic" value={form.clinic} onChange={(v) => set("clinic", v)} autoComplete="organization" />
                <Field label="Email" name="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" required />
                <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" required />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-2">Field of interest</span>
                <select name="field" value={form.field} onChange={(e) => set("field", e.target.value)} className="field">
                  <option>General enquiry</option>
                  {INDUSTRIES.map((i) => <option key={i.id}>{i.name}</option>)}
                  <option>Bulk / contract pricing</option>
                  <option>Equipment quote</option>
                </select>
              </label>
              <Field label="Subject" name="subject" value={form.subject} onChange={(v) => set("subject", v)} />
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-2">Message <span className="text-danger">*</span></span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={5}
                  className="field min-h-32 resize-y py-2.5"
                  placeholder="Tell us what you need — products, quantities, timelines…"
                  aria-invalid={!!errors.message}
                />
                {errors.message ? <span role="alert" className="mt-1 block text-xs font-medium text-danger">{errors.message}</span> : null}
              </label>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                <Send className="h-5 w-5" /> Send enquiry
              </button>
            </form>
          )}
        </div>

        {/* details */}
        <aside className="space-y-4">
          <div className="card p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Get in touch</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <a href="tel:+14372682091" className="text-primary hover:underline">+1 437 268 2091</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Mail className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <a href="mailto:info@mankindhealthcare.com" className="break-all text-primary hover:underline">info@mankindhealthcare.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><MapPin className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-ink">Address</p>
                  <p className="text-ink-2">105, Mall Road, Canada</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Clock className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-ink">Hours</p>
                  <p className="text-ink-2">Mon–Fri, 9:00 AM – 6:00 PM (ET)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card bg-ink p-6 text-white">
            <p className="font-display text-lg font-bold">Connect with us</p>
            <p className="mt-1 text-sm text-slate-300">Follow Mankind Healthcare for product news and offers.</p>
            <div className="mt-4"><SocialLinks chip iconClass="h-5 w-5" gap="gap-2.5" /></div>
            <a href="https://wa.me/14372682091" target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-5 w-full">
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  label, name, value, onChange, error, type = "text", required, autoComplete,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-2">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      <input
        name={name} type={type} value={value} required={required} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="field"
        style={error ? { borderColor: "var(--color-danger)" } : undefined}
      />
      {error ? <span role="alert" className="mt-1 block text-xs font-medium text-danger">{error}</span> : null}
    </label>
  );
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
