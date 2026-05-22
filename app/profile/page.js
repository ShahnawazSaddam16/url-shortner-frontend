"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Header from "../components/ProfileComponents/Header";
import UserStats from "../components/ProfileComponents/UserStats";
import DeleteAccount from "../components/ProfileComponents/DeleteAccount";
import QuickActions from "../components/ProfileComponents/QuickActions";
import UrlSummary from "../components/ProfileComponents/UrlSummary";


const Profile = () => {
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
    
      if (loading) {
        null;
      }
    

  return (
    <>
    <Navbar />
    <Header />
    <div className="flex flex-col sm:flex-row justify-center lg:justify-between items-center">
    <UrlSummary />
    <div className="flex flex-col">
    <QuickActions />
    <DeleteAccount />
    </div>
    </div>
    </>
  )
}

export default Profile;