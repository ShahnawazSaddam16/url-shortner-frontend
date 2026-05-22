"use client";

import React, { useState, useEffect } from "react";
import { VerifiedIcon, Mail, ShieldCheck, Crown } from "lucide-react";

const UserStats = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <section className="mt-0 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-white/10 shadow-2xl backdrop-blur-xl p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-xl ring-4 ring-white/10">
                {initials}
              </div>

              <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md border-2 border-[#111827]">
                <VerifiedIcon size={14} className="text-white" />
              </div>
            </div>

            <div className="flex flex-col text-center sm:text-left">

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                  {user?.name || "Guest User"}
                </h1>

                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-400/20">
                  Verified
                </span>
              </div>

              <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-2 text-gray-300 text-sm sm:text-base">
                <Mail size={16} className="text-purple-400" />
                <span>{user?.email || "No Email"}</span>
              </div>

              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium">
                  <ShieldCheck size={16} />
                  Active Account
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-300 text-sm font-medium">
                  <Crown size={16} />
                  Plan: {plan?.planCategory || "Free"}
                </div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white">100%</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Security</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white">24/7</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Access</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center col-span-2 sm:col-span-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {plan?.planCategory || "Free"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Current Plan</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default UserStats;