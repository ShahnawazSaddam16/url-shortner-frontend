"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const res = await fetch(`${API_ORIGIN}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <section className="mt-6 w-full flex justify-center lg:justify-end px-4 sm:px-6">
        <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-red-500/20 shadow-2xl backdrop-blur-xl p-6">
          <h1 className="text-2xl font-bold text-red-500 tracking-tight">
            Danger Zone
          </h1>

          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Permanently remove your account and all associated data. This action
            cannot be undone.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-semibold py-3 shadow-lg"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] border border-red-500/20 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="text-red-500" size={28} />
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-white">
              Delete Account?
            </h2>

            <p className="mt-3 text-center text-sm text-gray-400 leading-relaxed">
              This will permanently delete your account and remove all your data.
              This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="w-full rounded-2xl bg-white/5 border border-white/10 py-3 text-white font-medium hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full rounded-2xl bg-red-500 hover:bg-red-600 py-3 text-white font-semibold transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;