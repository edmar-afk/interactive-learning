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
  TreePine,
  Flower2,
  CircleDot,
  CloudSun,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function WhatPlantsNeedToGrow() {
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
                LESSON 03 • PLANT BASICS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              What Plants Need to Grow 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Discover the important things plants need to live, grow, and stay
              healthy, including sunlight, water, air, nutrients, and space.
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
                    What Do Plants Need to Grow?
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Plants are living things, so they need certain things to
                  survive and grow. Giving a plant the right amount of{" "}
                  <strong className="text-[#2E9B59]">
                    sunlight, water, air, nutrients, and space
                  </strong>{" "}
                  helps it stay healthy.
                </p>

                <p>
                  <strong className="text-[#2E9B59]">Sunlight</strong> gives
                  plants the energy they need to make their own food.
                  <strong className="text-[#2E9B59]"> Water</strong> helps
                  transport nutrients and keeps the plant from drying out.
                </p>

                <p>
                  Plants also need{" "}
                  <strong className="text-[#2E9B59]">air</strong> and
                  nutrients from the soil. They need enough{" "}
                  <strong className="text-[#2E9B59]">space</strong> so their
                  roots, stems, and leaves can grow properly.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#FFF9E8] p-3 text-center">
                  <Sun
                    size={19}
                    className="mx-auto text-[#E4A72C]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Sunlight
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F4F9FD] p-3 text-center">
                  <Droplets
                    size={19}
                    className="mx-auto text-[#3484B5]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Water
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F4FBF5] p-3 text-center">
                  <Wind
                    size={19}
                    className="mx-auto text-[#2E9B59]"
                  />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Air
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
                  Learn what plants need to grow
                </p>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-black">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/ZdOmVDRNXys"
                title="What Plants Need to Grow"
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
                  href="https://www.youtube.com/watch?v=ZdOmVDRNXys"
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

          {/* What Plants Need */}
          <section className="mb-6 mt-8">
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <Heart size={18} className="text-[#2E9B59]" />

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#2E9B59]">
                  Plant Needs
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#294735]">
                Things Plants Need to Grow
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Each of these needs helps plants grow strong and healthy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {/* Sunlight */}
              <div className="rounded-3xl border border-[#FFF0C7] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF9E8] text-[#E4A72C]">
                  <Sun size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Sunlight
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants need sunlight to get the energy they need to make
                  their own food through photosynthesis.
                </p>
              </div>

              {/* Water */}
              <div className="rounded-3xl border border-[#CFE2F2] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DFEFFB] text-[#3484B5]">
                  <Droplets size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Water
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Water helps plants stay hydrated and helps move nutrients
                  throughout the plant.
                </p>
              </div>

              {/* Air */}
              <div className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Wind size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Air
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants use carbon dioxide from the air to help make food
                  during photosynthesis.
                </p>
              </div>

              {/* Nutrients */}
              <div className="rounded-3xl border border-[#E7D5C3] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                  <Sprout size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Nutrients
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants get important nutrients from the soil. These
                  nutrients help plants grow and stay healthy.
                </p>
              </div>

              {/* Space */}
              <div className="rounded-3xl border border-[#DCE4C8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4DD] text-[#789143]">
                  <TreePine size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Space
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants need enough space for their roots, stems, and leaves
                  to grow without being crowded.
                </p>
              </div>

              {/* Suitable Place */}
              <div className="rounded-3xl border border-[#E8D7E8] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EAF5] text-[#9B5FA6]">
                  <CloudSun size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Suitable Place
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants grow best when they are placed in an environment
                  that provides the conditions they need.
                </p>
              </div>
            </div>
          </section>

          {/* Remember This */}
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
                  Plants Need Many Things
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  A healthy plant needs sunlight, water, air, nutrients, and
                  enough space. Taking care of these needs helps plants grow
                  strong and healthy.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Sun size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Sunlight</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Droplets size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Water</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Wind size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Air</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center">
                <Leaf size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Nutrients</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 text-center col-span-2 sm:col-span-1">
                <Sprout size={18} className="mx-auto" />
                <p className="mt-1 text-[10px] font-bold">Space</p>
              </div>
            </div>
          </section>

          {/* Plant Care */}
          <section className="mb-6 rounded-3xl border border-[#E7D5C3] bg-[#FBF7F2] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                <Sprout size={22} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9A6842]">
                  Try This
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-[#294735]">
                  Help a Plant Grow 🌱
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7D70]">
                  Choose a plant near your home or school. Observe it and
                  check if it has enough sunlight, water, air, nutrients, and
                  space to grow.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "☀️ Sunlight",
                    "💧 Water",
                    "💨 Air",
                    "🌱 Nutrients",
                    "🌿 Space",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#79573E] shadow-sm"
                    >
                      {item}
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
                "Plants need sunlight, water, air, nutrients, and enough space to grow.",
                "Sunlight gives plants energy to make their own food.",
                "Water helps plants stay hydrated and move nutrients.",
                "Plants use carbon dioxide from the air during photosynthesis.",
                "Plants need nutrients and a suitable place to grow healthy.",
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

export default WhatPlantsNeedToGrow;

