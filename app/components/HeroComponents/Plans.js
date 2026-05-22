"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const Plans = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <>
      <section className="mt-20 mb-10 px-4">
        {/* Header */}
        <header className="flex flex-col justify-center items-center text-center">
          <h1
            className={`${montserrat.className} text-[30px] sm:text-[40px] font-extrabold text-gray-900`}
          >
            Choose Your <span className="text-purple-600">Plan</span>
          </h1>

          <p className="mt-2 text-gray-600 text-[16px] sm:text-[18px] max-w-2xl">
            Flexible plans for all needs, from personal projects to large
            enterprises.
          </p>

          <div className="mt-8 bg-white shadow-lg border border-gray-200 rounded-full p-1 flex items-center">
            <button
              onClick={() => setBilling("annual")}
              className={`px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Annual
            </button>

            <button
              onClick={() => setBilling("monthly")}
              className={`px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                billing === "annual"
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Monthly
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500 font-medium">
            {billing === "monthly"
              ? "Billed every month"
              : "Billed yearly • Save more"}
          </p>
        </header>
      </section>
    </>
  );
};

export default Plans;