"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { Check, Crown, Gem, Star, X } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plans = [
  {
    name: "Basic",
    icon: <Star className="w-6 h-6" />,
    price: {
      monthly: 6,
      annual: 5,
    },
    popular: false,
    buttonText: "Choose Basic",
    description: "Perfect for personal links and growing creators.",
    features: [
      { text: "1,000 links", included: true },
      { text: "500 QR Codes", included: true },
      { text: "Unlimited clicks", included: true },
      { text: "Ad removal", included: false },
      { text: "Custom domains", included: false },
      { text: "Campaigns", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    icon: <Gem className="w-6 h-6" />,
    price: {
      monthly: 10,
      annual: 9,
    },
    popular: true,
    buttonText: "Choose Pro",
    description: "Built for businesses and professionals scaling faster.",
    features: [
      { text: "5,000 links", included: true },
      { text: "2,500 QR Codes", included: true },
      { text: "Unlimited clicks", included: true },
      { text: "5 custom domains", included: true },
      { text: "50 campaigns", included: true },
      { text: "Ad removal", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Premium",
    icon: <Crown className="w-6 h-6" />,
    price: {
      monthly: 15,
      annual: 13,
    },
    popular: false,
    buttonText: "Choose Premium",
    description: "Enterprise-level power with complete control.",
    features: [
      { text: "15,000 links", included: true },
      { text: "7,500 QR Codes", included: true },
      { text: "Unlimited clicks", included: true },
      { text: "15 custom domains", included: true },
      { text: "150 campaigns", included: true },
      { text: "Ad removal", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

const Plans = () => {
  const [billing, setBilling] = useState("annual");
  const [confirmation, setConfirmation] = useState(false);

  return (
    <>
    <section className="mt-20 mb-16 px-4">
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

        <div className="mt-8 bg-white/80 backdrop-blur-xl shadow-xl rounded-full p-1 flex items-center">
          <button
            onClick={() => setBilling("annual")}
            className={`px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              billing === "annual"
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                : "text-gray-700 hover:text-purple-600"
            }`}
          >
            Annual
          </button>

          <button
            onClick={() => setBilling("monthly")}
            className={`px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              billing === "monthly"
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
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

      <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
        {plans.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-[32px] p-8 transition-all duration-300 hover:-translate-y-2 ${
              item.popular
                ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-2xl scale-[1.03]"
                : "bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900 shadow-xl"
            }`}
          >
            {item.popular && (
              <div className="absolute top-5 right-5 bg-white text-purple-700 text-xs font-bold px-4 py-1 rounded-full shadow-md">
                POPULAR
              </div>
            )}

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                item.popular
                  ? "bg-white/20 text-white"
                  : "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              }`}
            >
              {item.icon}
            </div>

            <h2
              className={`${montserrat.className} text-2xl font-extrabold mb-2`}
            >
              {item.name}
            </h2>

            <p
              className={`text-sm mb-6 ${
                item.popular ? "text-white/80" : "text-gray-500"
              }`}
            >
              {item.description}
            </p>

            <div className="flex items-end gap-2 mb-8">
              <h3 className="text-5xl font-extrabold">
                ${item.price[billing]}
              </h3>
              <span
                className={`mb-2 text-sm font-medium ${
                  item.popular ? "text-white/80" : "text-gray-500"
                }`}
              >
                / per {billing === "monthly" ? "month" : "year"}
              </span>
            </div>

            <div className="space-y-4 mb-10">
              {item.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included
                        ? item.popular
                          ? "bg-white/20"
                          : "bg-gradient-to-r from-purple-600 to-pink-500"
                        : item.popular
                        ? "bg-white/10"
                        : "bg-gray-200"
                    }`}
                  >
                    {feature.included ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <X
                        className={`w-3 h-3 ${
                          item.popular ? "text-white/70" : "text-gray-500"
                        }`}
                      />
                    )}
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      feature.included
                        ? item.popular
                          ? "text-white"
                          : "text-gray-700"
                        : item.popular
                        ? "text-white/60"
                        : "text-gray-400 line-through"
                    }`}
                  >
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                item.popular
                  ? "bg-white text-purple-700 hover:scale-[1.02]"
                  : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-[1.02] shadow-lg"
              }`} onClick={()=>{setConfirmation(true)}}>
              {item.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>

    {confirmation && (
        <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center">
            <div className="bg-white w-30 h-20">

            </div>
        </div>
    )}
    </>
  );
};

export default Plans;