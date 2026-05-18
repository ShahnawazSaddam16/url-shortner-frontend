"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Link,
  LogOut,
  Menu,
  X,
  Mail,
  ShieldAlert,
  User,
} from "lucide-react";

const LogoutConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
    <div
      className="absolute inset-0 bg-[#12061d]/60 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onCancel}
    />

    <div className="relative overflow-hidden bg-white rounded-[34px] border border-purple-100 shadow-[0_30px_100px_rgba(168,85,247,0.28)] w-full max-w-md p-8 animate-in zoom-in-95 fade-in duration-200">
      <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-transparent via-purple-600 to-transparent" />

      <div className="absolute -top-24 -right-16 w-48 h-48 bg-purple-300/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-16 w-48 h-48 bg-fuchsia-300/30 blur-3xl rounded-full" />

      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 rounded-[30px] bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_20px_40px_rgba(168,85,247,0.35)]">
          <ShieldAlert className="w-9 h-9 text-white" />
        </div>

        <div className="text-center mt-6">
          <h3 className="text-[26px] font-black tracking-tight text-gray-900">
            Confirm Logout
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-[280px] mx-auto">
            You’re about to securely sign out from your UrlShortner account.
          </p>
        </div>

        <div className="flex gap-3 w-full mt-8">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-2xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all duration-150"
          >
            Stay Logged In
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const avatarRef = useRef(null);

  useEffect(() => {
    fetch(`${API_ORIGIN}/auth/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showLogoutModal || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showLogoutModal, menuOpen]);

  if (loading) return null;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogoutConfirm = async () => {
    await fetch(`${API_ORIGIN}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAvatarOpen(false);
    setMenuOpen(false);
    setShowLogoutModal(false);

    window.location.href = "/";
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Plans", path: "/" },
    { label: "Terms", path: "/terms" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes scanLine {
          0%,
          100% {
            left: -40%;
          }

          50% {
            left: 100%;
          }
        }
      `}</style>

      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <nav
          className={`bg-white/95 backdrop-blur-md border-b transition-all duration-300 relative overflow-visible ${
            scrolled
              ? "shadow-lg shadow-purple-100/50 border-purple-200/80"
              : "border-purple-100/50"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-[-40%] w-[40%] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[scanLine_5s_ease-in-out_infinite]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md shadow-purple-200 group-hover:shadow-purple-300 group-hover:scale-105 transition-all duration-200">
                <Link size={16} className="text-white" />
              </div>

              <span className="text-[17px] font-bold text-gray-900 tracking-tight group-hover:text-purple-700 transition-colors duration-200">
                Url<span className="text-purple-600">Shortner</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group"
                >
                  {link.label}

                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full group-hover:w-5 transition-all duration-300" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />

                <span className="text-xs font-semibold text-purple-700 tracking-wide">
                  Smart Links
                </span>
              </div>

              {user ? (
                <div ref={avatarRef} className="relative">
                  <button
                    onClick={() => setAvatarOpen((prev) => !prev)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-200 ring-2 ring-white ${
                      avatarOpen ? "ring-purple-300 scale-105" : ""
                    }`}
                  >
                    {initials}
                  </button>

                  <div
                    className={`absolute right-0 mt-3 w-72 bg-white border border-purple-100 rounded-[30px] shadow-2xl shadow-purple-100/60 overflow-hidden transition-all duration-200 origin-top-right ${
                      avatarOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
                    }`}
                  >
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-white">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-200">
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {user.name}
                          </p>

                          <div className="flex items-center gap-1 mt-1">
                            <Mail className="w-3.5 h-3.5 text-purple-400" />

                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          router.push("/profile");
                          setAvatarOpen(false);
                        }}
                        className="mt-5 w-full h-11 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:scale-[1.01] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/Auth")}
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full hover:from-purple-700 hover:to-purple-800 active:scale-95 shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 transition-all duration-200"
                >
                  Login
                </button>
              )}

              {user && (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="h-10 px-5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-purple-700" />
                ) : (
                  <Menu className="w-5 h-5 text-purple-700" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={`md:hidden bg-white/98 backdrop-blur-xl border-b border-purple-100 overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {user && (
              <button
                onClick={() => {
                  router.push("/profile");
                  setMenuOpen(false);
                }}
                className="mb-3 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4 shadow-sm text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-200">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />

                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {navLinks.map((link, i) => (
              <button
                key={link.path}
                onClick={() => {
                  router.push(link.path);
                  setMenuOpen(false);
                }}
                className={`flex items-center justify-between text-left px-4 py-3.5 text-sm font-medium text-gray-700 rounded-2xl hover:bg-purple-50 hover:text-purple-700 transition-all duration-150 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                }}
              >
                {link.label}

                <div className="w-2 h-2 rounded-full bg-purple-400" />
              </button>
            ))}

            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                className="mt-2 flex items-center gap-2 text-left px-4 py-3.5 text-sm font-medium text-red-500 rounded-2xl hover:bg-red-50 transition-all duration-150 border border-red-100"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/Auth");
                  setMenuOpen(false);
                }}
                className="mt-2 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-lg shadow-purple-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
};

export default Navbar;