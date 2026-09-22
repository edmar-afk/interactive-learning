import React from "react";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import ProgressCard from "../components/dashboard/ProgressCard";
import ScanQRCard from "../components/dashboard/ScanQRCard";
import LessonCard from "../components/dashboard/LessonCard";
import QuizCard from "../components/dashboard/QuizCard";
import BottomNav from "../components/bottomNav";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4F9F5] flex justify-center">

      {/* Mobile App */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F4F9F5] flex flex-col">

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-5">

          <WelcomeHeader />

          <ProgressCard />

          <ScanQRCard />

          {/* Lessons */}
          <section className="mt-7">

            <div className="px-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#7B8C81] uppercase tracking-wide">
                  Continue learning
                </p>

                <h2 className="text-xl font-extrabold text-[#183B28] mt-1">
                  Your lessons
                </h2>
              </div>

              <button className="text-xs font-bold text-[#2E9B59]">
                See all
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto px-6 mt-4 pb-2 scrollbar-hide">

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

          <QuizCard />

          {/* Daily Motivation */}
          <div className="mx-6 mt-6 mb-3 rounded-[24px] bg-[#EAF7EE] p-5">

            <div className="flex gap-3">

              <span className="text-2xl">
                🌿
              </span>

              <div>
                <p className="text-xs font-bold text-[#2E9B59]">
                  TODAY'S GROWTH TIP
                </p>

                <p className="text-sm font-semibold text-[#285238] mt-1 leading-relaxed">
                  "Every big tree starts with a small seed."
                </p>
              </div>

            </div>

          </div>

        </main>

        <BottomNav />

      </div>
    </div>
  );
}

export default Dashboard;

