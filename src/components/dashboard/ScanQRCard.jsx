import React from "react";
import { QrCode, ArrowRight, Sparkles } from "lucide-react";

function ScanQRCard() {
  return (
    <button
      className="
        group
        relative
        mt-4
        w-full
        overflow-hidden
        rounded-[24px]
        bg-white
        border
        border-[#DDEAE1]
        px-4
        py-4
        flex
        items-center
        gap-3.5
        text-left
        shadow-[0_6px_20px_rgba(35,85,53,0.06)]
        transition-all
        hover:-translate-y-0.5
        hover:shadow-[0_10px_25px_rgba(35,85,53,0.09)]
        active:scale-[0.985]
      "
    >
      {/* Small green accent */}
      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-[4px]
          bg-[#3DBB6D]
        "
      />

      {/* QR icon */}
      <div
        className="
          relative
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-[16px]
          bg-[#EAF7EE]
          text-[#23854C]
        "
      >
        <QrCode size={23} strokeWidth={2} />

        {/* Tiny sparkle */}
        <Sparkles
          size={10}
          strokeWidth={2.5}
          className="
            absolute
            right-1.5
            top-1.5
            text-[#63BE7E]
          "
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-extrabold tracking-[-0.015em] text-[#193E2A]">
            Scan & Learn
          </h2>

          <span
            className="
              rounded-full
              bg-[#F0F8F2]
              px-2
              py-0.5
              text-[8px]
              font-extrabold
              uppercase
              tracking-wide
              text-[#3A8C59]
            "
          >
            QR
          </span>
        </div>

        <p className="mt-1 text-[10.5px] leading-[1.45] text-[#78857D]">
          Scan a tree's QR code to unlock its planting lesson.
        </p>
      </div>

      {/* Arrow */}
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#F0F7F2]
          text-[#2E9B59]
          transition
          group-hover:bg-[#2E9B59]
          group-hover:text-white
        "
      >
        <ArrowRight
          size={15}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}

export default ScanQRCard;
