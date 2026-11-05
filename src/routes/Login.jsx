/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sprout,
  Leaf,
  Sun,
  ArrowRight,
  TreePine,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  Sparkles,
  LogIn,
  UserPlus,
  Flower2,
} from "lucide-react";
import api from "../assets/api";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!formData.username.trim() || !formData.password) {
      setServerError("Please enter your username and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.post("/api/login/", {
        username: formData.username.trim(),
        password: formData.password,
      });

      const data = response.data;

      if (!data.userInfo) {
        throw new Error("The server did not return user information.");
      }

      // Save ALL serialized user information
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));

      // Optional: Save the login status
      localStorage.setItem("isLoggedIn", "true");

      // Redirect after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setServerError("Invalid username or password. Please try again.");
      } else if (error.response?.status === 400) {
        setServerError("Please check your username and password.");
      } else if (error.response?.status >= 500) {
        setServerError(
          "Something went wrong on our server. Please try again later.",
        );
      } else if (!error.response) {
        setServerError(
          "Unable to connect to the server. Please check your internet connection.",
        );
      } else {
        setServerError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Spring animation
  const spring = {
    type: "spring",
    stiffness: 250,
    damping: 15,
  };

  // Random-looking floating animation
  const floating = (delay = 0, duration = 5, distance = 12) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -distance, 0, distance / 2, 0],
          x: [0, 5, -4, 3, 0],
          rotate: [0, 10, -8, 5, 0],
        },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  // Entrance animations
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: spring,
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center items-center p-0 sm:p-6">
      {/* Mobile App Container */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[430px] min-h-screen sm:min-h-[850px] bg-white sm:shadow-2xl overflow-hidden relative flex flex-col"
      >
        {/* ================================================= */}
        {/* ANIMATED BACKGROUND */}
        {/* ================================================= */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Green Gradient */}
          <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-br from-[#2E9B59] via-[#3DBB6D] to-[#7BD89A] rounded-b-[20px]" />

          {/* Background Circles */}
          <motion.div
            {...floating(0, 8, 18)}
            className="absolute top-[-50px] right-[-45px] w-[150px] h-[150px] bg-white/10 rounded-full"
          />

          <motion.div
            {...floating(1, 7, 15)}
            className="absolute top-[120px] left-[-70px] w-[150px] h-[150px] bg-white/10 rounded-full"
          />

          <motion.div
            {...floating(2, 9, 20)}
            className="absolute top-[240px] right-[-50px] w-[120px] h-[120px] bg-[#C9F3D4]/20 rounded-full"
          />

          {/* Floating Particles */}
          {[
            { top: "9%", left: "72%", size: 8, delay: 0 },
            { top: "22%", left: "84%", size: 6, delay: 1.2 },
            { top: "16%", left: "12%", size: 7, delay: 2 },
            { top: "34%", left: "75%", size: 5, delay: 0.8 },
            { top: "28%", left: "25%", size: 9, delay: 1.8 },
          ].map((particle, index) => (
            <motion.div
              key={index}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -18, 0],
                      opacity: [0.2, 0.9, 0.2],
                      scale: [0.7, 1.3, 0.7],
                    }
              }
              transition={{
                duration: 3 + index * 0.7,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              className="absolute bg-white rounded-full"
            />
          ))}

          {/* Floating Leaves */}
          <motion.div
            {...floating(0.5, 4, 15)}
            className="absolute top-[270px] right-8 text-white/50"
          >
            <Leaf size={25} />
          </motion.div>

          <motion.div
            {...floating(1.5, 5, 18)}
            className="absolute top-[200px] left-8 text-white/40"
          >
            <Sprout size={23} />
          </motion.div>

          <motion.div
            {...floating(2, 4.5, 12)}
            className="absolute top-[315px] left-[65%] text-[#E7FFEA]/70"
          >
            <Flower2 size={20} />
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10 flex flex-col min-h-screen sm:min-h-[850px]">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="px-7 pt-12 text-white"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, -10, 10, 0],
                        scale: 1.12,
                      }
                }
                whileTap={{ scale: 0.85 }}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg"
              >
                <motion.span
                  animate={
                    shouldReduceMotion ? {} : { rotate: [0, 10, -10, 0] }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="text-2xl"
                >
                  🌱
                </motion.span>
              </motion.div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Scan-Grow
                </h1>

                <p className="text-xs text-white/80 font-medium">
                  Learn • Plant • Grow
                </p>
              </div>

              <motion.div {...floating(0.5, 4, 8)} className="ml-auto">
                <Sun size={25} className="text-[#FFF0B8]" />
              </motion.div>
            </div>

            {/* Welcome */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mt-12"
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-semibold text-white/80"
              >
                Welcome back, learner! 👋
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-[32px] leading-[1.1] font-extrabold mt-2"
              >
                Let's grow
                <br />
                something amazing.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-3 text-sm text-white/80 leading-relaxed max-w-[300px]"
              >
                Learn how to plant and care for fruit-bearing trees through fun
                and interactive activities.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ================================================= */}
          {/* LOGIN CARD */}
          {/* ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 80, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...spring,
              delay: 0.35,
            }}
            className="mt-10 bg-white rounded-t-[38px] flex-1 px-7 pt-8 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Card Heading */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-7"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-extrabold text-[#183B28]">
                  Sign in
                </h3>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.15, 1],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={20} className="text-[#B47A35]" />
                </motion.div>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Enter your account to continue learning.
              </p>
            </motion.div>

            {/* ================================================= */}
            {/* USERNAME FIELD */}
            {/* ================================================= */}

            <motion.div
              animate={
                focusedField === "username"
                  ? { scale: 1.025, x: 2 }
                  : { scale: 1, x: 0 }
              }
              transition={spring}
              className="mb-5"
            >
              <motion.label
                animate={{
                  color: focusedField === "username" ? "#2E9B59" : "#294936",
                }}
                className="block text-sm font-bold mb-2"
              >
                Username
              </motion.label>

              <div className="relative">
                {/* Animated Icon */}
                <motion.span
                  animate={
                    focusedField === "username"
                      ? {
                          scale: 1.2,
                          rotate: -8,
                          color: "#2E9B59",
                        }
                      : {
                          scale: 1,
                          rotate: 0,
                          color: "#9CA3AF",
                        }
                  }
                  transition={spring}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <UserRound size={20} />
                </motion.span>

                {/* Input Container */}
                <motion.div
                  animate={{
                    borderColor:
                      focusedField === "username" ? "#45B96D" : "transparent",
                    boxShadow:
                      focusedField === "username"
                        ? "0 0 0 4px rgba(69,185,109,0.12), 0 8px 20px rgba(46,155,89,0.08)"
                        : "0 0 0 0px transparent",
                    backgroundColor:
                      focusedField === "username" ? "#FFFFFF" : "#F4F8F5",
                  }}
                  transition={spring}
                  className="relative rounded-2xl border"
                >
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-14 rounded-2xl bg-transparent pl-12 pr-4 text-sm outline-none"
                  />
                </motion.div>

                {/* Focus Sparkle */}
                <AnimatePresence>
                  {focusedField === "username" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    >
                      <Sparkles size={17} className="text-[#45B96D]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ================================================= */}
            {/* PASSWORD FIELD */}
            {/* ================================================= */}

            <motion.div
              animate={
                focusedField === "password"
                  ? { scale: 1.025, x: 2 }
                  : { scale: 1, x: 0 }
              }
              transition={spring}
              className="mb-4"
            >
              <motion.label
                animate={{
                  color: focusedField === "password" ? "#2E9B59" : "#294936",
                }}
                className="block text-sm font-bold mb-2"
              >
                Password
              </motion.label>

              <div className="relative">
                {/* Animated Lock */}
                <motion.span
                  animate={
                    focusedField === "password"
                      ? {
                          scale: 1.2,
                          rotate: [0, -8, 8, 0],
                          color: "#2E9B59",
                        }
                      : {
                          scale: 1,
                          rotate: 0,
                          color: "#9CA3AF",
                        }
                  }
                  transition={spring}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <LockKeyhole size={20} />
                </motion.span>

                {/* Input Container */}
                <motion.div
                  animate={{
                    borderColor:
                      focusedField === "password" ? "#45B96D" : "transparent",
                    boxShadow:
                      focusedField === "password"
                        ? "0 0 0 4px rgba(69,185,109,0.12), 0 8px 20px rgba(46,155,89,0.08)"
                        : "0 0 0 0px transparent",
                    backgroundColor:
                      focusedField === "password" ? "#FFFFFF" : "#F4F8F5",
                  }}
                  transition={spring}
                  className="relative rounded-2xl border"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-14 rounded-2xl bg-transparent pl-12 pr-12 text-sm outline-none"
                  />
                </motion.div>

                {/* Show Password */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={
                    shouldReduceMotion ? {} : { scale: 1.2, rotate: 8 }
                  }
                  whileTap={{ scale: 0.8 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E9B59] z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showPassword ? "visible" : "hidden"}
                      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
                      transition={{ duration: 0.15 }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="my-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {serverError}
                </motion.div>
              )}
            </AnimatePresence>
            {/* ================================================= */}
            {/* SIGN IN BUTTON */}
            {/* ================================================= */}

            <motion.button
              type="button"
              onClick={handleLogin}
              disabled={isSubmitting}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.035,
                      y: -4,
                      boxShadow: "0 12px 25px rgba(46,155,89,0.3)",
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 0.95,
                      y: 2,
                    }
              }
              transition={spring}
              className="group relative overflow-hidden w-full h-14 rounded-2xl bg-[#2E9B59] text-white font-bold text-base shadow-lg shadow-[#2E9B59]/20 hover:bg-[#25824A] transition-colors flex items-center justify-center gap-3"
            >
              {/* Shine Animation */}
              <motion.div
                animate={shouldReduceMotion ? {} : { x: ["-150%", "250%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              />

              <motion.div
                whileHover={{ rotate: -10, scale: 1.15 }}
                className="relative z-10"
              >
                <LogIn size={19} />
              </motion.div>

              <span className="relative z-10">Sign In</span>

              <motion.div
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <ArrowRight size={19} />
              </motion.div>
            </motion.button>

            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="flex items-center gap-4 my-7">
              <div className="h-px bg-gray-200 flex-1" />

              <span className="text-xs text-gray-400 font-medium">or</span>

              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* ================================================= */}
            {/* CREATE ACCOUNT */}
            {/* ================================================= */}

            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.025,
                      y: -3,
                    }
              }
              whileTap={{ scale: 0.96 }}
              transition={spring}
            >
              <Link
                to="/register"
                className="group relative overflow-hidden w-full h-14 rounded-2xl border-2 border-[#DDEBE1] text-[#285238] font-bold text-sm flex items-center justify-center gap-3 hover:border-[#2E9B59] hover:bg-[#F4FAF6] transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  className="relative z-10"
                >
                  <UserPlus size={19} />
                </motion.div>

                <span className="relative z-10">Create New Account</span>

                <motion.div whileHover={{ x: 4 }} className="relative z-10">
                  <ArrowRight size={17} />
                </motion.div>
              </Link>
            </motion.div>

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] text-gray-400">Project Scan-Grow</p>

              <p className="text-[10px] text-gray-300 mt-1">
                Learn today. Plant tomorrow. Grow together. 🌿
              </p>

              <motion.div
                {...floating(0, 4, 5)}
                className="flex justify-center mt-3 text-[#7BD89A]"
              >
                <Sprout size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
