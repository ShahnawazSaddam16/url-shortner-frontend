"use client";

import React, { useState } from "react";
import {
  Sparkles,
  User,
  Link2,
  MousePointerClick,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateLink from "./CreateLink";
import { useDashboard } from "./DashboardProvider";

const WelcomeUser = () => {
  const { user, urls, refreshAll } = useDashboard();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSuccess = async () => {
    await refreshAll();
    showToast("URL Created Successfully");
    setOpen(false);
  };

  const cards = [
    { title: "User", value: user?.name || "...", icon: User },
    { title: "URLs", value: urls.length, icon: Link2 },
    { title: "Clicks", value: urls.reduce((sum, u) => sum + (u.clicks || 0), 0), icon: MousePointerClick },
  ];

  return (
    <section className="mt-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full bg-gradient-to-r from-[#12061d] via-[#1a0828] to-[#2b0d42] px-6 py-5"
      >
        <div className="flex justify-end items-end">
          <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600
            rounded-[10px] text-white font-semibold flex gap-2 transition-all duration-200
            hover:scale-105 text-[14px] sm:text-[16px]"
          >
            <Plus />
            Create New Link
          </button>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-pink-400" />
                  <h2 className="text-xs text-gray-300">{item.title}</h2>
                </div>

                <p className="text-white text-xl font-semibold mt-3 truncate">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <CreateLink
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />

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