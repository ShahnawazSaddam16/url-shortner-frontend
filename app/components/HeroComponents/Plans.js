"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { Check, Crown, Gem, Star, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const plans = [
  {
    name: "Basic",
    icon: <Star className="w-6 h-6" />,
    price: { monthly: 6, annual: 5 },
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
    price: { monthly: 10, annual: 9 },
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
    price: { monthly: 15, annual: 13 },
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

const CheckoutForm = ({
  selectedPlan,
  billing,
  onClose,
  onSuccess,
  onError,
  API_ORIGIN,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const getAmount = () => {
    const price = selectedPlan.price[billing];
    return billing === "annual" ? price * 12 * 100 : price * 100;
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const intentRes = await fetch(
        `${API_ORIGIN}/create-payment-intent`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: getAmount() }),
        }
      );

      const intentData = await intentRes.json();

      if (!intentData.clientSecret) {
        onError(intentData.message || "Failed to create payment intent");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } =
        await stripe.confirmCardPayment(intentData.clientSecret, {
          payment_method: { card: cardElement },
        });

      if (error) {
        onError(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const payload = {
          planStatus: billing,
          planCategory: selectedPlan.name,
          paymentIntentId: intentData.paymentIntentId,
        };

        const res = await fetch(`${API_ORIGIN}/plan`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data.success) {
          onSuccess(
            `${selectedPlan.name} plan activated (${billing})`
          );
        } else {
          onError(data.message || "Plan save failed");
        }
      }
    } catch {
      onError("Server error");
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
      <h2 className="text-xl font-bold mb-4">Confirm Plan</h2>

      <div className="flex flex-row gap-4 mb-4">
        <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Plan</p>
          <p className="text-sm font-semibold text-gray-900">
            {selectedPlan.name}
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Billing</p>
          <p className="text-sm font-semibold text-gray-900 capitalize">
            {billing}
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Amount</p>
          <p className="text-sm font-semibold text-gray-900">
            $
            {billing === "annual"
              ? selectedPlan.price.annual
              : selectedPlan.price.monthly}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-100 mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#111827",
                "::placeholder": { color: "#9CA3AF" },
              },
              invalid: { color: "#EF4444" },
            },
          }}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 bg-gray-200 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading || !stripe}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl"
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

const Plans = () => {
  const API_ORIGIN =
    process.env.NEXT_PUBLIC_API_ORIGIN || "";

  const [billing, setBilling] = useState("annual");
  const [confirmation, setConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [toast, setToast] = useState(null);

  const openConfirm = (plan) => {
    setSelectedPlan(plan);
    setConfirmation(true);
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <section className="mt-20 mb-16 px-4" id="plans">
        <header className="flex flex-col justify-center items-center text-center">
          <h1
            className={`${montserrat.className} text-[30px] sm:text-[40px] font-extrabold text-gray-900`}
          >
            Choose Your{" "}
            <span className="text-purple-600">Plan</span>
          </h1>

          <p className="mt-2 text-gray-600 text-[16px] sm:text-[18px] max-w-2xl">
            Flexible plans for all needs, from personal projects to
            large enterprises.
          </p>

          <div className="mt-8 bg-white/80 backdrop-blur-xl shadow-xl rounded-full p-1 flex items-center">
            <button
              onClick={() => setBilling("annual")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                billing === "annual"
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Annual
            </button>

            <button
              onClick={() => setBilling("monthly")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Monthly
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
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
                  ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
                  : "bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900"
              }`}
            >
              {item.popular && (
                <div className="absolute top-5 right-5 bg-white text-purple-700 text-xs font-bold px-4 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className="mb-6">{item.icon}</div>

              <h2 className="text-2xl font-extrabold mb-2">
                {item.name}
              </h2>

              <p className="text-sm mb-6 opacity-80">
                {item.description}
              </p>

              <div className="flex items-end gap-2 mb-8">
                <h3 className="text-5xl font-extrabold">
                  ${item.price[billing]}
                </h3>
                <span className="mb-2 text-sm opacity-70">
                  / per{" "}
                  {billing === "monthly" ? "month" : "year"}
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included
                          ? "bg-gradient-to-r from-purple-600 to-pink-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-gray-600" />
                      )}
                    </div>

                    <p
                      className={`text-sm ${
                        feature.included
                          ? ""
                          : "line-through opacity-60"
                      }`}
                    >
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openConfirm(item)}
                className={`w-full py-4 rounded-2xl font-semibold ${
                  item.popular
                    ? "bg-white text-purple-700"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                }`}
              >
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {confirmation && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              selectedPlan={selectedPlan}
              billing={billing}
              onClose={() => setConfirmation(false)}
              onSuccess={(msg) => showToast("success", msg)}
              onError={(msg) => showToast("error", msg)}
              API_ORIGIN={API_ORIGIN}
            />
          </Elements>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 bg-white shadow-xl px-5 py-3 rounded-xl">
          <p
            className={`text-sm font-medium ${
              toast.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {toast.message}
          </p>
        </div>
      )}
      <section/>
    </>
  );
};

export default Plans;