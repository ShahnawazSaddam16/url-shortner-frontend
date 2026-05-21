"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Link2, ArrowRight, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  const ok = type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-medium w-[90vw] max-w-[340px] ${ok ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-700"}`}
    >
      {ok ? <CheckCircle2 size={17} className="text-emerald-500 shrink-0" /> : <AlertCircle size={17} className="text-red-400 shrink-0" />}
      <span className="flex-1 leading-snug">{message}</span>
      <button onClick={onClose} className={`shrink-0 rounded-full p-0.5 hover:bg-black/10 transition ${ok ? "text-emerald-500" : "text-red-400"}`}><X size={13} /></button>
    </motion.div>
  );
};

const AnimatedBg = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#7c3aed" fillOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>

    <svg className="absolute -top-24 -left-24 opacity-[0.08]" width="480" height="480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "240px 240px" }}>
        <circle cx="240" cy="240" r="200" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="22 12" />
        <circle cx="240" cy="240" r="148" fill="none" stroke="#9333ea" strokeWidth="1" strokeDasharray="10 16" />
        <circle cx="240" cy="240" r="96" fill="none" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="5 20" />
      </motion.g>
    </svg>

    <svg className="absolute -bottom-28 -right-28 opacity-[0.07]" width="560" height="560" viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
      <motion.g animate={{ rotate: -360 }} transition={{ duration: 110, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "280px 280px" }}>
        <circle cx="280" cy="280" r="240" fill="none" stroke="#6d28d9" strokeWidth="1.5" strokeDasharray="24 14" />
        <circle cx="280" cy="280" r="180" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="12 18" />
      </motion.g>
    </svg>

    <motion.svg
      className="absolute top-[18%] right-[8%] opacity-[0.09]"
      width="100" height="100" viewBox="0 0 24 24"
      animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#9333ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>

    <motion.svg
      className="absolute bottom-[22%] left-[7%] opacity-[0.08]"
      width="72" height="72" viewBox="0 0 24 24"
      animate={{ y: [0, 13, 0], rotate: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#a855f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>

    <motion.svg
      className="absolute top-[55%] right-[4%] opacity-[0.06]"
      width="56" height="56" viewBox="0 0 24 24"
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="#9333ea" strokeWidth="1.3" />
      <path d="M8 21h8M12 17v4" fill="none" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round" />
    </motion.svg>

    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-100 opacity-25 blur-[110px] -translate-x-1/3 -translate-y-1/3" />
    <div className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full bg-violet-100 opacity-20 blur-[90px] translate-x-1/3 translate-y-1/3" />
    <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] rounded-full bg-purple-50 opacity-50 blur-[70px] -translate-x-1/2 -translate-y-1/2" />
  </div>
);

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-0.5">
    {label && <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</label>}
    {children}
    {error && (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
        <AlertCircle size={11} /> {error}
      </motion.p>
    )}
  </div>
);

const Auth = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const showToast = (type, message) => setToast({ type, message });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (isSignup && !formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "At least 6 characters";
    if (isSignup && formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    setLoading(true);
    setFieldErrors({});
    const url = isSignup ? `${API_ORIGIN}/auth/signin` : `${API_ORIGIN}/auth/login`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(isSignup ? { name: formData.name, email: formData.email, password: formData.password } : { email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message || "Something went wrong. Please try again.");
      } else {
        showToast("success", isSignup ? "Account created! Redirecting…" : "Welcome back! Redirecting…");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => router.push("/home"), 1400);
      }
    } catch {
      showToast("error", "Unable to reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setFieldErrors({});
    setToast(null);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const inputBase = "w-full px-3.5 py-2 rounded-xl bg-slate-50 text-slate-900 border text-sm placeholder:text-slate-300 outline-none transition-all duration-150 focus:ring-2 focus:ring-purple-100 focus:bg-white";
  const inputNormal = "border-slate-200 focus:border-purple-400";
  const inputError = "border-red-300 focus:border-red-400 bg-red-50";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatedBg />

      <AnimatePresence>
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-[400px]">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-200 mb-3">
            <Link2 className="text-white w-6 h-6" />
          </div>
          <h1 className="text-[22px] font-black text-slate-900 tracking-tight leading-none">
            Url-<span className="text-purple-600">Shortener</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Shorten · Share · Track</p>
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {[["⚡", "Instant links"], ["📊", "Analytics"], ["🔒", "Secure"]].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-100 rounded-full px-2.5 py-1">
                {icon} {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-purple-100/60 p-6"
        >
          <div className="flex bg-slate-100 rounded-xl p-1 mb-5 gap-1">
            {["Sign Up", "Login"].map((label, i) => {
              const active = isSignup ? i === 0 : i === 1;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => { if ((i === 0) !== isSignup) switchMode(); }}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${active ? "bg-white text-purple-700 shadow-sm shadow-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            <h2 className="text-base font-extrabold text-slate-900">{isSignup ? "Create your account" : "Welcome back"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{isSignup ? "Free forever — no credit card needed." : "Log in to manage your links."}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {isSignup && (
                <motion.div key="name" initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                  <Field label="Full Name" error={fieldErrors.name}>
                    <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.name ? inputError : inputNormal}`} />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            <Field label="Email" error={fieldErrors.email}>
              <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}
                className={`${inputBase} ${fieldErrors.email ? inputError : inputNormal}`} />
            </Field>

            <Field label="Password" error={fieldErrors.password}>
              <div className="relative">
                <input type={showPass ? "text" : "password"} name="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange}
                  className={`${inputBase} pr-10 ${fieldErrors.password ? inputError : inputNormal}`} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-purple-500 transition">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            <AnimatePresence initial={false}>
              {isSignup && (
                <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                  <Field label="Confirm Password" error={fieldErrors.confirmPassword}>
                    <div className="relative">
                      <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange}
                        className={`${inputBase} pr-10 ${fieldErrors.confirmPassword ? inputError : inputNormal}`} />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-purple-500 transition">
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSignup && (
              <div className="text-right -mt-1">
                <span className="text-[11px] text-purple-500 hover:text-purple-700 cursor-pointer hover:underline font-semibold">Forgot password?</span>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:from-purple-700 hover:to-violet-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Please wait…
                </>
              ) : (
                <>{isSignup ? "Create Account" : "Login"}<ArrowRight size={15} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-[11px] text-slate-400 mt-4">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <span onClick={switchMode} className="text-purple-600 font-bold cursor-pointer hover:underline">
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </motion.div>

        <p className="text-center text-[10px] text-slate-400 mt-4">
          By signing up you agree to our{" "}
          <span className="text-purple-500 cursor-pointer hover:underline">Terms</span> &{" "}
          <span className="text-purple-500 cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
