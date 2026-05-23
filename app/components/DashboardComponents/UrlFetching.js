"use client";

import React, { useState, useRef } from "react";
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
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDashboard } from "./DashboardProvider";

export const UrlFetching = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const router = useRouter();
  const { urls, setUrls, fetchUrls } = useDashboard();

  const [copiedId, setCopiedId] = useState(null);
  const [qrModal, setQrModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editForm, setEditForm] = useState({});
  const [notif, setNotif] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const passwordCache = useRef({});

  const handleCopy = async (url, id) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openEdit = (item) => {
    setEditModal(item);
    setEditForm({
      shortCode: item.shortCode || "",
      originalUrl: item.originalUrl || "",
      password: item.password || "",
      expiryDate: item.expiryDate || "",
    });
  };

  const closeEdit = () => {
    setEditModal(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    try {
      const payload = {
        originalUrl: editForm.originalUrl,
        expiryDate: editForm.expiryDate,
        shortCode: editForm.shortCode,
      };

      if (editForm.password?.trim() !== "") {
        payload.password = editForm.password;
      }

      const res = await fetch(
        `${API_ORIGIN}/updating-url/${editModal._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        setNotif({
          show: true,
          message: "Link updated",
          type: "success",
        });

        setTimeout(() => {
          setNotif((s) => ({
            ...s,
            show: false,
          }));
        }, 3000);

        closeEdit();

        await fetchUrls();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const target = deleteModal;
    setDeleteLoading(true);

    try {
      const res = await fetch(
        `${API_ORIGIN}/deleting-url/${target._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const text = await res.text();
      let data = null;

      try {
        data = JSON.parse(text);
      } catch (e) {}

      if (!res.ok) {
        setNotif({
          show: true,
          message: (data && data.message) || "Failed to delete",
          type: "error",
        });

        setTimeout(() => {
          setNotif((s) => ({
            ...s,
            show: false,
          }));
        }, 3000);

        setDeleteLoading(false);
        return;
      }

      if (data?.success) {
        delete passwordCache.current[target._id];

        setDeleteModal(null);

        setNotif({
          show: true,
          message: "Link deleted",
          type: "success",
        });

        setTimeout(() => {
          setNotif((s) => ({
            ...s,
            show: false,
          }));
        }, 3000);

        await fetchUrls();
      } else {
        setNotif({
          show: true,
          message: (data && data.message) || "Failed to delete",
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);

      setNotif({
        show: true,
        message: "Failed to delete",
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  
  return (
    <section className="mt-6 sm:mt-10 w-full px-0">
      <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-3 sm:p-6 lg:p-8 shadow-2xl">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-base min-[360px]:text-lg sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Short URLs
          </h1>
          <p className="text-[11px] min-[360px]:text-xs sm:text-sm text-gray-400 mt-1">
            Manage and monitor your generated links
          </p>
        </div>

        <div className="grid gap-2 sm:gap-3 lg:gap-4">
          {urls.length > 0 ? (
            urls.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -2 }}
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-2.5 py-2.5 min-[360px]:px-3 min-[360px]:py-3 sm:px-5 sm:py-5"
              >
                <div className="flex flex-col gap-2.5 min-[360px]:gap-3 sm:gap-4">
                  <div className="flex items-start justify-between gap-1.5 min-[360px]:gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                        <Link2 className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 flex-wrap">
                          <h2 className="text-xs min-[360px]:text-sm sm:text-base lg:text-lg font-bold text-white truncate max-w-[70px] min-[360px]:max-w-[90px] sm:max-w-none">
                            {item.shortCode || "No Code"}
                          </h2>
                          <span className="text-[10px] min-[360px]:text-xs px-1 min-[360px]:px-1.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-500 font-medium shrink-0">
                            Short
                          </span>
                        </div>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] min-[360px]:text-xs sm:text-sm text-pink-400 hover:text-pink-300 transition mt-0.5 group"
                        >
                          <span className="truncate max-w-[100px] min-[360px]:max-w-[130px] sm:max-w-xs lg:max-w-sm">
                            {item.shortUrl}
                          </span>
                          <ExternalLink className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy(item.shortUrl, item._id)}
                        className="flex items-center gap-1 px-1.5 py-1.5 min-[360px]:px-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white text-[10px] min-[360px]:text-xs sm:text-sm font-semibold hover:scale-105 transition shadow-lg shadow-purple-900/40"
                      >
                        {copiedId === item._id ? (
                          <Check className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Copy className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4" />
                        )}
                        <span className="hidden sm:inline">
                          {copiedId === item._id ? "Copied" : "Copy"}
                        </span>
                      </button>

                      <button
                        onClick={() => openEdit(item)}
                        className="flex items-center gap-1 px-1.5 py-1.5 min-[360px]:px-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white text-[10px] min-[360px]:text-xs sm:text-sm font-semibold hover:scale-105 transition shadow-lg shadow-pink-900/40"
                      >
                        <Pencil className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      {item.qrCode && (
                        <button
                          onClick={() => setQrModal(item)}
                          className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-purple-500 hover:scale-105 hover:bg-white/10 transition"
                        >
                          <QrCode className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal(item);
                        }}
                        className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-center text-red-400 hover:scale-105 hover:bg-red-500/15 transition"
                      >
                        <Trash2 className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 min-[360px]:gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-white/5">
                    <div className="flex items-start gap-2 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-2.5 py-2 min-[360px]:px-3 sm:px-4 sm:py-3 sm:col-span-2 lg:col-span-1">
                      <Globe className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 text-pink-400 mt-0.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] min-[360px]:text-xs text-gray-700 font-medium mb-0.5">
                          Original URL
                        </p>
                        <a
                          href={item.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] min-[360px]:text-xs text-gray-500 hover:text-gray-400 transition truncate block"
                        >
                          {item.originalUrl}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-2.5 py-2 min-[360px]:px-3 sm:px-4 sm:py-3">
                      <Hash className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] min-[360px]:text-xs text-gray-700 font-medium mb-0.5">
                          Short Code
                        </p>
                        <p className="text-[10px] min-[360px]:text-xs text-gray-500 font-mono">
                          {item.shortCode || "—"}
                        </p>
                      </div>
                    </div>

                      <div className="flex items-start gap-2 sm:gap-3 rounded-xl border border-white/5 bg-white/5 px-2.5 py-2 min-[360px]:px-3 sm:px-4 sm:py-3">
                        <ShieldCheck className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 text-pink-400 mt-0.5 shrink-0" />
                        <div className="min-h-0 flex-1">
                          <p className="text-[10px] min-[360px]:text-xs text-gray-700 font-medium mb-0.5">
                            Password
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] min-[360px]:text-xs text-gray-500 font-mono tracking-widest">
                              {visiblePasswords[item._id]
                                ? item.password
                                : "••••••••"}
                            </p>
                            <button
                              onClick={() => togglePassword(item._id)}
                              className="text-gray-500 hover:text-gray-400 transition"
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
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 py-10 sm:py-14 text-center">
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
              className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#1a0828]/95 backdrop-blur-2xl p-5 sm:p-8 shadow-2xl"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 sm:hidden" />

              <button
                onClick={() => setQrModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5 sm:mb-6">
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
                  className="w-36 h-36 sm:w-48 sm:h-48 object-contain"
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
              className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#1a0828]/95 backdrop-blur-2xl p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 sm:hidden" />

              <button
                onClick={closeEdit}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5 sm:mb-7">
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

              <div className="flex flex-col gap-3 sm:gap-5">
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

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 sm:mt-8">
                <button
                  onClick={closeEdit}
                  className="w-full sm:flex-1 py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/40"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{
              background: "rgba(12,4,24,0.85)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => !deleteLoading && setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#1a0828]/95 backdrop-blur-2xl p-5 sm:p-8 shadow-2xl"
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5 sm:hidden" />

              <button
                onClick={() => !deleteLoading && setDeleteModal(null)}
                disabled={deleteLoading}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg sm:text-xl">
                    Delete Short URL
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1.5 max-w-xs">
                    Are you sure you want to delete{" "}
                    <span className="text-pink-400 font-semibold">
                      {deleteModal.shortCode}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 mb-5 sm:mb-6">
                <p className="text-xs text-gray-500 font-medium mb-0.5">
                  Short URL
                </p>
                <p className="text-xs text-gray-300 truncate">
                  {deleteModal.shortUrl}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={deleteLoading}
                  className="w-full sm:flex-1 py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10 transition disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-red-900/40 ${deleteLoading ? "opacity-60 pointer-events-none" : ""}`}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notif.show && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="fixed right-3 bottom-5 sm:right-4 sm:bottom-8 z-50"
          >
            <div className="min-w-[200px] sm:min-w-[220px] rounded-xl bg-[#0f0720]/95 border border-white/5 p-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white font-semibold truncate">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UrlFetching;
