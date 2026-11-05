/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sprout,
  Leaf,
  Sun,
  Sparkles,
  UserRound,
  GraduationCap,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  Flower2,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const shouldReduceMotion = useReducedMotion();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [focusedField, setFocusedField] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const passwordChecks = [
    {
      label: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    {
      label: "Contains a number",
      valid: /\d/.test(formData.password),
    },
    {
      label: "Contains an uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
  ];

  const passwordStrength = passwordChecks.filter((check) => check.valid).length;

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const passwordsDoNotMatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const floating = (delay = 0, duration = 5, distance = 12) => ({
    animate: shouldReduceMotion
      ? {}
      : {
          y: [0, -distance, 0],
          rotate: [0, 5, -5, 0],
        },
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  });

  const enterAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");

    if (!formData.firstName.trim()) {
      setServerError("Please enter your full name.");
      return;
    }

    if (!formData.username.trim()) {
      setServerError("Please enter a username.");
      return;
    }

    if (passwordStrength !== 3) {
      setServerError("Please create a stronger password.");
      return;
    }

    if (!passwordsMatch) {
      setServerError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setServerError("Please agree to the learning guidelines.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName.trim(),
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data === "object"
            ? Object.entries(data)
                .map(([field, errors]) => {
                  const messages = Array.isArray(errors)
                    ? errors.join(", ")
                    : String(errors);

                  return `${field}: ${messages}`;
                })
                .join("\n")
            : "Registration failed.";

        throw new Error(errorMessage);
      }

      alert("Account created successfully! Please log in.");

      // Registration does not automatically log the user in.
      navigate("/");
    } catch (error) {
      setServerError(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full h-14 rounded-2xl bg-[#F4F8F5] border pl-12 pr-12 text-sm text-[#183B28] placeholder:text-gray-400 outline-none transition-all duration-300 ${
      focusedField === field
        ? "bg-white border-[#45B96D] ring-4 ring-[#45B96D]/10 shadow-[0_5px_20px_rgba(46,155,89,0.08)]"
        : "border-transparent"
    }`;

  const fieldIconClass = (field) =>
    `absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
      focusedField === field ? "text-[#2E9B59]" : "text-gray-400"
    }`;

  const renderPasswordToggle = (visible, toggle) => (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.85 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E9B59] transition-colors"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={visible ? "visible" : "hidden"}
          initial={
            shouldReduceMotion ? {} : { opacity: 0, scale: 0.7, rotate: -30 }
          }
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={
            shouldReduceMotion ? {} : { opacity: 0, scale: 0.7, rotate: 30 }
          }
          transition={{ duration: 0.15 }}
          className="block"
        >
          {visible ? <Eye size={20} /> : <EyeOff size={20} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center items-center p-0 sm:p-6 overflow-hidden">
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[850px] bg-white sm:shadow-2xl overflow-hidden relative flex flex-col">
        {/* Background */}
        <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-br from-[#247D47] via-[#2E9B59] to-[#7BD89A] rounded-b-[20px]" />

        {/* Decorative circles */}
        <motion.div
          {...floating(0, 8, 18)}
          className="absolute top-[-50px] right-[-45px] w-[170px] h-[170px] bg-white/10 rounded-full"
        />

        <motion.div
          {...floating(1, 7, 14)}
          className="absolute top-[140px] left-[-75px] w-[170px] h-[170px] bg-white/10 rounded-full"
        />

        <motion.div
          {...floating(0.5, 6, 10)}
          className="absolute top-[260px] right-[20px] w-16 h-16 bg-white/10 rounded-full"
        />

        {/* Floating decorations */}
        <motion.div
          {...floating(0, 5, 15)}
          className="absolute top-[55px] right-[75px] text-white/40"
        >
          <Leaf size={25} />
        </motion.div>

        <motion.div
          {...floating(1, 6, 12)}
          className="absolute top-[210px] right-[35px] text-white/40"
        >
          <Sparkles size={23} />
        </motion.div>

        <motion.div
          {...floating(0.7, 7, 16)}
          className="absolute top-[300px] left-[35px] text-[#2E9B59]/20 z-10"
        >
          <Flower2 size={28} />
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col min-h-screen sm:min-h-[850px]">
          {/* Header */}
          <motion.div {...enterAnimation} className="px-7 pt-10 text-white">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={
                  shouldReduceMotion ? {} : { rotate: 12, scale: 1.08 }
                }
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Sprout size={29} className="text-[#2E9B59]" />
              </motion.div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Scan-Grow
                </h1>
                <p className="text-xs text-white/80 font-medium">
                  Learn • Plant • Grow
                </p>
              </div>
            </div>

            {/* Header message */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-8 pb-2"
            >
              <p className="text-sm font-semibold text-white/80">
                Start your learning journey 🌿
              </p>

              <h2 className="text-[30px] leading-[1.1] font-extrabold mt-2">
                Let's grow
                <br />
                together!
              </h2>

              <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-[310px]">
                Create your Scan-Grow account and discover the fun of planting
                and caring for fruit-bearing trees.
              </p>
            </motion.div>
          </motion.div>

          {/* Register card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.65,
              type: "spring",
              stiffness: 90,
            }}
            className="mt-7 bg-white rounded-t-[38px] flex-1 px-7 pt-7 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Title */}
            <div className="mb-6">
              <motion.h3
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="text-2xl font-extrabold text-[#183B28]"
              >
                Create account
              </motion.h3>

              <p className="text-sm text-gray-500 mt-1">
                Fill in your details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Role selection */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <label className="block text-sm font-bold text-[#294936] mb-2">
                  I am a...
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "student",
                      label: "Student",
                      icon: GraduationCap,
                      emoji: "🎒",
                    },
                    {
                      value: "teacher",
                      label: "Teacher",
                      icon: UserRound,
                      emoji: "👩‍🏫",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const selected = role === item.value;

                    return (
                      <motion.button
                        key={item.value}
                        type="button"
                        onClick={() => setRole(item.value)}
                        whileHover={shouldReduceMotion ? {} : { y: -3 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                        className={`relative h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 overflow-hidden ${
                          selected
                            ? "border-[#2E9B59] bg-[#F0FAF3] text-[#2E9B59] shadow-[0_4px_14px_rgba(46,155,89,0.10)]"
                            : "border-[#E4ECE6] text-gray-500 hover:bg-[#F8FBF9]"
                        }`}
                      >
                        {selected && (
                          <motion.div
                            layoutId="selectedRole"
                            className="absolute inset-0 bg-[#F0FAF3] rounded-xl"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}

                        <span className="relative z-10 text-lg">
                          {item.emoji}
                        </span>

                        <span className="relative z-10">{item.label}</span>

                        <AnimatePresence>
                          {selected && (
                            <motion.span
                              initial={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 0, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-2 top-2 text-[#2E9B59]"
                            >
                              <CheckCircle2 size={15} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* First name */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-4"
              >
                <label className="block text-sm font-bold text-[#294936] mb-2">
                  Full Name
                </label>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { scale: focusedField === "firstName" ? 1.015 : 1 }
                  }
                  className="relative"
                >
                  <UserRound
                    size={20}
                    className={fieldIconClass("firstName")}
                  />

                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter your Full Name"
                    autoComplete="given-name"
                    className={inputClass("firstName")}
                  />

                  <AnimatePresence>
                    {focusedField === "firstName" && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#45B96D]"
                      >
                        <Sparkles size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Username */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4"
              >
                <label className="block text-sm font-bold text-[#294936] mb-2">
                  Username
                </label>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { scale: focusedField === "username" ? 1.015 : 1 }
                  }
                  className="relative"
                >
                  <UserRound size={20} className={fieldIconClass("username")} />

                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Choose a username"
                    autoComplete="username"
                    className={inputClass("username")}
                  />

                  <AnimatePresence>
                    {focusedField === "username" && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#45B96D]"
                      >
                        <Sparkles size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mb-4"
              >
                <label className="block text-sm font-bold text-[#294936] mb-2">
                  Password
                </label>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { scale: focusedField === "password" ? 1.015 : 1 }
                  }
                  className="relative"
                >
                  <LockKeyhole
                    size={20}
                    className={fieldIconClass("password")}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className={inputClass("password")}
                  />

                  {renderPasswordToggle(showPassword, () =>
                    setShowPassword((prev) => !prev),
                  )}
                </motion.div>

                {/* Password strength */}
                <AnimatePresence>
                  {formData.password.length > 0 && (
                    <motion.div
                      initial={
                        shouldReduceMotion ? {} : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-1.5 mt-3">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width:
                                  passwordStrength >= level ? "100%" : "0%",
                              }}
                              transition={{ duration: 0.3 }}
                              className={`h-full rounded-full ${
                                passwordStrength === 1
                                  ? "bg-red-400"
                                  : passwordStrength === 2
                                    ? "bg-yellow-400"
                                    : "bg-[#2E9B59]"
                              }`}
                            />
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-500 mt-2">
                        Password strength:{" "}
                        <span
                          className={`font-bold ${
                            passwordStrength === 3
                              ? "text-[#2E9B59]"
                              : passwordStrength === 2
                                ? "text-yellow-600"
                                : "text-red-500"
                          }`}
                        >
                          {["Weak", "Fair", "Good", "Strong"][passwordStrength]}
                        </span>
                      </p>

                      <div className="mt-2 space-y-1">
                        {passwordChecks.map((check) => (
                          <div
                            key={check.label}
                            className={`flex items-center gap-2 text-[11px] ${
                              check.valid ? "text-[#2E9B59]" : "text-gray-400"
                            }`}
                          >
                            {check.valid ? (
                              <Check size={13} />
                            ) : (
                              <span className="w-[13px] h-[13px] rounded-full border border-gray-300" />
                            )}
                            {check.label}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm password */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-5"
              >
                <label className="block text-sm font-bold text-[#294936] mb-2">
                  Confirm Password
                </label>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: focusedField === "confirmPassword" ? 1.015 : 1,
                        }
                  }
                  className="relative"
                >
                  <LockKeyhole
                    size={20}
                    className={fieldIconClass("confirmPassword")}
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`${inputClass("confirmPassword")} ${
                      passwordsMatch
                        ? "!border-[#45B96D] !bg-[#F4FBF6]"
                        : passwordsDoNotMatch
                          ? "!border-red-300 !bg-red-50"
                          : ""
                    }`}
                  />

                  {renderPasswordToggle(showConfirmPassword, () =>
                    setShowConfirmPassword((prev) => !prev),
                  )}
                </motion.div>

                <AnimatePresence mode="wait">
                  {passwordsMatch && (
                    <motion.p
                      key="match"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-[11px] text-[#2E9B59] mt-2 font-semibold"
                    >
                      <CheckCircle2 size={13} />
                      Passwords match!
                    </motion.p>
                  )}

                  {passwordsDoNotMatch && (
                    <motion.p
                      key="no-match"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-[11px] text-red-500 mt-2 font-semibold"
                    >
                      <CircleAlert size={13} />
                      Passwords do not match.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Terms */}
              <motion.label
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="flex items-start gap-3 mb-6 cursor-pointer group"
              >
                <motion.span
                  whileTap={shouldReduceMotion ? {} : { scale: 0.85 }}
                  className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    acceptedTerms
                      ? "bg-[#2E9B59] border-[#2E9B59]"
                      : "border-gray-300 group-hover:border-[#2E9B59]"
                  }`}
                >
                  <AnimatePresence>
                    {acceptedTerms && (
                      <motion.span
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={13} className="text-white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>

                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="sr-only"
                />

                <span className="text-xs leading-relaxed text-gray-500 group-hover:text-gray-600 transition-colors">
                  I agree to the Scan-Grow learning guidelines and understand
                  that my account will be used for educational activities.
                </span>
              </motion.label>

              {/* Create account */}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={
                  shouldReduceMotion || isSubmitting
                    ? {}
                    : { scale: 1.025, y: -2 }
                }
                whileTap={
                  shouldReduceMotion || isSubmitting ? {} : { scale: 0.97 }
                }
                className={`group relative overflow-hidden w-full h-14 rounded-2xl bg-gradient-to-r from-[#2E9B59] to-[#40B96C] text-white font-bold text-base shadow-lg shadow-[#2E9B59]/25 transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-xl hover:shadow-[#2E9B59]/30"
                }`}
              >
                {!shouldReduceMotion && !isSubmitting && (
                  <motion.span
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  />
                )}

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sprout size={19} />
                      </motion.span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={19} />
                    </>
                  )}
                </span>
              </motion.button>

              <AnimatePresence>
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="my-4 overflow-hidden"
                  >
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600">
                      <CircleAlert size={17} className="mt-0.5 shrink-0" />

                      <p className="text-xs font-medium whitespace-pre-line">
                        {serverError}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Login */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-gray-400">Already have an account?</p>

              <Link
                to="/"
                className="inline-flex items-center gap-1 mt-1 text-sm font-bold text-[#2E9B59] hover:text-[#247D47] transition-colors"
              >
                Sign in instead
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-7 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 text-gray-300">
                <ShieldCheck size={12} />
                <p className="text-[10px]">Project Scan-Grow</p>
              </div>

              <p className="text-[10px] text-gray-300 mt-1">
                Learn today. Plant tomorrow. Grow together. 🌿
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
