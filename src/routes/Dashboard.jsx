import React from "react";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import ProgressCard from "../components/dashboard/ProgressCard";
import ScanQRCard from "../components/dashboard/ScanQRCard";
import LessonCard from "../components/dashboard/LessonCard";
import QuizCard from "../components/dashboard/QuizCard";
import BottomNav from "../components/BottomNav";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#EEF5F0] flex justify-center">
      {/* Mobile App */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F7FAF7] flex flex-col">
        {/* =====================================================
            CONTENT
        ====================================================== */}
        <main className="flex-1 overflow-y-auto pb-7 scrollbar-hide">
          {/* Header */}
          <div className="px-5 pt-6">
            <WelcomeHeader />
          </div>

          {/* =====================================================
              PROGRESS
          ====================================================== */}
          <section className="px-5 mt-5">
            <ProgressCard />
          </section>

          {/* =====================================================
              SCAN QR
          ====================================================== */}
          <section className="px-5 mt-3">
            <ScanQRCard />
          </section>

          {/* =====================================================
              LESSONS
          ====================================================== */}
          <section className="mt-8">
            {/* Section Header */}
            <div className="px-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                  Continue learning
                </p>

                <h2 className="mt-1 text-[23px] leading-tight font-extrabold tracking-[-0.03em] text-[#173D29]">
                  Your lessons
                </h2>
              </div>

              <button
                className="
                  text-[12px]
                  font-bold
                  text-[#25834B]
                  mb-1
                  hover:text-[#17683A]
                  transition
                "
              >
                See all
              </button>
            </div>

            {/* Lesson Carousel */}
            <div className="flex gap-3.5 overflow-x-auto px-5 mt-4 pb-3 scrollbar-hide">
              <LessonCard
                number="01"
                title="Getting to Know Fruit Trees"
                description="Discover why fruit-bearing trees are important."
                icon="🌳"
                completed
              />

              <LessonCard
                number="02"
                title="Choosing the Right Tree"
                description="Learn how to choose a healthy fruit tree."
                icon="🌱"
              />

              <LessonCard
                number="03"
                title="Preparing the Soil"
                description="Learn how to prepare the perfect place to plant."
                icon="🪴"
                locked
              />
            </div>
          </section>

          {/* =====================================================
              QUIZ
          ====================================================== */}
          <section className="mt-8">
            <QuizCard />
          </section>

         

          {/* =====================================================
              DAILY TIP
          ====================================================== */}
          <section className="px-5 mt-4 mb-2">
            <div
              className="
                rounded-[24px]
                bg-[#F0E9DD]
                px-5
                py-4.5
                border border-[#E6DCCB]
              "
            >
              <div className="flex items-start gap-3.5">
                {/* Icon */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-[13px]
                    bg-[#FFF9EF]
                    text-lg
                  "
                >
                  🌿
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#8B7253]">
                    Today's growth tip
                  </p>

                  <p className="mt-1 text-[13px] leading-[1.55] font-semibold text-[#554936]">
                    Every big tree starts with a small seed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* =====================================================
            BOTTOM NAV
        ====================================================== */}

        <BottomNav />
      </div>
    </div>
  );
}

export default Dashboard;
