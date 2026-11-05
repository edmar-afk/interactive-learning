/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Leaf,
  Sun,
  ArrowRight,
  TreePine,
  LogIn,
  UserPlus,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function Welcome() {
  const shouldReduceMotion = useReducedMotion();

  // Reusable spring animation
  const spring = {
    type: "spring",
    stiffness: 180,
    damping: 12,
  };

  const floating = (delay = 0, duration = 3) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -12, 0, 8, 0],
          rotate: [0, 5, -4, 3, 0],
        },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 35, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: spring,
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const interactive = {
    whileHover: shouldReduceMotion
      ? {}
      : {
          scale: 1.08,
          rotate: 2,
          transition: spring,
        },
    whileTap: shouldReduceMotion
      ? {}
      : {
          scale: 0.9,
          transition: spring,
        },
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center">
      {/* Mobile App Container */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[430px] min-h-screen bg-[#EAF7EE] relative overflow-hidden flex flex-col"
      >
        {/* Decorative Background */}
        <motion.div
          {...floating(0, 7)}
          className="absolute -top-24 -right-24 w-64 h-64 bg-[#7BD89A]/30 rounded-full"
        />

        <motion.div
          {...floating(1, 8)}
          className="absolute top-28 -left-28 w-56 h-56 bg-[#C9A66B]/20 rounded-full"
        />

        {/* Extra floating decorative circles */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 0.9, 1],
                  opacity: [0.2, 0.5, 0.2],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[45%] right-[-25px] w-20 h-20 bg-[#7BD89A]/20 rounded-full"
        />

        {/* Top Section */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="relative z-10 px-7 pt-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <motion.div
              {...interactive}
              className="w-10 h-10 rounded-2xl bg-[#2E9B59] flex items-center justify-center shadow-sm"
            >
              <Sprout className="w-5 h-5 text-white" />
            </motion.div>

            <div>
              <p className="text-[11px] font-semibold text-[#6B806F] tracking-wide uppercase">
                Welcome to
              </p>

              <h1 className="text-lg font-extrabold text-[#315C3C]">
                Interactive Learning Application
              </h1>
            </div>
          </div>

          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.2 }}
            className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-[#B47A35]" />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-7"
        >
          {/* Illustration */}
          <motion.div
            variants={fadeUp}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.04,
                    rotate: [0, -1.5, 1.5, 0],
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }
            }
            className="relative w-[270px] h-[270px] mb-7"
            style={{ perspective: 1000 }}
          >
            {/* Main Circle */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -5, 0],
                      scale: [1, 1.015, 1],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-5 rounded-full bg-[#D5F0DC] border-[10px] border-white shadow-lg flex items-center justify-center"
            >
              {/* Ground */}
              <div className="absolute bottom-8 left-8 right-8 h-[62px] bg-[#9A683E] rounded-[50%_50%_45%_45%]" />

              {/* Plant Stem */}
              <motion.div
                initial={shouldReduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  ease: "backOut",
                }}
                style={{ transformOrigin: "bottom" }}
                className="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[13px] h-[105px] bg-[#3D8C4F] rounded-full"
              />

              {/* Left Leaf */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, rotate: -35 }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1,
                        rotate: [18, 23, 15, 18],
                      }
                }
                transition={{
                  scale: {
                    delay: 0.9,
                    ...spring,
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{ transformOrigin: "bottom right" }}
                className="absolute bottom-[125px] left-[66px] w-[75px] h-[43px] bg-[#4EAA61] rounded-[100%_0_100%_0] rotate-[18deg] shadow-sm"
              />

              {/* Right Leaf */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, rotate: 35 }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1,
                        rotate: [-18, -23, -15, -18],
                      }
                }
                transition={{
                  scale: {
                    delay: 1.1,
                    ...spring,
                  },
                  rotate: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{ transformOrigin: "bottom left" }}
                className="absolute bottom-[150px] right-[60px] w-[78px] h-[45px] bg-[#2E9B59] rounded-[0_100%_0_100%] -rotate-[18deg] shadow-sm"
              />

              {/* Top Leaves */}
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0, y: 15 }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.08, 1],
                        y: [0, -4, 0],
                      }
                }
                transition={{
                  delay: 1.3,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[177px] left-[105px] w-[62px] h-[38px] bg-[#68BD73] rounded-[100%_0_100%_0] rotate-[5deg]"
              />

              {/* Pot */}
              <motion.div
                whileHover={
                  shouldReduceMotion ? {} : { scale: 1.12, rotate: 3 }
                }
                className="absolute bottom-[36px] left-1/2 -translate-x-1/2"
              >
                <div className="w-[72px] h-[18px] bg-[#B47A35] rounded-full relative z-10" />
                <div className="w-[58px] h-[48px] bg-[#A86F39] mx-auto rounded-b-[20px] clip-path-polygon" />
              </motion.div>
            </motion.div>

            {/* Floating Leaf */}
            <motion.div
              {...floating(0.5, 3.5)}
              whileHover={{
                scale: 1.3,
                rotate: 35,
                transition: spring,
              }}
              whileTap={{ scale: 0.8 }}
              className="absolute top-3 right-1 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center rotate-12 cursor-pointer"
            >
              <Leaf className="w-6 h-6 text-[#3DBB6D]" />
            </motion.div>

            {/* Floating Tree */}
            <motion.div
              {...floating(1, 4)}
              whileHover={{
                scale: 1.3,
                rotate: -30,
                transition: spring,
              }}
              whileTap={{ scale: 0.8 }}
              className="absolute bottom-4 left-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center -rotate-12 cursor-pointer"
            >
              <TreePine className="w-6 h-6 text-[#6D8E4E]" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="text-center max-w-[350px]">
            <motion.p
              whileHover={{ scale: 1.1 }}
              className="text-[#B47A35] font-bold text-sm mb-2"
            >
              GROW • LEARN • PLANT
            </motion.p>

            <motion.h2
              whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
              className="text-[34px] leading-[1.08] font-extrabold text-[#315C3C]"
            >
              Let's Grow
              <br />
              <span className="text-[#2E9B59]">Something Amazing!</span>
            </motion.h2>

            <p className="mt-4 text-[14px] leading-6 text-[#68796D] px-3">
              Discover the wonderful world of plants and learn how to grow
              healthy, fruit-bearing trees step by step.
            </p>
          </motion.div>

          {/* Small Features */}
          <motion.div
            variants={staggerContainer}
            className="flex items-center gap-3 mt-7"
          >
            {[
              {
                icon: Sprout,
                label: "Learn",
                color: "#2E9B59",
              },
              {
                icon: Leaf,
                label: "Plant",
                color: "#3DBB6D",
              },
              {
                icon: TreePine,
                label: "Grow",
                color: "#9A683E",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    scale: 1.12,
                    rotate: index % 2 === 0 ? -4 : 4,
                    transition: spring,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm cursor-pointer"
                >
                  <Icon className="w-4 h-4" style={{ color: item.color }} />

                  <span className="text-xs font-semibold text-[#49624E]">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...spring,
            delay: 0.8,
          }}
          className="relative z-10 px-6 pb-7 pt-4"
        >
          {/* <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.045,
                    y: -4,
                    transition: spring,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? {}
                : {
                    scale: 0.94,
                    y: 2,
                  }
            }
          >
            <Link
              to="/dashboard"
              className="w-full h-[60px] bg-[#2E9B59] hover:bg-[#27834B] transition-colors rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-[16px] shadow-lg shadow-[#2E9B59]/25"
            >
              <motion.span whileHover={{ x: -3 }}>Start Learning</motion.span>

              <motion.div
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div> */}

          {/* Login and Register Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {/* LOGIN BUTTON */}
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -5,
                      scale: 1.035,
                      transition: spring,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 0.94,
                      transition: spring,
                    }
              }
            >
              <Link
                to="/login"
                className="group relative overflow-hidden w-full h-[62px] bg-white border-2 border-[#B9DFC3] hover:border-[#2E9B59] rounded-2xl flex items-center justify-center gap-2 text-[#315C3C] font-bold text-[15px] shadow-sm hover:shadow-lg hover:shadow-[#2E9B59]/10 transition-colors"
              >
                {/* Hover Background */}
                <motion.div
                  initial={{ x: "-110%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-[#E0F4E5]"
                />

                <motion.div
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  className="relative z-10"
                >
                  <LogIn className="w-[19px] h-[19px]" />
                </motion.div>

                <span className="relative z-10">Login</span>

                <motion.div className="relative z-10" whileHover={{ x: 4 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* REGISTER BUTTON */}
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -5,
                      scale: 1.035,
                      transition: spring,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 0.94,
                      transition: spring,
                    }
              }
            >
              <Link
                to="/register"
                className="group relative overflow-hidden w-full h-[62px] bg-[#2E9B59] hover:bg-[#27834B] rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-[15px] shadow-lg shadow-[#2E9B59]/25 hover:shadow-xl hover:shadow-[#2E9B59]/35 transition-colors"
              >
                {/* Animated Shine */}
                <motion.div
                  initial={{ x: "-150%" }}
                  animate={shouldReduceMotion ? {} : { x: ["-150%", "150%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                />

                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="relative z-10"
                >
                  <UserPlus className="w-[19px] h-[19px]" />
                </motion.div>

                <span className="relative z-10">Register</span>

                <motion.div className="relative z-10" whileHover={{ x: 4 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <p className="text-center text-[11px] text-[#819084] mt-3">
            Your journey to becoming a better gardener starts here 🌱
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Welcome;
