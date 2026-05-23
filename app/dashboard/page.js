"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import WelcomeUser from "../components/DashboardComponents/WelcomeUser";
import UrlFetching from "../components/DashboardComponents/UrlFetching";
import { DashboardProvider } from "../components/DashboardComponents/DashboardProvider";

const Dashboard = () => {
  const router = useRouter();
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          router.push("/");
        }
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, API_ORIGIN]);

  if (loading) return null;

  return (
    <DashboardProvider>
      <Navbar />
      <WelcomeUser />
      <UrlFetching />
    </DashboardProvider>
  );
};

export default Dashboard;