"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Copy,
  Pencil,
  QrCode,
  Lock,
  Link2,
  Check,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  ShieldCheck,
  Globe,
  Hash,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const UrlFetching = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [urls, setUrls] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [qrModal, setQrModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/user-urls`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUrls(data.user_urls);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUrls();
  }, [API_ORIGIN]);

  const handleCopy = async (url, id) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openEdit = (item) => {
    setEditModal(item);
    setEditForm({
      shortCode: item.shortCode || "",
      originalUrl: item.originalUrl || "",
      password: item.password || "",
    });
  };

  const closeEdit = () => {
    setEditModal(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(`${API_ORIGIN}/user-urls/${editModal._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setUrls((prev) =>
          prev.map((u) =>
            u._id === editModal._id ? { ...u, ...editForm } : u
          )
        );
        closeEdit();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mt-10 w-full px-0">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Your Short URLs
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage and monitor your generated links
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {urls.length > 0 ? (
            urls.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -2 }}
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4 sm:px-5 sm:py-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                        <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate max-w-[120px] sm:max-w-none">
                            {item.shortCode || "No Code"}
                          </h2>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium shrink-0">
                            Short
                          </span>
                        </div>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs sm:text-sm text-pink-400 hover:text-pink-300 transition mt-0.5 group"
                        >
                          <span className="truncate max-w-[160px] sm:max-w-xs lg:max-w-sm">
                            {item.shortUrl}
                          </span>
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(item.shortUrl, item._id)}
                        className="flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white text-xs sm:text-sm font-semibold hover:scale-105 transition shadow-lg shadow-purple-900/40"
                      >
                        {copiedId === item._id ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        <span className="hidden sm:inline">
                          {copiedId === item._id ? "Copied" : "Copy"}
                        </span>
                      </button>

                      <button
                        onClick={() => openEdit(item)}
                        className="flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white text-xs sm:text-sm font-semibold hover:scale-105 transition shadow-lg shadow-pink-900/40"
                      >
                        <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      {item.qrCode && (
                        <button
                          onClick={() => setQrModal(item)}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-purple-300 hover:scale-105 hover:bg-white/10 transition"
                        >
                          <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-white/5">
                    <div className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 mt-0.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-0.5">
                          Original URL
                        </p>
                        <a
                          href={item.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-300 hover:text-white transition truncate block"
                        >
                          {item.originalUrl}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
                      <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 font-medium mb-0.5">
                          Short Code
                        </p>
                        <p className="text-xs text-gray-300 font-mono">
                          {item.shortCode || "—"}
                        </p>
                      </div>
                    </div>

                    {item.password && (
                      <div className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3 sm:col-span-2 lg:col-span-1">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">
                            Password
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-300 font-mono tracking-widest">
                              {visiblePasswords[item._id]
                                ? item.password
                                : "••••••••"}
                            </p>
                            <button
                              onClick={() => togglePassword(item._id)}
                              className="text-gray-500 hover:text-gray-300 transition"
                            >
                              {visiblePasswords[item._id] ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 py-12 sm:py-14 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                No Short URLs Found
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Your created links will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {qrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{
              background: "rgba(12,4,24,0.85)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setQrModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#1a0828]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 sm:hidden" />

              <button
                onClick={() => setQrModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">QR Code</h2>
                  <p className="text-gray-400 text-xs">{qrModal.shortCode}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white p-4 flex items-center justify-center">
                <Image
                  src={qrModal.qrCode}
                  alt="QR Code"
                  width={192}
                  height={192}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                />
              </div>

              <a
                href={qrModal.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/40"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Link
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{
              background: "rgba(12,4,24,0.85)",
              backdropFilter: "blur(12px)",
            }}
            onClick={closeEdit}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#1a0828]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 sm:hidden" />

              <button
                onClick={closeEdit}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6 sm:mb-7">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg sm:text-xl">
                    Edit URL
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Update your short link details
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Short Code
                  </label>
                  <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-purple-500/50 transition">
                    <Hash className="w-4 h-4 text-purple-400 shrink-0" />
                    <input
                      type="text"
                      value={editForm.shortCode}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          shortCode: e.target.value,
                        }))
                      }
                      className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-gray-600 min-w-0"
                      placeholder="Enter short code"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Original URL
                  </label>
                  <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-purple-500/50 transition">
                    <Globe className="w-4 h-4 text-pink-400 shrink-0" />
                    <input
                      type="text"
                      value={editForm.originalUrl}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          originalUrl: e.target.value,
                        }))
                      }
                      className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-gray-600 min-w-0"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                    Password Protection
                  </label>
                  <div className="flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-purple-500/50 transition">
                    <Lock className="w-4 h-4 text-pink-400 shrink-0" />
                    <input
                      type={visiblePasswords["edit"] ? "text" : "password"}
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-gray-600 min-w-0"
                      placeholder="Leave blank to remove"
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword("edit")}
                      className="text-gray-500 hover:text-gray-300 transition shrink-0"
                    >
                      {visiblePasswords["edit"] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 sm:mt-8">
                <button
                  onClick={closeEdit}
                  className="flex-1 py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/40"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UrlFetching;