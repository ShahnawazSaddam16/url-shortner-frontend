"use client";

import React, { useState } from "react";

const UrlShortener = () => {
    const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN || "";

    const [originalUrl, setOriginalUrl] = useState("");
    const [customCode, setCustomCode] = useState("");
    const [password, setPassword] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const [options, setOptions] = useState({
        custom: false,
        password: false,
        expiry: false,
        qr: false,
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [qrCode, setQrCode] = useState("");
    const [error, setError] = useState("");

    const toggle = (key) => {
        setOptions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));

        if (key === "custom" && options.custom) setCustomCode("");
        if (key === "password" && options.password) setPassword("");
        if (key === "expiry" && options.expiry) setExpiryDate("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setResult(null);
        setQrCode("");

        if (!originalUrl) {
            setError("Please enter a URL");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                originalUrl,
            };

            if (options.custom && customCode) {
                payload.customCode = customCode;
            }

            if (options.password && password) {
                payload.password = password;
            }

            if (options.expiry && expiryDate) {
                payload.expiryDate = expiryDate;
            }

            const res = await fetch(`${API_ORIGIN}/shortner-url`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong");
            } else {
                setResult(data.shortUrl || "");
                setQrCode(data.data?.qrCode || "");
                setOriginalUrl("");
                setCustomCode("");
                setPassword("");
                setExpiryDate("");
            }

        } catch (err) {
            setError(err.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="rounded-3xl bg-linear-to-br from-white to-purple-50 border border-purple-100 shadow-[0_30px_60px_rgba(168,85,247,0.06)] p-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                        Shorten your link
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
                        <input
                            type="url"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            placeholder="Paste a long URL"
                            className="flex-1 w-full h-12 px-4 rounded-2xl bg-white border border-purple-100 shadow-sm text-sm outline-none focus:ring-2 focus:ring-purple-300"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-12 px-5 rounded-2xl text-white font-semibold shadow-md transition-all duration-200 ${loading
                                    ? "bg-purple-300 cursor-not-allowed"
                                    : "bg-linear-to-r from-purple-600 to-fuchsia-600 hover:scale-[1.02]"
                                }`}
                        >
                            {loading ? "Shortening..." : "Shorten"}
                        </button>
                    </form>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <button
                            type="button"
                            onClick={() => toggle("custom")}
                            className={`p-4 rounded-2xl text-left transition-all duration-200 ${options.custom
                                    ? "bg-linear-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg"
                                    : "bg-white border border-purple-100"
                                }`}
                        >
                            <div className="font-semibold">Custom URL</div>
                            <div className="text-xs mt-1">
                                Choose your short code
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => toggle("password")}
                            className={`p-4 rounded-2xl text-left transition-all duration-200 ${options.password
                                    ? "bg-linear-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg"
                                    : "bg-white border border-purple-100"
                                }`}
                        >
                            <div className="font-semibold">Password</div>
                            <div className="text-xs mt-1">
                                Protect with password
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => toggle("expiry")}
                            className={`p-4 rounded-2xl text-left transition-all duration-200 ${options.expiry
                                    ? "bg-linear-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg"
                                    : "bg-white border border-purple-100"
                                }`}
                        >
                            <div className="font-semibold">Expiry Date</div>
                            <div className="text-xs mt-1">
                                Set expiration
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => toggle("qr")}
                            className={`p-4 rounded-2xl text-left transition-all duration-200 ${options.qr
                                    ? "bg-linear-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg"
                                    : "bg-white border border-purple-100"
                                }`}
                        >
                            <div className="font-semibold">QR Code</div>
                            <div className="text-xs mt-1">
                                Generate QR code
                            </div>
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {options.custom && (
                            <input
                                value={customCode}
                                onChange={(e) => setCustomCode(e.target.value)}
                                placeholder="Custom short code"
                                className="h-11 px-3 rounded-2xl bg-white border border-purple-100 outline-none focus:ring-2 focus:ring-purple-300"
                            />
                        )}

                        {options.password && (
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="h-11 px-3 rounded-2xl bg-white border border-purple-100 outline-none focus:ring-2 focus:ring-purple-300"
                            />
                        )}

                        {options.expiry && (
                            <input
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="h-11 px-3 rounded-2xl bg-white border border-purple-100 outline-none focus:ring-2 focus:ring-purple-300"
                            />
                        )}
                    </div>

                    <div className="mt-5">
                        {error && (
                            <div className="text-red-500 font-medium">
                                {error}
                            </div>
                        )}

                        {result && (
                            <div className="mt-3 p-4 rounded-2xl bg-white border border-purple-100 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <a
                                        href={result}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-purple-700 font-semibold break-all"
                                    >
                                        {result}
                                    </a>

                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(result)
                                        }
                                        className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-all"
                                    >
                                        Copy
                                    </button>
                                </div>

                                {options.qr && qrCode && (
                                    <div className="mt-5">
                                        <img
                                            src={qrCode}
                                            alt="QR Code"
                                            className="w-40 h-40 rounded-2xl border border-purple-100"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UrlShortener;