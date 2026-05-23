"use client";

import React, { useState } from "react";
import { Plus, Link2, BarChart3, Settings, Trash2, Wallet2 } from "lucide-react";
import CreateLink from "../DashboardComponents/CreateLink";
import { useRouter } from "next/navigation";

const QuickActions = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <section className="mt-6 flex justify-center lg:justify-end px-4 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl p-6 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
          <h1 className="text-[20px] text-white font-bold">Quick Actions</h1>

          <div className="mt-5 grid grid-cols-2 gap-3 text-white">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition py-3 text-sm font-medium"
            >
              <Plus size={18} />
              Create Link
            </button>

            
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition py-3 text-sm font-medium"
            onClick={()=>{router.push("/dashboard")}}>
              <Link2 size={18} />
              My Links
            </button>
            

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition py-3 text-sm font-medium">
              <BarChart3 size={18} />
              Analytics
            </button>

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition py-3 text-sm font-medium"
            onClick={()=>{router.push("/plan-history")}}>
              <Wallet2 size={18}/>
              Plans
            </button>
          </div>
        </div>
      </section>

      <CreateLink
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(shortUrl) => setMessage(shortUrl)}
      />
    </>
  );
};

export default QuickActions;