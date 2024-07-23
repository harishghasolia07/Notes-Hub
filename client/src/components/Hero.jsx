import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="relative h-full bg-BgImage bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      <div className="relative z-10 w-full max-w-[860px] text-center text-white">
        <h1 className="text-4xl font-black md:text-5xl">FIND MY NOTES</h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
          Welcome to Find My Notes – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence. Simplify your student life, make your
          notes work for you – discover a new era of innovation, start today
        </p>
        <div className="mt-5">
            {/* <Link to="/search">
                <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500">Get Started</button>
            </Link> */}
           <div className="flex justify-center items-center gap-5">
           {isAuthenticated ? (
              <Link to="/search" className="mr-10 rounded-xl bg-white px-6 py-3 text-lg font-bold text-blue-500 hover:bg-gray-100">Get Started</Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
                    Signup
                  </button>
                </Link>
              </>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
