import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center items-center p-0 sm:p-6">
      {/* Mobile App Container */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[850px] bg-white sm:shadow-2xl overflow-hidden relative flex flex-col">

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 right-0 h-[310px] bg-gradient-to-br from-[#2E9B59] via-[#3DBB6D] to-[#7BD89A] rounded-b-[20px]" />

        {/* Decorative circles */}
        <div className="absolute top-[-50px] right-[-45px] w-[150px] h-[150px] bg-white/10 rounded-full" />

        <div className="absolute top-[120px] left-[-70px] w-[150px] h-[150px] bg-white/10 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen sm:min-h-[850px]">

          {/* Header */}
          <div className="px-7 pt-10 text-white">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Scan-Grow
                </h1>

                <p className="text-xs text-white/80 font-medium">
                  Learn • Plant • Grow
                </p>
              </div>

            </div>

            {/* Header Message */}
            <div className="mt-8">

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

            </div>
          </div>

          {/* Register Card */}
          <div className="mt-8 bg-white rounded-t-[38px] flex-1 px-7 pt-7 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">

            {/* Title */}
            <div className="mb-6">

              <h3 className="text-2xl font-extrabold text-[#183B28]">
                Create account
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Fill in your details to get started.
              </p>

            </div>

            {/* Role Selection */}
            <div className="mb-5">

              <label className="block text-sm font-bold text-[#294936] mb-2">
                I am a...
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Student */}
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition ${
                    role === "student"
                      ? "border-[#2E9B59] bg-[#F0FAF3] text-[#2E9B59]"
                      : "border-[#E4ECE6] text-gray-500 hover:bg-[#F8FBF9]"
                  }`}
                >
                  <span className="text-lg">🎒</span>
                  Student
                </button>

                {/* Teacher */}
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition ${
                    role === "teacher"
                      ? "border-[#2E9B59] bg-[#F0FAF3] text-[#2E9B59]"
                      : "border-[#E4ECE6] text-gray-500 hover:bg-[#F8FBF9]"
                  }`}
                >
                  <span className="text-lg">👩‍🏫</span>
                  Teacher
                </button>

              </div>
            </div>

            {/* First Name */}
            <div className="mb-4">

              <label className="block text-sm font-bold text-[#294936] mb-2">
                First Name
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>

                </span>

                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full h-14 rounded-2xl bg-[#F4F8F5] border border-transparent pl-12 pr-4 text-sm outline-none transition focus:bg-white focus:border-[#45B96D] focus:ring-4 focus:ring-[#45B96D]/10"
                />

              </div>
            </div>

            {/* Username */}
            <div className="mb-4">

              <label className="block text-sm font-bold text-[#294936] mb-2">
                Username
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>

                </span>

                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full h-14 rounded-2xl bg-[#F4F8F5] border border-transparent pl-12 pr-4 text-sm outline-none transition focus:bg-white focus:border-[#45B96D] focus:ring-4 focus:ring-[#45B96D]/10"
                />

              </div>
            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="block text-sm font-bold text-[#294936] mb-2">
                Password
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>

                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-14 rounded-2xl bg-[#F4F8F5] border border-transparent pl-12 pr-12 text-sm outline-none transition focus:bg-white focus:border-[#45B96D] focus:ring-4 focus:ring-[#45B96D]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E9B59]"
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c7 0 10 8 10 8a18.2 18.2 0 0 1-3.1 4.4" />
                      <path d="M6.6 6.6C3.8 8.3 2 12 2 12s3 8 10 8a10.8 10.8 0 0 0 3.3-.5" />
                    </svg>
                  )}
                </button>

              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5">

              <label className="block text-sm font-bold text-[#294936] mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>

                </span>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full h-14 rounded-2xl bg-[#F4F8F5] border border-transparent pl-12 pr-12 text-sm outline-none transition focus:bg-white focus:border-[#45B96D] focus:ring-4 focus:ring-[#45B96D]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E9B59]"
                >
                  {showConfirmPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c7 0 10 8 10 8a18.2 18.2 0 0 1-3.1 4.4" />
                      <path d="M6.6 6.6C3.8 8.3 2 12 2 12s3 8 10 8a10.8 10.8 0 0 0 3.3-.5" />
                    </svg>
                  )}
                </button>

              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">

              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 accent-[#2E9B59]"
              />

              <span className="text-xs leading-relaxed text-gray-500">
                I agree to the Scan-Grow learning guidelines and understand
                that my account will be used for educational activities.
              </span>

            </label>

            {/* Create Account */}
            <button className="w-full h-14 rounded-2xl bg-[#2E9B59] text-white font-bold text-base shadow-lg shadow-[#2E9B59]/20 transition-all hover:bg-[#25824A] active:scale-[0.98]">
              Create Account
            </button>

            {/* Login */}
            <div className="mt-6 text-center">

              <p className="text-xs text-gray-400">
                Already have an account?
              </p>

              <Link to={'/'} className="mt-1 text-sm font-bold text-[#2E9B59]">
                Sign in instead
              </Link>

            </div>

            {/* Footer */}
            <div className="mt-7 text-center">

              <p className="text-[10px] text-gray-400">
                Project Scan-Grow
              </p>

              <p className="text-[10px] text-gray-300 mt-1">
                Learn today. Plant tomorrow. Grow together. 🌿
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

