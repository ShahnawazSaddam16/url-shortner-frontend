import React from "react";
import { Globe, MousePointerClick, Server } from "lucide-react";
import { motion } from "framer-motion";

const additionalFeatures = [
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Global distribution network for maximum speed anywhere in the world",
  },
  {
    icon: MousePointerClick,
    title: "Unlimited Clicks",
    description:
      "No limits on the number of clicks on your links, scale without worries",
  },
  {
    icon: Server,
    title: "Robust API",
    description:
      "Latest generation serverless technology, secure, with superior performance and 24/7 availability so your business never stops.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AdditionalFeatures = () => {
  return (
    <section className="relative mt-20 px-6 py-20 overflow-hidden bg-gradient-to-br from-[#12061d] via-[#1b0a2b] to-[#2a0d42]">
      <div className="absolute top-10 left-10 w-52 h-52 bg-purple-500/20 blur-[110px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-500/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Additional Features
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          Powerful infrastructure and premium-grade features designed for speed,
          security, and scalability.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {additionalFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={card}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.35 }}
                className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition duration-300">
                    <Icon className="text-white w-8 h-8" />
                  </div>

                  <h2 className="text-white text-2xl font-bold mt-6">
                    {item.title}
                  </h2>

                  <p className="text-gray-300 mt-4 leading-7 text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdditionalFeatures;