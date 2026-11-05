/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogOut, Sprout, Sun, Leaf, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WelcomeHeader() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [firstName, setFirstName] = useState("Learner");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const loadUser = () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo") || "null",
        );

        setFirstName(userInfo?.first_name?.trim() || "Learner");
      } catch (error) {
        console.error("Failed to load user information:", error);
        setFirstName("Learner");
      }
    };

    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good evening");
      } else {
        setGreeting("Hello, night owl");
      }
    };

    loadUser();
    updateGreeting();

    window.addEventListener("focus", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("focus", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const floating = (delay = 0) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -10, 0],
          rotate: [0, 8, -8, 0],
        },
    transition: {
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#2E9B59] via-[#3DBB6D] to-[#83D99D] px-6 pt-8 pb-12 rounded-b-[32px]">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full border-[35px] border-white/10" />

        <div className="absolute -bottom-20 -left-12 w-52 h-52 rounded-full bg-white/10" />

        <motion.div
          {...floating(0)}
          className="absolute top-20 right-12 text-white/30"
        >
          <Leaf size={35} />
        </motion.div>

        <motion.div
          {...floating(1)}
          className="absolute bottom-10 right-28 text-white/30"
        >
          <Sprout size={30} />
        </motion.div>

        <motion.div
          {...floating(0.5)}
          className="absolute top-32 left-5 text-white/20"
        >
          <Sparkles size={22} />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Top navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-lg">
              <span className="text-2xl">🌱</span>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white">
                Scan-Grow
              </h2>

              <p className="text-[10px] font-medium text-white/75">
                Learn • Plant • Grow
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/20 border border-white/30 text-white backdrop-blur-md hover:bg-white/30 transition"
            aria-label="Logout"
          >
            <LogOut size={19} />
          </motion.button>
        </div>

        {/* Welcome text */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white/80">
              {greeting}
            </p>

            <Sun size={16} className="text-[#FFF0B8]" />
          </div>

          <h1 className="mt-1 text-[32px] leading-tight font-black tracking-tight text-white break-words">
            Hi, {firstName}!
          </h1>

          <p className="mt-2 max-w-[270px] text-[12px] leading-relaxed text-white/85">
            Ready to grow your knowledge and discover something amazing today?
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/20 px-3 py-2 backdrop-blur-md">
            <Sprout size={15} className="text-[#E4FFE9]" />

            <span className="text-[10px] font-bold text-white">
              Your learning journey starts here
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default WelcomeHeader;