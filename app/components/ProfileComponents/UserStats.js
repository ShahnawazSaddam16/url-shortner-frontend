"use client";

import React, { useState, useEffect } from "react";
import { VerifiedIcon, Mail, ShieldCheck, Crown } from "lucide-react";
import { useRouter } from "next/navigation";

const UserStats = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API_ORIGIN}/auth/me`, {
        method: "GET",
        credentials: "include",
      }).then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      }),

      fetch(`${API_ORIGIN}/plan`, {
        method: "GET",
        credentials: "include",
      }).then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      }),
    ])
      .then(([userData, planData]) => {
        setUser(userData.user);
        setPlan(planData?.data || null);
      })
      .catch(() => {
        setUser(null);
        setPlan(null);
      })
      .finally(() => setLoading(false));
  }, [API_ORIGIN]);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "";

  if (loading) {
    return (
      <section className="mt-4 px-4 flex justify-center">
        <div className="w-full max-w-5xl h-40 rounded-3xl animate-pulse bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827]" />
      </section>
    );
  }

  return (
    <>
      <section className="mt-0 px-3 sm:px-4 md:px-6 flex justify-center">
        <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-white/10 shadow-2xl backdrop-blur-xl p-4 sm:p-5 md:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 w-full sm:w-auto">
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-xl ring-4 ring-white/10">
                  {initials}
                </div>

                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md border-2 border-[#111827]">
                  <VerifiedIcon size={12} className="text-white" />
                </div>
              </div>

              <div className="flex flex-col text-center sm:text-left flex-1">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {user?.name || "Guest User"}
                  </h1>

                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 shrink-0">
                    Verified
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-2 text-gray-300 text-xs sm:text-sm">
                  <Mail size={14} className="text-purple-400 shrink-0" />
                  <span className="truncate">{user?.email || "No Email"}</span>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs sm:text-sm font-medium">
                    <ShieldCheck size={14} className="shrink-0" />
                    Active Account
                  </div>

                  <button
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs sm:text-sm font-medium hover:bg-purple-500/20 transition-all duration-300"
                    onClick={()=>{router.push("/plan-history")}}>
                    <Crown size={14} className="shrink-0" />
                    Plan: {plan?.planCategory || "Free"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-5 py-3 sm:py-4 text-center hover:bg-white/10 transition-all duration-300">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  100%
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Security
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-5 py-3 sm:py-4 text-center hover:bg-white/10 transition-all duration-300">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  24/7
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Access
                </p>
              </div>

              <button
                onClick={() => setPopup(true)}
                className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-5 py-3 sm:py-4 text-center col-span-2 sm:col-span-1 hover:bg-white/10 transition-all duration-300"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {plan?.planCategory || "Free"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Current Plan
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserStats;