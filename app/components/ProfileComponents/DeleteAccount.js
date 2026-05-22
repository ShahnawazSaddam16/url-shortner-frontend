"use client";

import React from "react";
import { Trash2 } from "lucide-react";

const DeleteAccount = () => {
  return (
    <section className="mt-6 w-full flex justify-center lg:justify-end px-4 sm:px-6">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-red-500/20 shadow-2xl backdrop-blur-xl p-6">
        <h1 className="text-2xl font-bold text-red-500 tracking-tight">
          Danger Zone
        </h1>

        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Permanently remove your account and all associated data. This action
          cannot be undone.
        </p>

        <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold py-3 shadow-lg">
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default DeleteAccount;