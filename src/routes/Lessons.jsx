import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  BookOpen,
  Sun,
  Droplets,
  Leaf,
  TreePine,
  Apple,
  Flower2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const lessons = [
  {
    id: 1,
    title: "What Are Plants?",
    description:
      "Learn what plants are, why they are important, and how they help people, animals, and the environment.",
    icon: Sprout,
    color: "green",
    category: "Plant Basics",
    duration: "10 min",
    topics: ["Parts of a plant", "Why plants are important", "How plants grow"],
    link: "/what-are-plants",
  },
  {
    id: 2,
    title: "Parts of a Plant",
    description:
      "Discover the different parts of a plant and understand what each part does.",
    icon: Leaf,
    color: "brown",
    category: "Plant Basics",
    duration: "12 min",
    topics: ["Roots", "Stem", "Leaves", "Flowers", "Fruits and seeds"],
    link: "/parts-of-plant",
  },
  {
    id: 3,
    title: "What Plants Need to Grow",
    description:
      "Learn about sunlight, water, air, nutrients, and healthy soil that plants need to grow strong.",
    icon: Sun,
    color: "blue",
    category: "Plant Growth",
    duration: "10 min",
    topics: ["Sunlight", "Water", "Air", "Nutrients"],
    link: "/what-plants-need-to-grow",
  },
  {
    id: 4,
    title: "Understanding Soil",
    description:
      "Learn why soil is important and how to choose good soil for planting.",
    icon: TreePine,
    color: "brown",
    category: "Planting",
    duration: "15 min",
    topics: ["Types of soil", "Healthy soil", "Soil preparation"],
    link: "/understanding-the-soil",
  },
];

const colorStyles = {
  green: {
    card: "border-[#CDE8D4] bg-[#F4FBF5]",
    icon: "bg-[#DDF3E2] text-[#2E9B59]",
    badge: "bg-[#E3F5E8] text-[#2E9B59]",
    button: "bg-[#2E9B59] hover:bg-[#25844B]",
    accent: "bg-[#7BD89A]",
  },
  brown: {
    card: "border-[#E7D5C3] bg-[#FBF7F2]",
    icon: "bg-[#F1E3D4] text-[#9A6842]",
    badge: "bg-[#F3E7DA] text-[#8A5A38]",
    button: "bg-[#9A6842] hover:bg-[#815435]",
    accent: "bg-[#C89B72]",
  },
  blue: {
    card: "border-[#CFE2F2] bg-[#F4F9FD]",
    icon: "bg-[#DFEFFB] text-[#3484B5]",
    badge: "bg-[#E2F0FA] text-[#3484B5]",
    button: "bg-[#3484B5] hover:bg-[#2A6E98]",
    accent: "bg-[#76B7DD]",
  },
};

function Lessons() {
  return (
    <>
      <div className="min-h-screen bg-[#EAF7EE] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E9B59] text-white shadow-sm">
                <BookOpen size={21} strokeWidth={2.2} />
              </div>

              <span className="text-sm font-bold text-[#2E9B59]">
                LEARNING CENTER
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Planting Lessons 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn how plants grow, how to plant and care for them, and
              discover different types of plants found in the Philippines.
            </p>
          </div>

          {/* Progress / Introduction */}
          <div className="mb-7 overflow-hidden rounded-3xl bg-[#2E9B59] p-5 text-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Sprout size={25} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Ready to become a young plant expert?
                </h2>

                <p className="mt-1 text-sm leading-5 text-white/85">
                  Explore each lesson and learn something new about planting,
                  plant care, and Philippine plants.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-semibold">
              <span>{lessons.length} lessons available</span>
              <span>Start learning →</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[8%] rounded-full bg-white" />
            </div>
          </div>

          {/* Lesson List */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const Icon = lesson.icon;
              const styles = colorStyles[lesson.color];

              return (
                <div
                  key={lesson.id}
                  className={`group relative overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
                >
                  {/* Decorative accent */}
                  <div
                    className={`absolute right-0 top-0 h-1.5 w-24 rounded-bl-full ${styles.accent}`}
                  />

                  <div className="flex gap-4">
                    {/* Number + Icon */}
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
                      >
                        <Icon size={23} strokeWidth={2} />
                      </div>

                      <span className="text-[11px] font-bold text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles.badge}`}
                        >
                          {lesson.category}
                        </span>

                        <span className="text-[11px] font-medium text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>

                      <h2 className="text-lg font-extrabold text-[#294735]">
                        {lesson.title}
                      </h2>

                      <p className="mt-1 text-sm leading-5 text-[#6B7D70]">
                        {lesson.description}
                      </p>

                      {/* Topics */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {lesson.topics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-lg bg-white/75 px-2.5 py-1.5 text-[11px] font-medium text-[#65766A]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <Link
                        to={lesson.link}
                        className={`mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition ${styles.button}`}
                      >
                        Start Lesson
                        <ChevronRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom message */}
          <div className="mt-7 rounded-3xl border border-[#D5E8D9] bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E3F5E8] text-[#2E9B59]">
              <Sprout size={22} />
            </div>

            <h3 className="mt-3 text-base font-extrabold text-[#294735]">
              Learn today, grow tomorrow 🌱
            </h3>

            <p className="mx-auto mt-1 max-w-[500px] text-xs leading-5 text-[#748278]">
              Every plant starts with a small seed. Keep learning and discover
              how your knowledge can help plants and our environment grow.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Lessons;
