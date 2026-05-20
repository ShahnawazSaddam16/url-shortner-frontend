import React from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const Heading = () => {
  return (
    <>
      <section
        className={`${montserrat.className} bg-transparent mt-20 flex justify-center items-center px-4`}
      >
        <header className="flex flex-col text-center max-w-3xl">
          <h1 className="text-[38px] sm:text-[52px] md:text-[54px] font-extrabold leading-tight tracking-tight text-gray-900">
            Transform your{" "}
            <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              long links
            </span>{" "}
            into
            <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}
              powerful URLs
            </span>
          </h1>
          <p className="mt-6 text-[14px] md:text-[16px] font-semibold text-gray-700 leading-relaxed text-center">
            Shorten, customize and track your links with advanced analytics. The
            complete solution to manage your digital campaigns.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href={"/dashboard"}><button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2">
              Visit Your Dashboard <ArrowRight size={20} />
            </button></Link>
          </div>
        </header>
      </section>
    </>
  );
};

export default Heading;
