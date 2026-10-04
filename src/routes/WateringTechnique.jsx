import React from "react";
import {
  Sprout,
  Leaf,
  Droplets,
  Waves,
  CircleCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  PlayCircle,
  BookOpen,
  CloudRain,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function WateringTechnique() {
  return (
    <>
      <div className="min-h-screen bg-[#EAF7EE] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[900px]">

          <Link
            to="/lessons"
            className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#477157] shadow-sm transition hover:bg-[#F4FBF5]"
          >
            <ArrowLeft size={15} />
            Back to Lessons
          </Link>

          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E9B59] text-white shadow-sm">
                <Droplets size={21} />
              </div>

              <span className="text-sm font-bold text-[#2E9B59]">
                LESSON 05 • PLANTING SKILLS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Watering Technique 💧
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn how to water newly planted seedlings gently and evenly so
              the soil stays properly moist.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-2 bg-[#2E9B59]" />

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Droplets size={25} />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                    Let's Learn
                  </span>

                  <h2 className="mt-1 text-xl font-extrabold text-[#294735]">
                    Water Plants the Right Way
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Newly planted seedlings need water to help them adjust to
                  their new environment and begin growing.
                </p>

                <p>
                  Give enough water to{" "}
                  <strong className="text-[#2E9B59]">
                    moisten the soil
                  </strong>
                  , but avoid giving too much or too little.
                </p>

                <p>
                  Water gently around the{" "}
                  <strong className="text-[#2E9B59]">
                    base of the plant
                  </strong>{" "}
                  instead of directly hitting the leaves or stem.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#F1E3D4] p-3 text-center">
                  <Droplets size={19} className="mx-auto text-[#9A6842]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Enough
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E3F5E8] p-3 text-center">
                  <Waves size={19} className="mx-auto text-[#2E9B59]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Gentle
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF9E8] p-3 text-center">
                  <CloudRain size={19} className="mx-auto text-[#E4A72C]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Even
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Video */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-[#DCE9DF] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E8F0EA] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3F5E8] text-[#2E9B59]">
                <PlayCircle size={21} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-[#294735]">
                  Watch and Learn 🎥
                </h2>

                <p className="mt-0.5 text-[10px] font-medium text-[#8A978E]">
                  Learn the proper way to water newly planted seedlings
                </p>
              </div>
            </div>

            <div className="bg-black">
              <div className="flex aspect-video items-center justify-center text-center text-white">
                <div>
                  <PlayCircle size={48} className="mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold opacity-70">
                    YouTube video will be added here
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5">
              <div className="flex items-center justify-between rounded-xl px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9AA79E]">
                  Video Source
                </p>

                <span className="text-xs font-bold text-[#9AA79E]">
                  YouTube link coming soon
                </span>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6 mt-8">
            <div className="mb-5">
              <div className="mb-1 flex items-center gap-2">
                <Leaf size={18} className="text-[#2E9B59]" />

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#2E9B59]">
                  Planting Skill
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#294735]">
                Proper Watering Technique
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Use a gentle and controlled watering technique after planting.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Give Enough Water",
                  text: "Add enough water to moisten the soil around the seedling.",
                  icon: Droplets,
                  bg: "bg-[#F1E3D4]",
                  color: "text-[#9A6842]",
                  border: "border-[#E7D5C3]",
                },
                {
                  title: "Water Gently",
                  text: "Use a gentle flow of water so the soil and seedling are not disturbed.",
                  icon: Waves,
                  bg: "bg-[#E3F5E8]",
                  color: "text-[#2E9B59]",
                  border: "border-[#D5E8D9]",
                },
                {
                  title: "Water the Base",
                  text: "Direct the water around the base instead of hitting the leaves or stem.",
                  icon: Sprout,
                  bg: "bg-[#FFF9E8]",
                  color: "text-[#E4A72C]",
                  border: "border-[#FFF0C7]",
                },
                {
                  title: "Avoid Too Much or Too Little",
                  text: "Maintain a proper amount of moisture without overwatering or underwatering.",
                  icon: ShieldCheck,
                  bg: "bg-[#F4EAF5]",
                  color: "text-[#9B5FA6]",
                  border: "border-[#E8D7E8]",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`rounded-3xl border ${item.border} bg-white p-5 shadow-sm`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-3 text-base font-extrabold text-[#294735]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#6B7D70]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Student Action */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-[#2E9B59] p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/70">
                  Student Action
                </p>

                <h2 className="mt-1 text-lg font-extrabold">
                  Water the Seedling Gently
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Water evenly around the base of the plant. Avoid directly
                  hitting the leaves or stem.
                </p>

                <div className="mt-4 rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-bold text-white/70">
                    Student Statement
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    “I will water the plant gently and evenly.”
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Summary */}
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
                "Newly planted seedlings need enough water.",
                "Water should be applied gently and evenly.",
                "Water around the base instead of directly hitting the leaves or stem.",
                "Avoid giving the seedling too much or too little water.",
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

export default WateringTechnique;