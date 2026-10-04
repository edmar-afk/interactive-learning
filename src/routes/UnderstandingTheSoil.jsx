import React from "react";
import {
  Sprout,
  Leaf,
  Droplets,
  Wind,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  PlayCircle,
  Heart,
  TreePine,
  CircleDot,
  Worm,
  Sun,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function UnderstandingTheSoil() {
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
                LESSON 04 • PLANT BASICS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Understanding the Soil 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn what soil is, what it contains, and why healthy soil is
              important for plants to grow strong and healthy.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-2 bg-[#2E9B59]" />

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                  <Leaf size={25} />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                    Let's Learn
                  </span>

                  <h2 className="mt-1 text-xl font-extrabold text-[#294735]">
                    What Is Soil?
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Soil is the loose material found on the ground where many
                  plants grow. It is made up of tiny{" "}
                  <strong className="text-[#9A6842]">
                    rock particles, organic matter, water, and air
                  </strong>
                  .
                </p>

                <p>
                  Soil contains important{" "}
                  <strong className="text-[#2E9B59]">
                    nutrients and minerals
                  </strong>{" "}
                  that plants need. It also provides a place where plant roots
                  can grow and hold the plant in place.
                </p>

                <p>
                  Healthy soil can contain many living organisms, such as worms,
                  insects, and tiny microorganisms. These organisms help break
                  down organic matter and support healthy soil.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#F1E3D4] p-3 text-center">
                  <CircleDot size={19} className="mx-auto text-[#9A6842]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Rock Particles
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E3F5E8] p-3 text-center">
                  <Leaf size={19} className="mx-auto text-[#2E9B59]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Organic Matter
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F4F9FD] p-3 text-center">
                  <Droplets size={19} className="mx-auto text-[#3484B5]" />

                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Water & Air
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* YouTube Video */}
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
                  Discover what soil is and why plants need it
                </p>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="bg-black">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/EOFMzrz5Z9g"
                title="Understanding the Soil"
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
                  href="https://www.youtube.com/watch?v=EOFMzrz5Z9g"
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

          {/* Soil Components */}
          <section className="mb-6 mt-8">
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <Heart size={18} className="text-[#2E9B59]" />

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#2E9B59]">
                  Soil Components
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#294735]">
                What's in Soil?
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Soil contains different materials, and each one plays an
                important role in plant growth.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {/* Mineral Particles */}
              <div className="rounded-3xl border border-[#E7D5C3] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                  <CircleDot size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Mineral Particles
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Tiny pieces of rock, such as sand, silt, and clay. They help
                  give soil its structure and provide minerals.
                </p>
              </div>

              {/* Organic Matter */}
              <div className="rounded-3xl border border-[#D5E8D9] bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Leaf size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Organic Matter
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Decayed plants and animals add nutrients to the soil and help
                  the soil hold water.
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
                  Water keeps soil moist and helps dissolve and move nutrients
                  toward plant roots.
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
                  Air fills the spaces between soil particles and provides
                  oxygen that plant roots and soil organisms need.
                </p>
              </div>

              {/* Soil Organisms */}
              <div className="rounded-3xl border border-[#E8D7E8] bg-white p-5 shadow-sm sm:col-span-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EAF5] text-[#8D5B9A]">
                  <Worm size={22} />
                </div>

                <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                  Soil Organisms
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                  Living things such as worms, insects, fungi, bacteria, and
                  other tiny organisms live in soil. They help break down
                  organic matter and support soil health.
                </p>
              </div>
            </div>
          </section>

          {/* Fun Facts */}
          <section className="mb-6 rounded-3xl border border-[#F0DFA8] bg-[#FFF9E8] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFE9A8] text-[#D99A13]">
                <Lightbulb size={22} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#D99A13]">
                  Fun Facts
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-[#294735]">
                  Did You Know? 💡
                </h2>

                <div className="mt-3 space-y-2 text-xs leading-5 text-[#6B7D70]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#D99A13]">•</span>
                    <p>
                      Healthy soil can hold water that plants can use when they
                      need it.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#D99A13]">•</span>
                    <p>Soil can contain many different living organisms.</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-[#D99A13]">•</span>
                    <p>Soil can take a very long time to form naturally.</p>
                  </div>
                </div>
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
                  Healthy Soil = Healthy Plants
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Soil provides plants with nutrients, water, air, and a place
                  for their roots to grow. Healthy soil helps plants grow strong
                  and stay healthy.
                </p>
              </div>
            </div>
          </section>

          {/* Try This */}
          <section className="mb-6 rounded-3xl border border-[#E7D5C3] bg-[#FBF7F2] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1E3D4] text-[#9A6842]">
                <Sprout size={22} />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9A6842]">
                  Try This
                </p>

                <h2 className="mt-1 text-lg font-extrabold text-[#294735]">
                  Look at Soil 🔎
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7D70]">
                  Find a small patch of soil near your home or school. Look
                  closely. Can you see small rocks, sand, dead leaves, roots,
                  worms, or tiny bugs?
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "🪨 Small Rocks",
                    "🍂 Dead Leaves",
                    "🌱 Roots",
                    "🪱 Worms",
                    "🐜 Tiny Bugs",
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
                "Soil is made up of rock particles, organic matter, water, and air.",
                "Soil provides plants with nutrients and a place for their roots to grow.",
                "Water and air in the soil are important for healthy plant roots.",
                "Soil contains living organisms that help break down organic matter.",
                "Healthy soil helps plants grow strong and stay healthy.",
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

      <BottomNav />
    </>
  );
}

export default UnderstandingTheSoil;
