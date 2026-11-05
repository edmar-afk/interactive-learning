/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Lock, ArrowUpRight, Leaf } from "lucide-react";

function LessonCard({
  number,
  title,
  description,
  icon = "🌱",
  completed = false,
  locked = false,
  onClick,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion || locked
          ? {}
          : {
              y: -5,
              scale: 1.015,
            }
      }
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={`group relative min-h-[238px] min-w-[238px] overflow-hidden rounded-[27px] border p-5 transition-all ${
        locked
          ? "border-[#E5EAE6] bg-[#F3F5F3] opacity-75"
          : "border-[#E3ECE6] bg-white shadow-[0_8px_25px_rgba(35,85,53,0.07)]"
      }`}
    >
      {/* Background decoration */}
      {!locked && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#EAF7EE]/80" />
      )}

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={shouldReduceMotion || locked ? {} : { rotate: 10 }}
            className={`flex h-12 w-12 items-center justify-center rounded-[16px] text-2xl ${
              locked ? "bg-[#E7EBE8]" : "bg-gradient-to-br from-[#EAF7EE] to-[#D9F2E1]"
            }`}
          >
            {locked ? (
              <Lock size={19} className="text-[#89958E]" />
            ) : (
              icon
            )}
          </motion.div>

          {completed && !locked && (
            <div className="flex items-center gap-1 rounded-full bg-[#E9F7ED] px-2.5 py-1.5 text-[9px] font-bold text-[#25834B]">
              <Check size={12} strokeWidth={3} />
              Done
            </div>
          )}
        </div>

        {/* Lesson information */}
        <div className="mt-6">
          <p
            className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${
              locked ? "text-[#9AA49E]" : "text-[#7A8A80]"
            }`}
          >
            Lesson {number}
          </p>

          <h3
            className={`mt-1.5 line-clamp-2 text-[16px] leading-[1.3] font-extrabold tracking-tight ${
              locked ? "text-[#7F8983]" : "text-[#193E2A]"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-2 line-clamp-3 text-[11px] leading-[1.55] ${
              locked ? "text-[#9AA39E]" : "text-[#78857D]"
            }`}
          >
            {description || "Discover more about planting and growing."}
          </p>
        </div>
      </div>

      {/* Bottom action */}
      {!locked && (
        <button
          type="button"
          onClick={onClick}
          disabled={!onClick}
          aria-label={`Open lesson ${title}`}
          className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF7EE] text-[#2E9B59] transition-all hover:bg-[#2E9B59] hover:text-white disabled:cursor-default"
        >
          <ArrowUpRight size={17} strokeWidth={2.5} />
        </button>
      )}

      {locked && (
        <div className="absolute bottom-5 left-5 flex items-center gap-1.5 text-[10px] font-bold text-[#929C96]">
          <Lock size={11} />
          Complete previous lesson
        </div>
      )}
    </motion.div>
  );
}

export default LessonCard;