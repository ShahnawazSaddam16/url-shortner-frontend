"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);

  const fetchUrls = useCallback(async () => {
    try {
      const res = await fetch(`${API_ORIGIN}/user-urls`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUrls(data.user_urls);
        setTotalClicks(data.totalClicks || 0);
      }
    } catch (err) {}
  }, [API_ORIGIN]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_ORIGIN}/auth/me`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {}
  }, [API_ORIGIN]);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchUrls(), fetchUser()]);
  }, [fetchUrls, fetchUser]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <DashboardContext.Provider
      value={{ urls, setUrls, user, totalClicks, setTotalClicks, fetchUrls, refreshAll }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
