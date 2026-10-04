import React from "react";
import { LogOut, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

function WelcomeHeader() {
  return (
    <header className="px-5 pt-7 pb-2">
      <div className="flex items-center justify-between">

        {/* Greeting */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#718078]">
              Good morning
            </span>

            <Sprout
              size={14}
              strokeWidth={2.2}
              className="text-[#3BA961]"
            />
          </div>

          <h1
            className="
              mt-1
              text-[27px]
              leading-tight
              font-black
              tracking-[-0.04em]
              text-[#173D29]
            "
          >
            Greetings, Learner
          </h1>

          <p className="mt-1 text-[11px] font-medium text-[#849088]">
            Ready to grow your knowledge today?
          </p>
        </div>


        {/* Logout */}
        <Link
          to="/"
          aria-label="Logout"
          title="Logout"
          className="
            group
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-[15px]
            bg-white
            border
            border-[#E3ECE6]
            text-[#456454]
            shadow-[0_4px_14px_rgba(35,85,53,0.05)]
            transition-all
            hover:border-[#D3E5D9]
            hover:bg-[#F1F8F3]
            hover:text-[#C05252]
            active:scale-95
          "
        >
          <LogOut
            size={19}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </Link>

      </div>
    </header>
  );
}

export default WelcomeHeader;

