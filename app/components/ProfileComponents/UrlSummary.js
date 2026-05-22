"use client";

import React, { useEffect, useState } from "react";
import { Link2, MousePointerClick, BarChart3 } from "lucide-react";

const UrlSummary = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_ORIGIN}/user-urls`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [API_ORIGIN]);

  if (loading) {
    return (
      <section className="mt-3 flex justify-center lg:justify-start px-4 sm:px-6">
        <div className="w-full max-w-md h-40 rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] animate-pulse border border-white/10" />
      </section>
    );
  }

  const totalLinks = data?.totalShortUrls || 0;
  const totalClicks = data?.totalClicks || 0;

  const maxClicks = Math.max(totalClicks, 1);
  const linkPercent = Math.min((totalLinks / 50) * 100, 100);
  const clickPercent = Math.min((totalClicks / (totalClicks + 50)) * 100, 100);

  return (
    <section className="mt-3 flex justify-center lg:justify-start px-4 sm:px-6">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-white/10 shadow-2xl backdrop-blur-xl p-6">
        <h1 className="text-xl font-bold text-white">URL Summary</h1>

        <div className="mt-5 space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <Link2 size={16} /> Total Links
              </span>
              <span className="text-white font-semibold">{totalLinks}</span>
            </div>

            <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${linkPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <MousePointerClick size={16} /> Total Clicks
              </span>
              <span className="text-white font-semibold">{totalClicks}</span>
            </div>

            <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500"
                style={{ width: `${clickPercent}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <BarChart3 size={16} /> Activity Score
              </span>
              <span className="text-white font-semibold">
                {Math.min(totalClicks + totalLinks, 100)}
              </span>
            </div>

            <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{
                  width: `${Math.min(totalClicks + totalLinks, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlSummary;