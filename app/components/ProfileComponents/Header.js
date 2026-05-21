import React from 'react';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const Header = () => {
  return (
    <>
    <section className='mt-5'>
        <header className='bg-gradient-to-r from-[#12061d] via-[#1a0828] to-[#2b0d42] w-full
        h-25 flex flex-col justify-start items-start text-white'>
            <h1 className={`${montserrat.className} font-extrabold text-[30px] ml-2 mt-1`}>
            My Profile</h1>
            <p className={`${montserrat.className} ml-2 text-[15px]`}>
            Manage your personal information and account settings</p>
        </header>
        
    </section>
    </>
  )
}

export default Header; 