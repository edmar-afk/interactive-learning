import React from "react";
import {
  Sprout,
  Leaf,
  Sun,
  Droplets,
  Wind,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  PlayCircle,
  Heart,
  Apple,
  TreePine,
  Flower2,
  CircleDot,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function PartsOfPlants() {
  return (
    <>
      <div className="min-h-screen bg-[#EAF7EE] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[900px]">

          {/* Back Button */}
          <Link
            to="/lessons"
            className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#477157] shadow-sm transition hover:bg-[#F4FBF5]"
          >
            <ArrowLeft size={15} />
            Back to Lessons
          </Link>

          {/* Header */}
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E9B59] text-white shadow-sm">
                <Sprout size={21} strokeWidth={2.2} />
              </div>

              <span className="text-sm font-bold text-[#2E9B59]">
                LESSON 02 • PLANT BASICS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Parts of a Plants 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn about the different parts of a plant and discover how each
              part helps the plant live, grow, and make new plants.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-2 bg-[#2E9B59]" />

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Leaf size={25} />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                    Let's Learn
                  </span>

                  <h2 className="mt-1 text-xl font-extrabold text-[#294735]">
                    What Are the Parts of a Plant?
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Plants have different parts, and each part has an important
                  job. The main parts of a plant include the{" "}
                  <strong className="text-[#2E9B59]">
                    roots, stem, leaves, flowers, fruits, and seeds
                  </strong>
                  .
                </p>

                <p>
                  The{" "}
                  <strong className="text-[#2E9B59]">roots</strong> help hold
                  the plant in the soil and absorb water and nutrients. The{" "}
                  <strong className="text-[#2E9B59]">stem</strong> supports
                  the plant and helps move water and nutrients to other parts.
                </p>

                <p>
                  The{" "}
                  <strong className="text-[#2E9B59]">leaves</strong> use
                  sunlight, water, and air to help the plant make food.{" "}
                  <strong className="text-[#2E9B59]">Flowers, fruits, and
                  seeds</strong>{" "}
                  help plants reproduce and produce new plants.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#F1E3D4] p-3 text-center">
                  <Sprout
                    size={19}
                    className="mx-auto text-[#9A6842]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Roots
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E3F5E8] p-3 text-center">
                  <TreePine
                    size={19}
                    className="mx-auto text-[#2E9B59]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Stem
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF9E8] p-3 text-center">
                  <Sun
                    size={19}
                    className="mx-auto text-[#E4A72C]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Leaves
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* YouTube Video */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-[#DCE9DF] bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#E8F0EA] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3F5E8] text-[#2E9B59]">
                <PlayCircle size={21} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-[#294735]">
                  Watch and Learn 🎥
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A978E]">
                  Learn about the different parts of plants
                </p>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-black">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/7nYHIQ5yORE"
                title="Parts of Plants"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Details */}
            <div className="px-5">
              <div className="flex flex-row items-center justify-between rounded-xl px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9AA79E]">
                  Video Source
                </p>

                <a
                  href="https://www.youtube.com/watch?v=7nYHIQ5yORE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2E9B59] underline hover:text-[#237A45]"
                >
                  YouTube
                  <span>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* Main Parts of a Plant */}
          <section className="mb-6 mt-8">
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <Leaf size={18} className="text-[#2E9B59]" />

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#2E9B59]">
                  Plant Parts
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#294735]">
                Meet the Parts of a Plant
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Every part of a plant has a special job that helps the plant
                survive and grow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {/* Roots */}
              <div className="rounded-3xl border border-[#E7D5C3] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                  <Sprout size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Roots
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Roots hold the plant firmly in the soil and absorb water and
                  nutrients that the plant needs to grow.
                </p>
              </div>

              {/* Stem */}
              <div className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <TreePine size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Stem
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  The stem supports the plant and transports water and
                  nutrients between the roots and other parts of the plant.
                </p>
              </div>

              {/* Leaves */}
              <div className="rounded-3xl border border-[#FFF0C7] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF9E8] text-[#E4A72C]">
                  <Sun size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Leaves
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Leaves capture sunlight and help the plant make its own food
                  through photosynthesis.
                </p>
              </div>

              {/* Flowers */}
              <div className="rounded-3xl border border-[#E8D7E8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EAF5] text-[#9B5FA6]">
                  <Flower2 size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Flowers
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Flowers are important for plant reproduction. They can
                  develop into fruits and help produce seeds.
                </p>
              </div>

              {/* Fruits */}
              <div className="rounded-3xl border border-[#F0D7C9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBECE4] text-[#D9784A]">
                  <Apple size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Fruits
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Fruits protect the seeds of many plants. Some fruits are
                  also important sources of food for people and animals.
                </p>
              </div>

              {/* Seeds */}
              <div className="rounded-3xl border border-[#DCE4C8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4DD] text-[#789143]">
                  <CircleDot size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Seeds
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Seeds contain a young plant. When given the right conditions,
                  a seed can grow into a new plant.
                </p>
              </div>
            </div>
          </section>

          {/* Plant Jobs */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-[#2E9B59] p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/70">
                  Remember This
                </p>

                <h2 className="mt-1 text-lg font-extrabold">
                  Every Plant Part Has a Job
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Plants work as a team. Roots take in water and nutrients,
                  stems provide support, leaves make food, and flowers, fruits,
                  and seeds help plants reproduce.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Sprout size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Roots</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <TreePine size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Stem</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Sun size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Leaves</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Flower2 size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Flowers</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Apple size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Fruits</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <CircleDot size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Seeds</p>
              </div>
            </div>
          </section>

          {/* Plants Around Us */}
          <section className="mb-6 rounded-3xl border border-[#E7D5C3] bg-[#FBF7F2] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                <TreePine size={22} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9A6842]">
                  Look Around You
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-[#294735]">
                  Find Plant Parts Around You 🇵🇭
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7D70]">
                  Look at the plants around your home, school, or community.
                  Try to identify their roots, stems, leaves, flowers, fruits,
                  and seeds.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Roots",
                    "Stem",
                    "Leaves",
                    "Flowers",
                    "Fruits",
                    "Seeds",
                  ].map((part) => (
                    <span
                      key={part}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#79573E] shadow-sm"
                    >
                      🌱 {part}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What You Learned */}
          <section className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#2E9B59]" />

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                  Lesson Summary
                </p>

                <h2 className="text-base font-extrabold text-[#294735]">
                  What You Learned
                </h2>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Plants have different parts that perform different jobs.",
                "Roots hold the plant in the soil and absorb water and nutrients.",
                "The stem supports the plant and transports water and nutrients.",
                "Leaves use sunlight to help the plant make food.",
                "Flowers, fruits, and seeds are important for plant reproduction.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#7BD89A]"
                  />

                  <p className="text-xs leading-5 text-[#68796E]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Navigation */}
          <div className="mt-6 flex gap-3 pb-6">
            <Link
              to="/lessons"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#CDE8D4] bg-white px-5 py-3.5 text-sm font-extrabold text-[#477157] shadow-sm transition hover:bg-[#F4FBF5]"
            >
              <ArrowLeft size={17} />
              Lessons
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default PartsOfPlants;

