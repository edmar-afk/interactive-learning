import React from "react";
import { Brain, ArrowRight, Sparkles } from "lucide-react";

function QuizCard() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[25px]
        border
        border-[#E7DCCB]
        bg-[#F5EFE5]
        px-5
        py-5
      "
    >
      {/* Decorative shape */}
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#D2B991]/15
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3.5">
          {/* Icon */}
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[15px]
              bg-[#FFF9F0]
              border
              border-[#E9DDCA]
            "
          >
            <Brain size={20} strokeWidth={2} className="text-[#896D45]" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <Sparkles
                size={11}
                strokeWidth={2.5}
                className="text-[#B08A51]"
              />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#97784C]">
                Daily challenge
              </p>
            </div>

            <h3 className="mt-1 text-[16px] font-extrabold tracking-[-0.02em] text-[#493C29]">
              Test what you’ve learned
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-[11px] leading-[1.55] text-[#776A57]">
          Take a quick quiz and see how much you remember from your planting
          lessons.
        </p>

        {/* CTA */}
        <button
          className="
            group
            mt-4
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-[13px]
            bg-[#2E9B59]
            text-[12px]
            font-bold
            text-white
            shadow-[0_5px_14px_rgba(46,155,89,0.16)]
            transition-all
            active:scale-[0.98]
            hover:bg-[#25834B]
          "
        >
          Start today's quiz
          <ArrowRight
            size={15}
            strokeWidth={2.5}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
