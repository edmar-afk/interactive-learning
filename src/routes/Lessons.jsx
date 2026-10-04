import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Droplets,
  ChevronRight,
  Shovel,
  Hand,
  Ruler,
  MoveHorizontal,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const plantingSkills = [
  {
    number: "01",
    title: "Soil Preparation",
    description:
      "Learn how to prepare loose, clean, and fertile soil before planting.",
    route: "/soil-preparation",
    icon: Shovel,
    color: "brown",
    duration: "8 min",
    topics: [
      "Loosen the soil",
      "Remove weeds",
      "Remove stones",
      "Level the area",
    ],
  },
  {
    number: "02",
    title: "Handling of Seedlings",
    description:
      "Learn how to carefully handle seedlings without damaging their stems or roots.",
    route: "/handling-of-seedlings",
    icon: Hand,
    color: "green",
    duration: "8 min",
    topics: [
      "Hold gently",
      "Protect the stem",
      "Protect the roots",
      "Carry carefully",
    ],
  },
  {
    number: "03",
    title: "Seedling Depth",
    description:
      "Learn how deep to plant a seedling so it stays stable and develops healthy roots.",
    route: "/seeding-depth",
    icon: Ruler,
    color: "blue",
    duration: "8 min",
    topics: [
      "Prepare the hole",
      "Place upright",
      "Cover the roots",
      "Provide stability",
    ],
  },
  {
    number: "04",
    title: "Spacing of Plants",
    description:
      "Learn why plants need enough space for sunlight, water, nutrients, and air.",
    route: "/spacing-of-plants",
    icon: MoveHorizontal,
    color: "green",
    duration: "8 min",
    topics: [
      "Measure distance",
      "Keep plants uniform",
      "Allow sunlight",
      "Avoid competition",
    ],
  },
  {
    number: "05",
    title: "Watering Technique",
    description:
      "Learn how to water newly planted seedlings gently and evenly.",
    route: "/watering-technique",
    icon: Droplets,
    color: "blue",
    duration: "8 min",
    topics: [
      "Give enough water",
      "Water gently",
      "Water the base",
      "Avoid overwatering",
    ],
  },
];

const colorStyles = {
  green: {
    iconBg: "bg-[#EAF7EE]",
    iconColor: "text-[#2E9B59]",
    badge: "bg-[#EAF7EE] text-[#2E9B59]",
    number: "bg-[#2E9B59]",
  },
  brown: {
    iconBg: "bg-[#F5EDE7]",
    iconColor: "text-[#9A6842]",
    badge: "bg-[#F5EDE7] text-[#9A6842]",
    number: "bg-[#9A6842]",
  },
  blue: {
    iconBg: "bg-[#EAF4FA]",
    iconColor: "text-[#3484B5]",
    badge: "bg-[#EAF4FA] text-[#3484B5]",
    number: "bg-[#3484B5]",
  },
};

function LessonCard({ lesson }) {
  const Icon = lesson.icon;
  const styles = colorStyles[lesson.color];

  return (
    <div className="bg-white rounded-[24px] border border-[#E5EDE8] shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl ${styles.iconBg} ${styles.iconColor} flex items-center justify-center shrink-0`}
          >
            <Icon size={27} strokeWidth={2} />
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider ${styles.iconColor}`}
              >
                Rubric {lesson.number}
              </span>

              <span className="text-[11px] font-semibold text-[#8A9990] whitespace-nowrap">
                {lesson.duration}
              </span>
            </div>

            <h3 className="text-[19px] font-extrabold text-[#26382D] leading-tight">
              {lesson.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-[13px] leading-6 text-[#66756C]">
          {lesson.description}
        </p>

        {/* Topics */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {lesson.topics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#F8FAF8] rounded-xl px-3 py-2.5"
            >
              <CheckCircle2
                size={14}
                className={styles.iconColor}
                strokeWidth={2.5}
              />

              <span className="text-[11px] font-semibold text-[#536159]">
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="px-5 pb-5">
        <Link
          to={lesson.route}
          className="w-full flex items-center justify-center gap-2 bg-[#2E9B59] hover:bg-[#26864C] text-white py-3.5 rounded-2xl text-[13px] font-extrabold transition-colors"
        >
          Start Lesson
          <ChevronRight size={17} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

function Lessons() {
  return (
    <div className="min-h-screen bg-[#EAF7EE]">
      <div className="max-w-[900px] mx-auto min-h-screen pb-24">
        {/* Header */}
        <header className="px-5 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E9B59] flex items-center justify-center shadow-sm">
              <Sprout size={25} className="text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#2E9B59]">
                Scan-Grow
              </p>

              <h1 className="text-[25px] font-extrabold text-[#26382D] leading-tight">
                Planting Lessons
              </h1>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="px-5">
          <div className="bg-white rounded-[26px] p-5 border border-[#E1ECE5] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                <GraduationCap
                  size={21}
                  className="text-[#2E9B59]"
                  strokeWidth={2.2}
                />
              </div>

              <div>
                <h2 className="text-[17px] font-extrabold text-[#2D4034]">
                  Learn Good Planting Practices
                </h2>

                <p className="mt-1.5 text-[13px] leading-6 text-[#68766E]">
                  Learn the important steps in planting fruit-bearing trees.
                  Each lesson will help you practice the correct way to prepare,
                  plant, and care for seedlings.
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68766E]">
                  Planting Skills
                </span>

                <span className="text-[11px] font-extrabold text-[#2E9B59]">
                  5 Lessons
                </span>
              </div>

              <div className="h-2 bg-[#E7EFE9] rounded-full overflow-hidden">
                <div className="h-full w-full bg-[#3DBB6D] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Section Title */}
        <section className="px-5 pt-7 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                Practical Assessment
              </p>

              <h2 className="text-[21px] font-extrabold text-[#26382D] mt-1">
                Planting Skills
              </h2>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#78857D]">
                5 Skills
              </span>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <main className="px-5 space-y-4">
          {plantingSkills.map((lesson) => (
            <LessonCard key={lesson.number} lesson={lesson} />
          ))}
        </main>

        {/* Reminder */}
        <section className="px-5 pt-6">
          <div className="relative overflow-hidden rounded-[26px] bg-[#2E9B59] p-5">
            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute -right-2 -bottom-12 w-32 h-32 rounded-full bg-white/10" />

            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                <Sprout size={22} className="text-white" strokeWidth={2.2} />
              </div>

              <h3 className="text-[18px] font-extrabold text-white">
                Good Planting Starts With Good Practice
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-white/85 max-w-[650px]">
                Follow each step carefully. Preparing the soil, handling
                seedlings, planting at the correct depth, giving enough space,
                and watering properly all help plants grow healthy and strong.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Message */}
        <div className="px-5 pt-6 pb-3 text-center">
          <p className="text-[12px] font-semibold text-[#78857D]">
            Learn today, grow tomorrow 🌱
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default Lessons;
