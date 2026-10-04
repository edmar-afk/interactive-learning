import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Leaf,
  Sun,
  ArrowRight,
  TreePine,
} from "lucide-react";

function Welcome() {
  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#EAF7EE] relative overflow-hidden flex flex-col">

        {/* Decorative Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7BD89A]/30 rounded-full" />
        <div className="absolute top-28 -left-28 w-56 h-56 bg-[#C9A66B]/20 rounded-full" />

        {/* Top Section */}
        <div className="relative z-10 px-7 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#2E9B59] flex items-center justify-center shadow-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#6B806F] tracking-wide uppercase">
                Welcome to
              </p>
              <h1 className="text-lg font-extrabold text-[#315C3C]">
                Interactive Learning Application
              </h1>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <Sun className="w-5 h-5 text-[#B47A35]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7">

          {/* Illustration */}
          <div className="relative w-[270px] h-[270px] mb-7">

            {/* Main Circle */}
            <div className="absolute inset-5 rounded-full bg-[#D5F0DC] border-[10px] border-white shadow-lg flex items-center justify-center">

              {/* Ground */}
              <div className="absolute bottom-8 left-8 right-8 h-[62px] bg-[#9A683E] rounded-[50%_50%_45%_45%]" />

              {/* Plant Stem */}
              <div className="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[13px] h-[105px] bg-[#3D8C4F] rounded-full" />

              {/* Left Leaf */}
              <div className="absolute bottom-[125px] left-[66px] w-[75px] h-[43px] bg-[#4EAA61] rounded-[100%_0_100%_0] rotate-[18deg] shadow-sm" />

              {/* Right Leaf */}
              <div className="absolute bottom-[150px] right-[60px] w-[78px] h-[45px] bg-[#2E9B59] rounded-[0_100%_0_100%] -rotate-[18deg] shadow-sm" />

              {/* Top Leaves */}
              <div className="absolute bottom-[177px] left-[105px] w-[62px] h-[38px] bg-[#68BD73] rounded-[100%_0_100%_0] rotate-[5deg]" />

              {/* Pot */}
              <div className="absolute bottom-[36px] left-1/2 -translate-x-1/2">
                <div className="w-[72px] h-[18px] bg-[#B47A35] rounded-full relative z-10" />
                <div className="w-[58px] h-[48px] bg-[#A86F39] mx-auto rounded-b-[20px] clip-path-polygon" />
              </div>
            </div>

            {/* Floating Leaf */}
            <div className="absolute top-3 right-1 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center rotate-12">
              <Leaf className="w-6 h-6 text-[#3DBB6D]" />
            </div>

            {/* Floating Tree */}
            <div className="absolute bottom-4 left-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center -rotate-12">
              <TreePine className="w-6 h-6 text-[#6D8E4E]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-[350px]">
            <p className="text-[#B47A35] font-bold text-sm mb-2">
              GROW • LEARN • PLANT
            </p>

            <h2 className="text-[34px] leading-[1.08] font-extrabold text-[#315C3C]">
              Let's Grow
              <br />
              <span className="text-[#2E9B59]">Something Amazing!</span>
            </h2>

            <p className="mt-4 text-[14px] leading-6 text-[#68796D] px-3">
              Discover the wonderful world of plants and learn
              how to grow healthy, fruit-bearing trees step by step.
            </p>
          </div>

          {/* Small Features */}
          <div className="flex items-center gap-3 mt-7">
            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <Sprout className="w-4 h-4 text-[#2E9B59]" />
              <span className="text-xs font-semibold text-[#49624E]">
                Learn
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <Leaf className="w-4 h-4 text-[#3DBB6D]" />
              <span className="text-xs font-semibold text-[#49624E]">
                Plant
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <TreePine className="w-4 h-4 text-[#9A683E]" />
              <span className="text-xs font-semibold text-[#49624E]">
                Grow
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 px-6 pb-7 pt-4">
          <Link
            to="/dashboard"
            className="w-full h-[60px] bg-[#2E9B59] hover:bg-[#27834B] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-[16px] shadow-lg shadow-[#2E9B59]/25"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-center text-[11px] text-[#819084] mt-3">
            Your journey to becoming a better gardener starts here 🌱
          </p>
        </div>

      </div>
    </div>
  );
}

export default Welcome;