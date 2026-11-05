/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QrCode, ArrowRight, Sparkles, Leaf } from "lucide-react";

function ScanQRCard({ onClick }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative mt-1 flex w-full items-center gap-3.5 overflow-hidden rounded-[25px] border border-[#DDEAE1] bg-white px-4 py-4 text-left shadow-[0_6px_20px_rgba(35,85,53,0.06)] transition-all hover:shadow-[0_12px_25px_rgba(35,85,53,0.10)]"
    >
      {/* Accent */}
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#3DBB6D] to-[#174A31]" />

      {/* Icon */}
      <motion.div
        whileHover={shouldReduceMotion ? {} : { rotate: 8, scale: 1.08 }}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#EAF7EE] to-[#D5F0DE] text-[#23854C]"
      >
        <QrCode size={27} strokeWidth={2} />

        <Sparkles
          size={12}
          className="absolute right-2 top-2 text-[#63BE7E]"
        />

        <Leaf
          size={12}
          className="absolute bottom-2 left-2 text-[#63BE7E]"
        />
      </motion.div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[15px] font-extrabold tracking-tight text-[#193E2A]">
            Scan & Learn
          </h2>

          <span className="rounded-full bg-[#EAF7EE] px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-[#3A8C59]">
            QR Scanner
          </span>
        </div>

        <p className="mt-1 text-[10.5px] leading-relaxed text-[#78857D]">
          Scan a tree's QR code to discover its planting guide and unlock new
          lessons.
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        whileHover={shouldReduceMotion ? {} : { x: 4 }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF7EE] text-[#2E9B59] transition-colors group-hover:bg-[#2E9B59] group-hover:text-white"
      >
        <ArrowRight size={17} strokeWidth={2.5} />
      </motion.div>
    </motion.button>
  );
}

export default ScanQRCard;