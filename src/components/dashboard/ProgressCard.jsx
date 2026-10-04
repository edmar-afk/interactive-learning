import React from "react";
import { ArrowUpRight, Sprout } from "lucide-react";

function ProgressCard() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[26px]
        bg-[#174A31]
        px-5 py-5
        text-white
        shadow-[0_12px_30px_rgba(23,74,49,0.16)]
      "
    >
      {/* Decorative botanical shape */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-44
          w-44
          rounded-full
          border-[32px]
          border-[#6BCB88]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-8
          -bottom-16
          h-32
          w-32
          rounded-full
          bg-[#8BD69F]/[0.06]
        "
      />

      <div className="relative z-10">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-[#B9D8C5]">
              YOUR LEARNING PROGRESS
            </p>

            <div className="flex items-end gap-2 mt-1">
              <h2 className="text-[36px] leading-none font-black tracking-[-0.04em]">
                35%
              </h2>

              <span className="mb-1 text-[11px] font-semibold text-[#91CBA4]">
                growing
              </span>
            </div>
          </div>

          {/* Icon */}
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-[15px]
              bg-white/10
              border border-white/10
            "
          >
            <Sprout size={21} strokeWidth={2} className="text-[#9BE1AE]" />
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="h-[7px] w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="
                h-full
                w-[35%]
                rounded-full
                bg-[#7BD89A]
              "
            />
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] font-medium text-[#B9D8C5]">
              3 of 8 lessons completed
            </span>

            <span className="text-[11px] font-bold text-[#9BE1AE]">
              Keep growing
            </span>
          </div>
        </div>

        {/* Bottom insight */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
          <div>
            <p className="text-[10px] text-[#9BBEAA]">NEXT MILESTONE</p>

            <p className="text-[12px] font-bold text-white mt-0.5">
              Complete 1 more lesson
            </p>
          </div>

          <div
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-[#7BD89A]
              text-[#174A31]
            "
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
