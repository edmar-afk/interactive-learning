import React from "react";

function WelcomeHeader() {
  return (
    <div className="px-6 pt-10 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B8172] font-medium">
            Good morning! 🌱
          </p>

          <h1 className="text-2xl font-extrabold text-[#183B28] mt-1">
            Hi, Jay! 👋
          </h1>
        </div>

        <button className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-[#E5EEE8] flex items-center justify-center text-xl">
          🔔
        </button>
      </div>
    </div>
  );
}

export default WelcomeHeader;

