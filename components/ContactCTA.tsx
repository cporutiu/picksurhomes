"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle, Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import FadeUp from "./FadeUp";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.includes("@")) next.email = "Enter a valid email address.";
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferred_contact: form.amount,
          message: form.message,
          subject: "New enquiry from Picksur Homes website",
          replyto: "cporutiu@picksur.com",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrors({ message: "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-zinc-950 border-t border-zinc-800/40"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-16">
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-[0.15em]">
                Get Started
              </div>
              <div className="font-mono text-6xl font-bold text-zinc-800 mt-2 select-none">
                05
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08]">
                Get in
                <br />
                touch.
              </h2>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
          {/* Form */}
          <FadeUp delay={0.08}>
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <CheckCircle
                  size={40}
                  weight="fill"
                  className="text-amber-400"
                />
                <div>
                  <div className="font-display text-xl font-semibold text-zinc-100">
                    We received your request.
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-[48ch]">
                    A member of our team will follow up within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Katherine Hale"
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors duration-200"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="k.hale@email.com"
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors duration-200"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Phone{" "}
                      <span className="text-zinc-700 normal-case tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+1 (312) 847-1928"
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors duration-200"
                    />
                  </div>

                  {/* Preferred Contact */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Preferred Contact Via
                    </label>
                    <select
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors duration-200 appearance-none"
                    >
                      <option value="" disabled>
                        Select preference
                      </option>
                      <option value="phone">Phone Call</option>
                      <option value="sms">SMS / Text</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    Message{" "}
                    <span className="text-zinc-700 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your investment goals or any specific questions..."
                    rows={4}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors duration-200 resize-none"
                  />
                </div>

                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-zinc-950 text-sm font-semibold rounded-md hover:bg-amber-300 transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight size={15} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeUp>

          {/* Contact info */}
          <FadeUp delay={0.15}>
            <div className="space-y-8 lg:pt-2">
              <div>
                <div className="text-xs text-zinc-600 uppercase tracking-widest mb-4">
                  Direct Contact
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: EnvelopeSimple,
                      label: "info@quicknotedeals.com",
                    },
                    { icon: Phone, label: "(201) 361-6055" },
                    { icon: MapPin, label: "Clifton, New Jersey 07013" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 text-sm text-zinc-400"
                    >
                      <Icon
                        size={15}
                        weight="regular"
                        className="text-zinc-600 flex-shrink-0"
                      />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
