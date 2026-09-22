import React from "react";

function QuizCard() {
  return (
    <div className="mx-6 mt-6 rounded-[26px] bg-[#FFF9E8] border border-[#F4E8BC] p-5">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-[#FFEFB5] flex items-center justify-center text-xl">
          🧠
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold text-[#A18436]">
            READY TO TEST YOUR KNOWLEDGE?
          </p>

          <h3 className="text-base font-extrabold text-[#4C401E] mt-1">
            Take today's quiz
          </h3>
        </div>

      </div>

      <button className="w-full h-12 mt-4 rounded-xl bg-[#2E9B59] text-white font-bold text-sm active:scale-[0.98] transition">
        Start Quiz
      </button>

    </div>
  );
}

export default QuizCard;

