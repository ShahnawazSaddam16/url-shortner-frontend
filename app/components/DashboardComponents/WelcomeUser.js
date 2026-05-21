"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Sparkles,
  User,
  Link2,
  MousePointerClick,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateLink from "./CreateLink";

const WelcomeUser = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [user, setUser] = useState(null);
  const [days, setDays] = useState(0);
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${API_ORIGIN}/auth/me`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);

        if (data.user.createdAt) {
          const created = new Date(data.user.createdAt);
          const now = new Date();
          setDays(Math.floor((now - created) / (1000 * 60 * 60 * 24)));
        }
      }
    };

    const fetchUserStats = async () => {
      const res = await fetch(`${API_ORIGIN}/user-urls`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setTotalUrls(data.totalShortUrls);
        setTotalClicks(data.totalClicks);
      }
    };

    fetchUser();
    fetchUserStats();
  }, [API_ORIGIN]);

  const cards = [
    { title: "User", value: user?.name || "...", icon: User },
    { title: "Days", value: days, icon: CalendarDays },
    { title: "URLs", value: totalUrls, icon: Link2 },
    { title: "Clicks", value: totalClicks, icon: MousePointerClick },
  ];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <section className="mt-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full bg-gradient-to-r from-[#12061d] via-[#1a0828] to-[#2b0d42] px-6 py-5"
      >
        {/* Create Link Button */}
        <div className="flex justify-end items-end">
          <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600
          rounded-[10px] text-white font-semibold flex gap-2 transition-all duration-200
          hover:scale-105 text-[14px] sm:text-[16px]"
          >
            <Plus /> Create New Link
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 bg-white/5 py-2 w-33 rounded-full">
              <Sparkles className="w-4 h-4 ml-2 text-pink-400" />
              <span className="text-sm text-gray-300">Welcome Back</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              {user ? `Hello, ${user.name}` : "Loading..."}
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Your account overview
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-pink-400" />
                  <h2 className="text-xs text-gray-300">{item.title}</h2>
                </div>

                <p className="text-white text-lg font-semibold mt-2 truncate">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* POPUP */}
      <CreateLink
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={(url) => showToast("URL Created Successfully")}
      />

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 right-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WelcomeUser;