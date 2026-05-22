"use client";

import React, { useRef, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Cloud, Zap, Shield, BarChart3 } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const features = [
  {
    title: "Auto-Scalable Infrastructure",
    description:
      "100% auto-scalable cloud on AWS Lambda. Guarantees 99.99% availability and scales automatically with your needs.",
    highlight: "99.99% guaranteed uptime",
    icon: Cloud,
  },
  {
    title: "High Performance",
    description:
      "Extreme speed with average response time of 27ms. Optimized to offer the best experience to your users.",
    highlight: "27ms response time",
    icon: Zap,
  },
  {
    title: "Maximum Security",
    description:
      "Complete protection for your data with ISO 27001 and PCI-DSS compliance. Your links and information are always secure.",
    highlight: "Security Best Practices",
    icon: Shield,
  },
  {
    title: "Advanced Analytics",
    description:
      "Detailed metrics for each link, powerful insights and deep analysis to optimize your campaigns and strategies.",
    highlight: "Real-time reports",
    icon: BarChart3,
  },
];

const FeatureCard = ({ item, index, isVisible }) => {
  const Icon = item.icon;

  return (
    <div
      className={`feature-card group relative flex flex-col items-start text-left p-7 rounded-3xl border border-purple-100/60 bg-white/70 backdrop-blur-2xl overflow-hidden transition-all duration-700 ease-out cursor-default ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }} id="features">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 pointer-events-none" />

      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      <div className="relative flex justify-start mb-5">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-200 group-hover:scale-110 group-hover:shadow-purple-300 group-hover:shadow-xl transition-all duration-400">
          <Icon size={22} strokeWidth={1.8} />
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="relative flex flex-col items-start text-left flex-1">
        <h2
          className={`${montserrat.className} text-[15px] font-bold text-gray-900 mb-2 leading-snug`}
        >
          {item.title}
        </h2>

        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-purple-200/70 bg-gradient-to-r from-purple-50 to-pink-50">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex-shrink-0" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {item.highlight}
          </span>
        </span>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const topPair = features.slice(0, 2);
  const bottomPair = features.slice(2, 4);

  return (
    <section ref={sectionRef} className="mt-30 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-purple-100/40 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
      </div>

      <header
        className={`flex flex-col justify-center items-center space-y-4 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1
          className={`${montserrat.className} text-gray-900 text-[35px] md:text-[48px] font-extrabold leading-tight`}
        >
          Power{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Platform
          </span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
          Cutting-edge technology to ensure your links work perfectly, with unmatched speed, security, and reliability.
        </p>
      </header>

      <div className="mt-14 max-w-4xl mx-auto flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {topPair.map((item, i) => (
            <div key={i} className="w-full">
              <FeatureCard item={item} index={i} isVisible={isVisible} />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          {bottomPair.map((item, i) => (
            <div key={i} className="w-full">
              <FeatureCard item={item} index={i + 2} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-card {
          box-shadow: 0 2px 20px -4px rgba(139, 92, 246, 0.08),
            0 1px 4px -1px rgba(0, 0, 0, 0.04);
        }
        .feature-card:hover {
          box-shadow: 0 20px 40px -8px rgba(139, 92, 246, 0.18),
            0 8px 16px -4px rgba(236, 72, 153, 0.08);
          transform: translateY(-6px);
        }
      `}</style>
    </section>
  );
};

export default Features;