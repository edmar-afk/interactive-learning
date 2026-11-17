
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  ArrowUpRight,
} from "lucide-react";

const navigationItems = [
  {
    label: "Lessons",
    description: "Explore learning materials",
    path: "/lessons",
    icon: BookOpen,
    color: "#3BA961",
    bg: "#E7F6EB",
  },
  {
    label: "Quizzes",
    description: "Test your knowledge",
    path: "/quizzess",
    icon: ClipboardCheck,
    color: "#D49A38",
    bg: "#FBF1DD",
  },
  {
    label: "My Files",
    description: "View your saved files",
    path: "/files",
    icon: FolderOpen,
    color: "#5796C9",
    bg: "#E8F2FA",
  },
];

function DashboardNavigation({ isTeacher = false }) {
  const shouldReduceMotion = useReducedMotion();

  if (isTeacher) return null;

  return (
    <section className="px-5 mt-7">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mb-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#718078]">
            Your learning space
          </p>

          <h2 className="mt-1 text-[21px] font-black tracking-tight text-[#173D29]">
            Explore & Grow 🌱
          </h2>

          <p className="mt-1 text-[11px] text-[#849088]">
            Continue your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 18, scale: 0.92 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  type: "spring",
                  stiffness: 130,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -5, scale: 1.03 }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 0.95 }
                }
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex min-h-[125px] flex-col justify-between overflow-hidden rounded-[22px] border p-3 transition-all duration-300 ${
                      isActive
                        ? "border-[#3BA961] bg-white shadow-[0_5px_18px_rgba(59,169,97,0.13)]"
                        : "border-[#E8EEE9] bg-white shadow-sm hover:shadow-md"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className="absolute -right-5 -top-5 h-16 w-16 rounded-full opacity-40"
                        style={{ backgroundColor: item.bg }}
                      />

                      <div className="relative z-10 flex items-center justify-between">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                          style={{
                            backgroundColor: item.bg,
                            color: item.color,
                          }}
                        >
                          <Icon size={20} strokeWidth={2.3} />
                        </div>

                        <ArrowUpRight
                          size={15}
                          className={
                            isActive
                              ? "text-[#3BA961]"
                              : "text-[#B6C1B9]"
                          }
                        />
                      </div>

                      <div className="relative z-10 mt-3">
                        <p className="text-[12px] font-extrabold text-[#173D29]">
                          {item.label}
                        </p>

                        <p className="mt-1 text-[9px] leading-tight text-[#849088]">
                          {item.description}
                        </p>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeNavigation"
                          className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-[#3BA961]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default DashboardNavigation;
