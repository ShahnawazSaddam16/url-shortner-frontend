"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import {
  LifeBuoy,
  MessageCircle,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Zap,
  ShieldCheck,
  BarChart2,
  QrCode,
  Link2,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const faqs = [
  {
    q: "How do I create a short link?",
    a: "Simply paste your long URL into the dashboard input field, click shorten, and your smart link is instantly ready to share and track.",
  },
  {
    q: "Can I see analytics for my links?",
    a: "Yes — every link comes with detailed analytics including click counts, geographic data, device breakdown, and referral sources, all in your dashboard.",
  },
  {
    q: "How do I generate a QR code?",
    a: "After creating a short link, open its detail view and hit 'Generate QR'. You can download it as a PNG or SVG instantly.",
  },
  {
    q: "Are my links password protected?",
    a: "Yes. When creating a link you can enable password protection so only people with the correct password can access the destination URL.",
  },
  {
    q: "What happens when my plan expires?",
    a: "Your existing links remain active but you won't be able to create new ones until you renew. Upgrade anytime from Plan History.",
  },
  {
    q: "How do I contact support directly?",
    a: "Use the contact form on this page or email us at support@linkly.io. We typically respond within a few hours on business days.",
  },
];

const topics = [
  { icon: <Link2 size={18} />, label: "Link Management", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: <BarChart2 size={18} />, label: "Analytics", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: <QrCode size={18} />, label: "QR Codes", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: <ShieldCheck size={18} />, label: "Security", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: <Zap size={18} />, label: "Plans & Billing", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: <BookOpen size={18} />, label: "Getting Started", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const Support = () => {
  const router = useRouter();
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || !data.success) router.push("/");
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [router, API_ORIGIN]);

  if (loading) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(`${API_ORIGIN}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
      }
    } catch (err) {
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .fade-up { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-1 { animation-delay: 0.04s; }
        .fade-up-2 { animation-delay: 0.10s; }
        .fade-up-3 { animation-delay: 0.17s; }
        .fade-up-4 { animation-delay: 0.24s; }
        .fade-up-5 { animation-delay: 0.31s; }
        .fade-up-6 { animation-delay: 0.38s; }
        .shimmer-btn {
          background: linear-gradient(90deg,#7c3aed 0%,#a855f7 40%,#c084fc 60%,#7c3aed 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .float-icon { animation: float 3.5s ease-in-out infinite; }
        .topic-card {
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease, background 0.2s ease;
        }
        .topic-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(124,58,237,0.10);
          background: #faf5ff;
        }
        .faq-item {
          transition: background 0.2s ease;
        }
        .faq-item:hover {
          background: #faf5ff;
        }
        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.18);
        }
        .send-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.30);
        }
      `}</style>

      <Navbar />

      <section className="mt-20 mb-20 px-4 sm:px-8 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-14">

          <div className="fade-up fade-up-1 text-center flex flex-col items-center gap-4">
            <div className="float-icon w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center text-purple-500 mx-auto">
              <LifeBuoy size={30} />
            </div>
            <h1 className={`${montserrat.className} text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight`}>
              How can we{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#7c3aed 0%,#c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                help you?
              </span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg leading-relaxed">
              Browse our help topics, explore FAQs, or send us a message — we're here whenever you need us.
            </p>
          </div>

          <div className="fade-up fade-up-2">
            <h2 className={`${montserrat.className} text-base font-bold text-gray-800 mb-4`}>Browse by Topic</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {topics.map((t, i) => (
                <button
                  key={i}
                  className={`topic-card bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm text-left`}
                >
                  <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center ${t.color} shrink-0`}>
                    {t.icon}
                  </div>
                  <span className={`${montserrat.className} text-sm font-semibold text-gray-800`}>{t.label}</span>
                  <ArrowRight size={14} className="text-gray-300 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          <div className="fade-up fade-up-3">
            <h2 className={`${montserrat.className} text-base font-bold text-gray-800 mb-4`}>Frequently Asked Questions</h2>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <span className={`${montserrat.className} text-sm font-semibold text-gray-800`}>{faq.q}</span>
                    <div className="shrink-0 text-purple-400">
                      {openFaq === i ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                    </div>
                  </div>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-gray-100 mb-4" />
                      <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up fade-up-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-white shadow-sm p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className={`${montserrat.className} text-sm font-bold text-gray-800`}>Email Support</p>
                <p className="text-xs text-gray-400 mt-0.5">support@linkly.io</p>
                <p className="text-xs text-gray-400">Responds within a few hours</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white shadow-sm p-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className={`${montserrat.className} text-sm font-bold text-gray-800`}>Live Chat</p>
                <p className="text-xs text-gray-400 mt-0.5">Available Mon – Fri, 9am – 6pm</p>
                <p className="text-xs text-emerald-500 font-medium mt-0.5">● Online now</p>
              </div>
            </div>
          </div>

          <div className="fade-up fade-up-5 rounded-3xl bg-white shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Send size={18} />
              </div>
              <div>
                <h2 className={`${montserrat.className} text-base font-bold text-gray-900`}>Send a Message</h2>
                <p className="text-xs text-gray-400">We'll get back to you as soon as possible</p>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={28} />
                </div>
                <p className={`${montserrat.className} text-base font-bold text-gray-800`}>Message Sent!</p>
                <p className="text-sm text-gray-400 text-center max-w-xs">
                  Thanks for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 text-sm text-purple-500 font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={`${montserrat.className} text-xs font-semibold text-gray-600`}>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`${montserrat.className} text-xs font-semibold text-gray-600`}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className={`${montserrat.className} text-xs font-semibold text-gray-600`}>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className={`${montserrat.className} text-xs font-semibold text-gray-600`}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your issue or question in detail..."
                    className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none transition-all duration-200"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`send-btn shimmer-btn px-8 py-3 rounded-2xl text-white text-sm font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 disabled:opacity-60`}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="fade-up fade-up-6 rounded-3xl bg-purple-600 px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0">
                <BookOpen size={22} />
              </div>
              <div>
                <p className={`${montserrat.className} text-white font-bold text-base`}>Explore the Docs</p>
                <p className="text-purple-200 text-sm mt-0.5">Full guides, API references, and tutorials</p>
              </div>
            </div>
            <button className="shrink-0 px-6 py-2.5 rounded-2xl bg-white text-purple-600 text-sm font-bold hover:scale-[1.03] transition-transform duration-200 flex items-center gap-2 shadow-md">
              View Documentation
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Support;