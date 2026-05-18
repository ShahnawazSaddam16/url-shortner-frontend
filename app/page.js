"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "./Auth/Auth";

export default function Home() {
  const router = useRouter();

  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(
          `${API_ORIGIN}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          router.push("/dashboard");
        } else {
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

  if (loading) {
null
  }

  return(
    <>
    <Auth />;
    </>
  )
}