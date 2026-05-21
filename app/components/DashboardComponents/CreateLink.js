"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Sparkles } from "lucide-react";

const CreateLink = ({ isOpen, onClose, onSuccess }) => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!originalUrl) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_ORIGIN}/shortner-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          originalUrl,
          customCode: customCode || undefined,
          expiryDate: expiryDate || undefined,
          password: password || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(data.data.shortUrl);
        setOriginalUrl("");
        setCustomCode("");
        setExpiryDate("");
        setPassword("");
        onClose();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-[92%] max-w-lg rounded-2xl bg-gradient-to-br from-[#1a0828] to-[#2b0d42] border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Sparkles className="text-pink-400 w-4 h-4" />
                Create New Link
              </h2>
              <button onClick={onClose}>
                <X className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <input
              ref={inputRef}
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Original URL"
              className="w-full p-3 rounded-xl bg-white/5 text-white outline-none border border-white/10 focus:border-purple-500"
            />

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="mt-3 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              Optional Features
              <ChevronDown
                className={`w-4 h-4 transition ${
                  showOptions ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3 space-y-2"
                >
                  <input
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    placeholder="Custom Code"
                    className="w-full p-3 rounded-xl bg-white/5 text-white outline-none border border-white/10 focus:border-purple-500"
                  />
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 text-white outline-none border border-white/10 focus:border-purple-500"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password Protect"
                    className="w-full p-3 rounded-xl bg-white/5 text-white outline-none border border-white/10 focus:border-purple-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateLink;
