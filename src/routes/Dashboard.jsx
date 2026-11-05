/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sprout, Leaf, BookOpen, RefreshCw, Sparkles } from "lucide-react";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import ProgressCard from "../components/dashboard/ProgressCard";
import ScanQRCard from "../components/dashboard/ScanQRCard";
import LessonCard from "../components/dashboard/LessonCard";
import QuizCard from "../components/dashboard/QuizCard";
import BottomNav from "../components/BottomNav";

import api from "../assets/api";
import StudentsScores from "../components/dashboard/StudentsScores";

const lessonIcons = ["🌳", "🌱", "🪴", "🍃", "🌻", "🌿"];

function Dashboard() {
  const shouldReduceMotion = useReducedMotion();

  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonError, setLessonError] = useState("");

  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      setIsSuperuser(userInfo.is_superuser === true);
    } catch (error) {
      console.error("Failed to read userInfo:", error);
      setIsSuperuser(false);
    }
  }, []);

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      setLessonError("");

      const response = await api.get("/api/lessons/");

      const lessonData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setLessons(lessonData);
    } catch (error) {
      console.error("Failed to load lessons:", error);

      setLessonError("We couldn't load your lessons. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center">
      {/* Mobile App Container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#F7FAF7] flex flex-col shadow-xl">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Main dashboard content */}
          <div className="relative z-10 -mt-5">
            {/* Progress */}
            {/* <motion.section
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-5"
            >
              <ProgressCard />
            </motion.section> */}

            {/* QR Scanner */}
            <motion.section
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-5 mt-4"
            >
              <ScanQRCard />
            </motion.section>

            {/* Lessons */}
            {/* <section className="mt-9">
              <div className="px-5 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Leaf size={14} className="text-[#3BA961]" />

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#718078]">
                      Grow your knowledge
                    </p>
                  </div>

                  <h2 className="mt-1 text-[24px] leading-tight font-black tracking-tight text-[#173D29]">
                    Your lessons
                  </h2>

                  <p className="mt-1 text-[11px] text-[#849088]">
                    Explore and discover something new.
                  </p>
                </div>

                <div className="mb-1 flex items-center gap-1 rounded-full bg-[#EAF7EE] px-3 py-1.5">
                  <BookOpen size={12} className="text-[#25834B]" />

                  <span className="text-[10px] font-extrabold text-[#25834B]">
                    {lessons.length} lessons
                  </span>
                </div>
              </div>

              {isLoading && (
                <div className="mt-5 flex flex-col items-center justify-center px-5 py-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF7EE]">
                    <RefreshCw
                      size={22}
                      className="animate-spin text-[#2E9B59]"
                    />
                  </div>

                  <p className="mt-3 text-xs font-semibold text-[#718078]">
                    Growing your lessons...
                  </p>
                </div>
              )}

              {!isLoading && lessonError && (
                <div className="mx-5 mt-5 rounded-[20px] border border-red-100 bg-red-50 p-5">
                  <p className="text-sm font-bold text-red-700">
                    Unable to load lessons
                  </p>

                  <p className="mt-1 text-xs text-red-500">
                    {lessonError}
                  </p>

                  <button
                    type="button"
                    onClick={loadLessons}
                    className="mt-4 flex items-center gap-2 rounded-xl bg-[#2E9B59] px-4 py-2.5 text-xs font-bold text-white"
                  >
                    <RefreshCw size={13} />
                    Try again
                  </button>
                </div>
              )}

              {!isLoading && !lessonError && lessons.length === 0 && (
                <div className="mx-5 mt-5 rounded-[24px] border border-[#E3ECE6] bg-white px-6 py-10 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#EAF7EE]">
                    <Sprout size={30} className="text-[#2E9B59]" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-[#193E2A]">
                    No lessons available yet
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#849088]">
                    New planting lessons will appear here once they are
                    published.
                  </p>
                </div>
              )}

              {!isLoading && !lessonError && lessons.length > 0 && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-5 flex gap-3.5 overflow-x-auto px-5 pb-4 scrollbar-hide"
                >
                  {lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson.id}
                      number={String(index + 1).padStart(2, "0")}
                      title={lesson.title}
                      description={
                        lesson.description === "N/A"
                          ? "Discover more about planting and growing."
                          : lesson.description
                      }
                      icon={lessonIcons[index % lessonIcons.length]}
                    />
                  ))}
                </motion.div>
              )}
            </section> */}

            {/* QUIZ / STUDENT SCORES */}

            <AnimatePresence mode="wait">
              {isSuperuser ? (
                <motion.section
                  key="students-scores"
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.96 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="mt-8"
                >
                  <StudentsScores/>
                </motion.section>
              ) : (
                <motion.section
                  key="quiz-card"
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.96 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="mt-8"
                >
                  <div className="px-5 mb-4">
                    <div className="flex items-center gap-2">
                      <Sprout size={14} className="text-[#3BA961]" />

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#718078]">
                        Test what you learned
                      </p>
                    </div>

                    <h2 className="mt-1 text-[23px] font-black tracking-tight text-[#173D29]">
                      Knowledge Garden
                    </h2>

                    <p className="mt-1 text-[11px] text-[#849088]">
                      Practice your knowledge through interactive quizzes.
                    </p>
                  </div>

                  <QuizCard />
                </motion.section>
              )}
            </AnimatePresence>

            {/* Daily Tip */}
            <section className="px-5 mt-8 mb-5">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[25px] border border-[#E6DCCB] bg-gradient-to-br from-[#F5EFE5] to-[#EFE4D2] px-5 py-5"
              >
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[20px] border-[#D2B991]/20" />

                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#E9DDCA] bg-[#FFF9F0] text-xl shadow-sm">
                    🌿
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#B08A51]" />

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#8B7253]">
                        Today's growth tip
                      </p>
                    </div>

                    <p className="mt-2 text-[13px] leading-[1.6] font-bold text-[#554936]">
                      Every big tree starts with a small seed. Give your plants
                      time, care, sunlight, and patience to grow.
                    </p>

                    <p className="mt-3 text-[10px] font-semibold text-[#A28A68]">
                      Learn today. Plant tomorrow. 🌱
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

export default Dashboard;
