"use client";

import { useRouter } from "next/navigation";
import { Link2 } from "lucide-react";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-purple-100 mt-12 lg:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Link2 size={18} />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">
              Url<span className="text-purple-600">-Shortner</span>
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Smart links. Powerful analytics. Fast delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/plan-history")}
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Plan History
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  URL Shortening
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  QR Codes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200"
                >
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-100 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2026 UrlShortner. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200">
                GitHub
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-purple-700 transition-colors duration-200">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;