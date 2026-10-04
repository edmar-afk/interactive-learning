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
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function WhatArePlants() {
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
                LESSON 01 • PLANT BASICS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              What Are Plants? 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn what plants are, what they need to live and grow, and why
              plants are important to people, animals, and our environment.
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
                    What Are Plants?
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Plants are living things that grow in many places around the
                  world. We can find them in gardens, forests, farms, parks,
                  mountains, and even inside our homes.
                </p>

                <p>
                  Plants are special because most of them can make their own
                  food. They use{" "}
                  <strong className="text-[#2E9B59]">
                    sunlight, water, and carbon dioxide
                  </strong>{" "}
                  to make the food they need through a process called
                  <strong className="text-[#2E9B59]"> photosynthesis</strong>.
                </p>

                <p>
                  Plants are important parts of our world. They give us food,
                  oxygen, shade, wood, medicines, and many other useful
                  materials. They also provide food and shelter for animals.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#FFF9E8] p-3 text-center">
                  <Sun size={19} className="mx-auto text-[#E4A72C]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Sunlight
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F4F9FD] p-3 text-center">
                  <Droplets size={19} className="mx-auto text-[#3484B5]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Water
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F4FBF5] p-3 text-center">
                  <Wind size={19} className="mx-auto text-[#2E9B59]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Air
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* YouTube Video */}
          {/* Educational Video */}
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
                  Learn more about plants through this video
                </p>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-black">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/7nYHIQ5yORE"
                title="What Are Plants?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Details */}
            <div className="px-5">
              <div className="rounded-xl px-4 py-3 flex flex-row items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9AA79E]">
                  Video Source
                </p>

                <a
                  href="https://www.youtube.com/watch?v=7nYHIQ5yORE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex underline items-center gap-1 text-xs font-bold text-[#2E9B59] hover:underline"
                >
                  YouTube
                  <span>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* Why Plants Are Important */}
          <section className="mb-6 mt-8">
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <Heart size={18} className="text-[#2E9B59]" />

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#2E9B59]">
                  Why They Matter
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#294735]">
                Why Are Plants Important?
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Plants help make our world healthier and provide many things
                that living creatures need.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Food */}
              <div className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Apple size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Food
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants give us fruits, vegetables, grains, and other foods
                  that people and animals eat.
                </p>
              </div>

              {/* Oxygen */}
              <div className="rounded-3xl border border-[#CFE2F2] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DFEFFB] text-[#3484B5]">
                  <Wind size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Oxygen
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants release oxygen during photosynthesis, which helps
                  people and animals breathe.
                </p>
              </div>

              {/* Shelter */}
              <div className="rounded-3xl border border-[#E7D5C3] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                  <TreePine size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Shelter
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Trees and other plants provide homes, hiding places, and
                  shelter for many animals.
                </p>
              </div>

              {/* Environment */}
              <div className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Flower2 size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Healthy Environment
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Plants help protect soil, support animals, and make our
                  surroundings greener and more beautiful.
                </p>
              </div>
            </div>
          </section>

          {/* What Plants Need */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-[#2E9B59] p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Sprout size={23} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/70">
                  Remember This
                </p>

                <h2 className="mt-1 text-lg font-extrabold">
                  What Do Plants Need?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Just like people and animals, plants need certain things to
                  live and grow. They need sunlight, water, air, nutrients, and
                  a suitable place to grow.
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
                  Plants in the Philippines 🇵🇭
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7D70]">
                  The Philippines has a warm tropical climate where many plants
                  can grow. You may see mango trees, coconut palms, banana
                  plants, bamboo, rice, flowers, and many other plants in your
                  community.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Mango",
                    "Coconut",
                    "Banana",
                    "Bamboo",
                    "Rice",
                    "Gumamela",
                  ].map((plant) => (
                    <span
                      key={plant}
                      className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#79573E] shadow-sm"
                    >
                      🌱 {plant}
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
                "Plants are living things that grow in many different places.",
                "Most plants can make their own food through photosynthesis.",
                "Plants need sunlight, water, air, nutrients, and enough space to grow.",
                "Plants provide food, oxygen, shelter, and many useful materials.",
                "The Philippines is home to many different kinds of plants.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#7BD89A]"
                  />

                  <p className="text-xs leading-5 text-[#68796E]">{item}</p>
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

      <BottomNav/>
    </>
  );
}

export default WhatArePlants;
