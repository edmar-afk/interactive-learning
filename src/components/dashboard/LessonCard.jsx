import React from "react";
import { Check, Lock, ArrowUpRight } from "lucide-react";

function LessonCard({
  number,
  title,
  description,
  icon,
  completed = false,
  locked = false,
}) {
  return (
    <div
      className={`
        group
        relative
        min-w-[238px]
        min-h-[238px]
        rounded-[25px]
        p-5
        border
        transition-all duration-200

        ${
          locked
            ? `
              bg-[#F3F5F3]
              border-[#E5EAE6]
              opacity-75
            `
            : `
              bg-white
              border-[#E3ECE6]
              shadow-[0_6px_20px_rgba(35,85,53,0.06)]
              hover:-translate-y-0.5
            `
        }
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        {/* Lesson icon */}
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-[15px]
            text-xl

            ${locked ? "bg-[#E7EBE8]" : "bg-[#EAF7EE]"}
          `}
        >
          {locked ? (
            <Lock size={18} strokeWidth={2} className="text-[#89958E]" />
          ) : (
            icon
          )}
        </div>

        {/* Status */}
        {completed && !locked && (
          <div
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-[#E9F7ED]
              px-2.5
              py-1.5
              text-[10px]
              font-bold
              text-[#25834B]
            "
          >
            <Check size={12} strokeWidth={3} />
            Done
          </div>
        )}
      </div>

      {/* Lesson number */}
      <div className="mt-6">
        <p
          className={`
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.14em]

            ${locked ? "text-[#9AA49E]" : "text-[#7A8A80]"}
          `}
        >
          Lesson {number}
        </p>

        {/* Title */}
        <h3
          className={`
            mt-1.5
            text-[16px]
            leading-[1.25]
            font-extrabold
            tracking-[-0.02em]

            ${locked ? "text-[#7F8983]" : "text-[#193E2A]"}
          `}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`
            mt-2
            text-[11px]
            leading-[1.55]

            ${locked ? "text-[#9AA39E]" : "text-[#78857D]"}
          `}
        >
          {description}
        </p>
      </div>

      {/* Bottom action indicator */}
      {!locked && (
        <div className="absolute bottom-5 right-5">
          <div
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              transition

              ${
                completed
                  ? "bg-[#EAF7EE] text-[#2E9B59]"
                  : "bg-[#F1F7F3] text-[#35734E]"
              }
            `}
          >
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </div>
        </div>
      )}

      {/* Locked label */}
      {locked && (
        <div className="absolute bottom-5 left-5">
          <span
            className="
              text-[10px]
              font-bold
              text-[#929C96]
            "
          >
            Complete previous lesson
          </span>
        </div>
      )}
    </div>
  );
}

export default LessonCard;
