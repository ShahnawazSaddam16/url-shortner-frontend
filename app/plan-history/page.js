"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import {
  Crown,
  History,
  ShieldCheck,
  Calendar,
  BadgeCheck,
  Mail,
  CreditCard,
  Zap,
  CheckCircle2,
  Clock,
  CalendarCheck,
  CalendarX,
  Layers,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const PlanHistory = () => {
  const router = useRouter();
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);

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

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/plan`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) setPlan(data.data);
      } catch (err) {}
    };
    fetchPlan();
  }, [API_ORIGIN]);

  if (loading) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.15); }
          50% { box-shadow: 0 0 0 12px rgba(168, 85, 247, 0); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.13s; }
        .fade-up-3 { animation-delay: 0.21s; }
        .fade-up-4 { animation-delay: 0.29s; }
        .fade-up-5 { animation-delay: 0.37s; }
        .shimmer-btn {
          background: linear-gradient(90deg, #7c3aed 0%, #a855f7 40%, #c084fc 60%, #7c3aed 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .card-hover {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(124, 58, 237, 0.12);
        }
        .icon-pill {
          transition: transform 0.2s ease;
        }
        .card-hover:hover .icon-pill {
          transform: scale(1.08);
        }
        .stat-tile {
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .stat-tile:hover {
          background: rgba(124, 58, 237, 0.06);
          transform: translateY(-1px);
        }
        .glow-dot {
          animation: pulse-glow 2.4s ease-in-out infinite;
        }
      `}</style>

      <Navbar />

      <section className="mt-20 mb-16 px-4 sm:px-8 flex justify-start">
        <div className="w-full max-w-4xl">

          <header className="fade-up fade-up-1 flex flex-col gap-5 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 glow-dot">
                <History size={22} />
              </div>
              <h1 className={`${montserrat.className} text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight`}>
                Plan{" "}
                <span
                  className={`${montserrat.className}`}
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  History
                </span>
              </h1>
              <span className="ml-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck size={13} />
                Secure
              </span>
            </div>

            <p className="text-gray-500 text-sm sm:text-[15px] max-w-xl leading-relaxed">
              Track your subscription plans, upgrades, expiries, and billing history — all in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className={`${montserrat.className} shimmer-btn px-5 py-2.5 rounded-2xl text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:scale-[1.03] transition-transform duration-200`}>
                <Crown size={15} />
                Manage Subscriptions
              </button>
              <button className={`${montserrat.className} px-5 py-2.5 rounded-2xl bg-purple-50 text-purple-600 text-sm font-semibold flex items-center gap-2 hover:bg-purple-100 transition-colors duration-200`}>
                <Layers size={15} />
                Upgrade or Downgrade
              </button>
            </div>
          </header>

          <div className="grid gap-6">
            {plan ? (
              <div className="fade-up fade-up-2 card-hover rounded-3xl bg-white shadow-sm overflow-hidden">

                <div className="px-6 pt-6 pb-5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="icon-pill w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <BadgeCheck size={22} />
                    </div>
                    <div>
                      <h2 className={`${montserrat.className} text-lg font-bold text-gray-900`}>
                        {plan.planCategory}
                      </h2>
                      <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1.5">
                        <Zap size={12} className="text-purple-400" />
                        {plan.planStatus} Plan
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      plan.paymentStatus === "paid"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    {plan.paymentStatus}
                  </span>
                </div>

                <div className="h-px bg-gray-100 mx-6" />

                <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="fade-up fade-up-3 stat-tile rounded-2xl bg-gray-50 px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                      <CalendarCheck size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Start Date</p>
                      <p className={`${montserrat.className} text-sm font-bold text-gray-800 mt-0.5`}>
                        {formatDate(plan.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="fade-up fade-up-3 stat-tile rounded-2xl bg-gray-50 px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                      <CalendarX size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Expiry Date</p>
                      <p className={`${montserrat.className} text-sm font-bold text-gray-800 mt-0.5`}>
                        {formatDate(plan.expiryDate)}
                      </p>
                    </div>
                  </div>

                  <div className="fade-up fade-up-4 stat-tile rounded-2xl bg-gray-50 px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <CreditCard size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Payment ID</p>
                      <p className={`${montserrat.className} text-sm font-bold text-gray-800 mt-0.5 truncate`}>
                        {plan.stripePaymentIntentId || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="fade-up fade-up-4 stat-tile rounded-2xl bg-gray-50 px-5 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                      <p className={`${montserrat.className} text-sm font-bold text-gray-800 mt-0.5 truncate`}>
                        {plan.email}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="fade-up fade-up-5 px-6 pb-6">
                  <div className="rounded-2xl bg-purple-50 px-5 py-4 flex items-center gap-3">
                    <Clock size={15} className="text-purple-400 shrink-0" />
                    <p className="text-xs text-purple-600 font-medium">
                      Your plan is active and all features are currently accessible.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="fade-up fade-up-2 rounded-3xl bg-white shadow-sm px-8 py-14 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                  <Calendar size={24} />
                </div>
                <p className={`${montserrat.className} text-gray-800 font-bold text-base`}>No Plan Found</p>
                <p className="text-gray-400 text-sm max-w-xs">
                  You don't have an active subscription yet. Upgrade to unlock premium features.
                </p>
                <button className="shimmer-btn mt-2 px-6 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.03] transition-transform duration-200">
                  View Plans
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default PlanHistory;
