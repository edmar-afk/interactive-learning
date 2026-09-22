import React from "react";

function ProgressCard() {
  return (
    <div className="mx-6 rounded-[28px] bg-gradient-to-br from-[#2E9B59] to-[#42BD70] p-6 text-white shadow-lg shadow-[#2E9B59]/20">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/75 font-medium">
            Your learning progress
          </p>

          <h2 className="text-3xl font-extrabold mt-1">
            35%
          </h2>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
          🌱
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: "35%" }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs text-white/75">
            3 of 8 lessons
          </span>

          <span className="text-xs font-bold">
            Keep growing!
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;

