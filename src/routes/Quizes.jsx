import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Sprout,
  Shovel,
  Hand,
  Ruler,
  Droplets,
  ChevronRight,
  Sparkles,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

import BottomNav from "../components/BottomNav";
import InteractiveGuide from "../components/InteractiveGuide";

const quizzes = [
  {
    id: 1,
    title: "Seedling Depth",
    description:
      "Learn the proper depth for planting seeds and seedlings to encourage healthy growth.",
    path: "/seedling-depth-quiz",
    icon: Sprout,
    emoji: "🌱",
    color: "#3BA961",
    bg: "#E7F6EB",
    level: "Beginner",
    topic: "Planting Basics",
  },
  {
    id: 2,
    title: "Soil Preparation",
    description:
      "Test your knowledge about preparing healthy soil for successful plant growth.",
    path: "/soil-preparation-quiz",
    icon: Shovel,
    emoji: "🌿",
    color: "#B58B4D",
    bg: "#F7F0E3",
    level: "Beginner",
    topic: "Soil Management",
  },
  {
    id: 3,
    title: "Handling of Seedlings",
    description:
      "Discover the correct ways to handle, transfer, and care for young seedlings.",
    path: "/handling-of-seedlings-quiz",
    icon: Hand,
    emoji: "🪴",
    color: "#5796C9",
    bg: "#E8F2FA",
    level: "Intermediate",
    topic: "Seedling Care",
  },
  {
    id: 4,
    title: "Spacing of Plants",
    description:
      "Understand the importance of proper plant spacing for healthy development.",
    path: "/spacing-of-plants-quiz",
    icon: Ruler,
    emoji: "🌳",
    color: "#8C78B9",
    bg: "#F0ECF8",
    level: "Intermediate",
    topic: "Plant Management",
  },
  {
    id: 5,
    title: "Watering Technique",
    description:
      "Learn the right watering practices to keep your plants healthy and hydrated.",
    path: "/watering-technique-quiz",
    icon: Droplets,
    emoji: "💧",
    color: "#479DC0",
    bg: "#E6F4F8",
    level: "Beginner",
    topic: "Plant Care",
  },
];

function Quizes() {
  const shouldReduceMotion = useReducedMotion();

  const guideMessages = [
    "Welcome to your Knowledge Garden! 🌱 This is where you can challenge yourself and discover how much you've learned about gardening.",

    "Here you'll find different quizzes about planting, soil preparation, seedling care, plant spacing, and watering techniques.",

    "Each card represents a different topic. Tap any quiz card to open its activity and start answering questions!",

    "Take your time when answering. Read each question carefully and use what you've learned from your lessons.",

    "Ready to grow your knowledge? Choose a quiz and let's see how much of a gardening expert you can become! 🌳💚",
  ];

  return (
    <div className="min-h-screen bg-[#EAF7EE] flex justify-center">
      <InteractiveGuide messages={guideMessages} />

      {/* Mobile App Container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#F7FAF7] flex flex-col shadow-xl">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#205D39] to-[#347F50] px-6 pt-12 pb-12 rounded-b-[35px]">
            {/* Decorative Circles */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/10" />
            <div className="absolute -left-12 bottom-[-50px] h-36 w-36 rounded-full bg-white/5" />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  <ClipboardCheck size={19} className="text-white" />
                </div>

                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/75">
                  Scan-Grow Learning
                </p>
              </div>

              <h1 className="text-[30px] leading-tight font-black tracking-tight text-white">
                Knowledge
                <br />
                Garden 🌿
              </h1>

              <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-white/80">
                Grow your knowledge one question at a time. Explore the quizzes
                and challenge what you've learned!
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                <Sparkles size={13} className="text-[#F5D68A]" />
                <span className="text-[10px] font-bold text-white">
                  Your learning adventure starts here
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quiz Section */}
          <section className="px-5 pt-7">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#3BA961]" />

                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#718078]">
                  Choose your challenge
                </p>
              </div>

              <div className="flex items-end justify-between mt-1">
                <div>
                  <h2 className="text-[22px] font-black tracking-tight text-[#173D29]">
                    Available Quizzes
                  </h2>

                  <p className="mt-1 text-[11px] text-[#849088]">
                    Pick a topic and start learning.
                  </p>
                </div>

                <div className="rounded-xl bg-[#E7F6EB] px-3 py-2 text-center">
                  <p className="text-[18px] font-black text-[#3BA961]">
                    {quizzes.length}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-[#718078]">
                    Topics
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quiz Cards */}
            <div className="space-y-3">
              {quizzes.map((quiz, index) => {
                const Icon = quiz.icon;

                return (
                  <motion.div
                    key={quiz.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : index * 0.08,
                    }}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Link
                      to={quiz.path}
                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-[23px] border border-[#E8EEE9] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Decorative Background */}
                      <div
                        className="absolute -right-7 -top-8 h-24 w-24 rounded-full opacity-40"
                        style={{ backgroundColor: quiz.bg }}
                      />

                      {/* Icon */}
                      <div
                        className="relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[19px]"
                        style={{
                          backgroundColor: quiz.bg,
                          color: quiz.color,
                        }}
                      >
                        <Icon size={26} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="text-[8px] font-extrabold uppercase tracking-wider"
                            style={{ color: quiz.color }}
                          >
                            {quiz.topic}
                          </span>
                        </div>

                        <h3 className="text-[13px] font-extrabold text-[#173D29]">
                          {quiz.title}
                        </h3>

                        <p className="mt-1 text-[10px] leading-[1.5] text-[#849088]">
                          {quiz.description}
                        </p>

                        <div className="mt-2">
                          <span
                            className="inline-flex rounded-full px-2 py-1 text-[8px] font-bold"
                            style={{
                              backgroundColor: quiz.bg,
                              color: quiz.color,
                            }}
                          >
                            {quiz.level}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F6F2] text-[#3BA961] transition-all group-hover:bg-[#3BA961] group-hover:text-white">
                        <ChevronRight size={18} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Bottom Encouragement Card */}
          <section className="px-5 mt-7 mb-5">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[24px] border border-[#E6DCCB] bg-gradient-to-br from-[#F5EFE5] to-[#EFE4D2] p-5"
            >
              <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full border-[17px] border-[#D2B991]/20" />

              <div className="relative z-10 flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#E9DDCA] bg-[#FFF9F0] text-xl">
                  🌻
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#B08A51]" />

                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B7253]">
                      A little reminder
                    </p>
                  </div>

                  <p className="mt-2 text-[12px] leading-relaxed font-bold text-[#554936]">
                    Don't worry about getting everything right. Every mistake is
                    an opportunity to learn and every question helps your
                    knowledge grow!
                  </p>

                  <p className="mt-3 text-[10px] font-semibold text-[#A28A68]">
                    Keep growing, little gardener! 🌱
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

export default Quizes;
