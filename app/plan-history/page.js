"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Crown, History, ShieldCheck } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const PlanHistory = () => {
  const router = useRouter();
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          router.push("/");
        }
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, API_ORIGIN]);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <section className="mt-20 px-4 sm:px-6 flex justify-start">
        <div className="w-full max-w-5xl">
          <header className="flex flex-col gap-3 items-start justify-start">
            <div className="flex items-center gap-3 flex-wrap justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                <History size={20} />
              </div>

              <h1 className={`${montserrat.className} text-xl sm:text-3xl font-extrabold text-gray-900`}>
                View Your <span className="text-purple-400">Plan History</span>
              </h1>

              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-medium flex items-center gap-2">
                <ShieldCheck size={14} />
                Secure
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-base max-w-2xl text-left">
              Track all your subscription plans, upgrades, expiries, and billing history in one place.
            </p>

            <div className="flex flex-wrap gap-3 mt-2 justify-start">
              <div className="px-4 py-2 rounded-xl bg-purple-500 border border-white/10 text-gray-200 text-sm flex items-center gap-2">
                <Crown size={16} className="text-purple-200" />
                Manage subscriptions
              </div>

              <div className="px-4 py-2 rounded-xl bg-purple-500 border border-white/10 text-gray-200 text-sm">
                Upgrade or downgrade anytime
              </div>
            </div>
          </header>
        </div>
      </section>
    </>
  );
};

export default PlanHistory;