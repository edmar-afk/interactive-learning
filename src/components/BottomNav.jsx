import React from "react";
import {
  House,
  BookOpen,
  QrCode,
  User,
  Brain,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky bottom-0 bg-white border-t border-[#E9EFEB] px-5 py-3 flex items-center justify-around z-50">

      {/* Home */}
      <Link
        to="/dashboard"
        className={`flex flex-col items-center gap-1 transition-colors ${
          isActive("/dashboard")
            ? "text-[#2E9B59]"
            : "text-[#91A097]"
        }`}
      >
        <House size={21} strokeWidth={isActive("/dashboard") ? 2.7 : 2.3} />

        <span className="text-[10px] font-bold">
          Home
        </span>
      </Link>

      {/* Lessons */}
      <Link
        to="/lessons"
        className={`flex flex-col items-center gap-1 transition-colors ${
          isActive("/lessons")
            ? "text-[#2E9B59]"
            : "text-[#91A097]"
        }`}
      >
        <BookOpen size={21} strokeWidth={isActive("/lessons") ? 2.7 : 2.3} />

        <span className="text-[10px] font-bold">
          Lessons
        </span>
      </Link>

      {/* Center Scan Button */}
      <button
        className="-mt-8 w-14 h-14 rounded-full bg-[#2E9B59] text-white shadow-lg shadow-[#2E9B59]/30 flex items-center justify-center border-4 border-white transition active:scale-95"
        aria-label="Scan QR Code"
      >
        <QrCode size={25} strokeWidth={2.2} />
      </button>

      {/* Quizz */}
      <Link
        to="/quiz"
        className={`flex flex-col items-center gap-1 transition-colors ${
          isActive("/quiz")
            ? "text-[#2E9B59]"
            : "text-[#91A097]"
        }`}
      >
        <Brain size={21} strokeWidth={isActive("/quiz") ? 2.7 : 2.3} />

        <span className="text-[10px] font-bold">
          Quizz
        </span>
      </Link>

      {/* Profile */}
      <Link
        to="/profile"
        className={`flex flex-col items-center gap-1 transition-colors ${
          isActive("/profile")
            ? "text-[#2E9B59]"
            : "text-[#91A097]"
        }`}
      >
        <User size={21} strokeWidth={isActive("/profile") ? 2.7 : 2.3} />

        <span className="text-[10px] font-bold">
          Profile
        </span>
      </Link>

    </div>
  );
}

export default BottomNav;
