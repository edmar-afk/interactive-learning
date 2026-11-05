/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sprout, Leaf, Trophy, ArrowUpRight } from "lucide-react";

function ProgressCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={shouldReduceMotion ? {} : { y: -3 }}
      className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#174A31] via-[#21633D] to-[#2E8050] px-5 py-5 text-white shadow-[0_12px_30px_rgba(23,74,49,0.16)]"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full border-[35px] border-[#8BD69F]/10" />

      <div className="pointer-events-none absolute -bottom-16 right-16 h-36 w-36 rounded-full bg-[#8BD69F]/10" />

      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: [0, 12, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute right-7 bottom-14 text-white/10"
      >
        <Leaf size={65} />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sprout size={15} className="text-[#9BE1AE]" />

              <p className="text-[10px] font-extrabold tracking-[0.15em] text-[#B9D8C5]">
                YOUR LEARNING PROGRESS
              </p>
            </div>

            <div className="mt-2 flex items-end gap-2">
              <h2 className="text-[38px] leading-none font-black tracking-tight">
                35%
              </h2>

              <span className="mb-1 text-[11px] font-bold text-[#9BE1AE]">
                growing 🌱
              </span>
            </div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
            <Trophy size={22} className="text-[#FFE5A3]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-7">
          <div className="h-2 overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "35%" }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-[#7BD89A] to-[#C3F5CE]"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#B9D8C5]">
              3 of 8 lessons completed
            </span>

            <span className="text-[10px] font-bold text-[#9BE1AE]">
              Keep growing!
            </span>
          </div>
        </div>

        {/* Bottom milestone */}
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
          <div>
            <p className="text-[9px] font-extrabold tracking-widest text-[#9BBEAA]">
              NEXT MILESTONE
            </p>

            <p className="mt-1 text-[12px] font-bold text-white">
              Complete 1 more lesson
            </p>
          </div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { rotate: 45, scale: 1.1 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7BD89A] text-[#174A31]"
          >
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProgressCard;