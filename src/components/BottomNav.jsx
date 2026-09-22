import React from "react";
import {
  House,
  BookOpen,
  QrCode,
  User,
  Brain,
} from "lucide-react";

function BottomNav() {
  return (
    <div className="sticky bottom-0 bg-white border-t border-[#E9EFEB] px-5 py-3 flex items-center justify-around">

      {/* Home */}
      <button className="flex flex-col items-center gap-1 text-[#2E9B59]">
        <House size={21} strokeWidth={2.3} />

        <span className="text-[10px] font-bold">
          Home
        </span>
      </button>

      {/* Lessons */}
      <button className="flex flex-col items-center gap-1 text-[#91A097]">
        <BookOpen size={21} strokeWidth={2.3} />

        <span className="text-[10px] font-bold">
          Lessons
        </span>
      </button>

      {/* Center Scan Button */}
      <button
        className="-mt-8 w-14 h-14 rounded-full bg-[#2E9B59] text-white shadow-lg shadow-[#2E9B59]/30 flex items-center justify-center border-4 border-white transition active:scale-95"
        aria-label="Scan QR Code"
      >
        <QrCode size={25} strokeWidth={2.2} />
      </button>

      {/* Quizz */}
      <button className="flex flex-col items-center gap-1 text-[#91A097]">
        <Brain size={21} strokeWidth={2.3} />

        <span className="text-[10px] font-bold">
          Quizz
        </span>
      </button>

      {/* Profile */}
      <button className="flex flex-col items-center gap-1 text-[#91A097]">
        <User size={21} strokeWidth={2.3} />

        <span className="text-[10px] font-bold">
          Profile
        </span>
      </button>

    </div>
  );
}

export default BottomNav;

