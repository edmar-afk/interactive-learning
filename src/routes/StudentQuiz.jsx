/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Sprout, Sparkles } from "lucide-react";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import QuizCard from "../components/dashboard/QuizCard";
import BottomNav from "../components/BottomNav";
import StudentsScores from "../components/dashboard/StudentsScores";
import DashboardNavigation from "../components/dashboard/DashboardNavigation";

import api from "../assets/api";
import InteractiveGuide from "../components/InteractiveGuide";

function StudentQuiz() {
  const shouldReduceMotion = useReducedMotion();

  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonError, setLessonError] = useState("");

  const [isSuperuser, setIsSuperuser] = useState(false);
  const [displayName, setDisplayName] = useState("Gardener");

  // Detect logged-in user from localStorage
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      setIsSuperuser(userInfo.is_superuser === true);

      // Get the user's name from available localStorage fields
      const name =
        userInfo.first_name ||
        userInfo.full_name ||
        userInfo.name ||
        userInfo.username ||
        "Gardener";

      setDisplayName(name);
    } catch (error) {
      console.error("Failed to read userInfo:", error);
      setIsSuperuser(false);
      setDisplayName("Gardener");
    }
  }, []);

  // Load lessons
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

  // Interactive Guide Messages
  const studentMessages = [
    `Hello, ${displayName}! 🌳 Welcome to Scan-Grow! I'm your little tree buddy, and I'll help you explore your learning garden!`,

    "This is your Dashboard! Think of it as your little home for learning, discovering, and growing your knowledge about plants. 🌱",

    "See these navigation cards? Tap Lessons to explore your reading materials and learn more about plants and gardening!",

    "You can also visit Quizzes to test what you've learned! Answer questions, challenge yourself, and see how much your knowledge has grown. 🧠",

    "Need to find your saved files? Just tap My Files to access your available learning resources. 📁",

    "Now, take a look at your Knowledge Garden! This is where you can practice what you've learned through interactive quizzes. Every answer is a chance to grow!",

    "Here's something special! Your Daily Growth Tip gives you a little gardening reminder or helpful advice. Don't forget to check it out! 🌿",

    "At the bottom, you'll find your Bottom Navigation. Use it to move between the different sections of Scan-Grow whenever you need to.",

    `That's all for now, ${displayName}! Remember, learning is just like growing a tree. Take it one step at a time, keep exploring, and never stop growing! Happy learning! 🌳💚`,
  ];

  const teacherMessages = [
    `Hello, ${displayName}! 🌳 Welcome to Scan-Grow! I'm your little tree buddy, and I'll help you explore your teacher dashboard!`,

    "This is your Dashboard, where you can monitor student learning progress and access the important sections of your teaching workspace.",

    "Take a look at the Student Scores section! Here you can monitor your students' quiz performance and see how they're progressing in their learning journey. 📊",

    "You can use the student scores information to identify which students are doing well and which ones may need additional guidance or support.",

    "Don't forget to check the Daily Growth Tip! It provides a little gardening inspiration and helpful reminders that connect with the purpose of Scan-Grow. 🌿",

    "At the bottom, you'll find your Bottom Navigation. Use it to move between the different sections of the application.",

    `And that's our little tour, ${displayName}! Your guidance helps students grow their knowledge, just like a gardener helps a tiny seed become a strong tree. Keep inspiring them! 🌳💚`,
  ];

  const guideMessages = isSuperuser ? teacherMessages : studentMessages;

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center">
      {/* Interactive Tree Guide */}
      <InteractiveGuide messages={guideMessages} />

      {/* Mobile App Container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#F7FAF7] flex flex-col shadow-xl">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Student Navigation Buttons */}
          <DashboardNavigation/>

          {/* Main Dashboard Content */}
          <div className="relative z-10 -mt-5">
            {/* Teacher / Student Content */}
            <AnimatePresence mode="wait">
              {isSuperuser ? (
                <motion.section
                  key="students-scores"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 35, scale: 0.96 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                  }}
                  className="mt-8"
                >
                  <StudentsScores />
                </motion.section>
              ) : (
                <motion.section
                  key="quiz-card"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 35, scale: 0.96 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                  }}
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
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[25px] border border-[#E6DCCB] bg-gradient-to-br from-[#F5EFE5] to-[#EFE4D2] px-5 py-5"
              >
                {/* Decorative Background */}
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

export default StudentQuiz;
