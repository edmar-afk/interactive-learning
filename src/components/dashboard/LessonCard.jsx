import React from "react";

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
      className={`min-w-[230px] rounded-[24px] p-5 border ${
        locked
          ? "bg-[#F7F9F7] border-[#E8EDE9]"
          : "bg-white border-[#E4EEE7]"
      } shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl ${
            locked ? "bg-gray-100" : "bg-[#EAF7EE]"
          }`}
        >
          {locked ? "🔒" : icon}
        </div>

        {completed && (
          <span className="text-xs font-bold text-[#2E9B59] bg-[#EAF7EE] px-3 py-1.5 rounded-full">
            ✓ Done
          </span>
        )}
      </div>

      <p className="text-xs font-bold text-[#7B8C81] mt-5">
        LESSON {number}
      </p>

      <h3 className="font-extrabold text-[#183B28] mt-1 leading-tight">
        {title}
      </h3>

      <p className="text-xs text-[#78867D] mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default LessonCard;

