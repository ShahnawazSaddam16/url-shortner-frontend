"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import UserStats from "./UserStats";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Header = () => {
  return (
    <section className="mt-5 w-full px-4 sm:px-6">
      <header className="w-full rounded-3xl bg-gradient-to-r from-[#12061d] via-[#1a0828] to-[#2b0d42] border border-white/10 shadow-2xl overflow-hidden">
        <div className="px-5 sm:px-8 py-6 sm:py-8 text-white">
          <h1
            className={`${montserrat.className} font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight`}
          >
            My Profile
          </h1>

          <p
            className={`${montserrat.className} text-sm sm:text-base lg:text-lg text-gray-300 mt-2`}
          >
            Manage your personal information and account settings
          </p>
        </div>

        <div className="w-full border-t border-white/10 bg-black/10 backdrop-blur-md px-4 sm:px-6 py-5">
          <UserStats />
        </div>
      </header>
    </section>
  );
};

export default Header;