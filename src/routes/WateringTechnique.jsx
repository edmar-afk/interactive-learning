import React, { useEffect, useState } from "react";
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
  Trophy,
  CalendarDays,
  Trash2,
  ClipboardCheck,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../assets/api";
import BottomNav from "../components/BottomNav";

const LESSON_TITLE = "Watering Technique";
const QUIZ_ROUTE = "/watering-technique-quiz";

function WateringTechnique() {
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [loadingAttempt, setLoadingAttempt] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(false);

  // Get the currently logged-in user and check superuser status.
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

      if (userInfo) {
        setIsSuperuser(userInfo.is_superuser === true);
      }

      if (userInfo?.id) {
        setUserId(userInfo.id);
      } else {
        setLoadingAttempt(false);
      }
    } catch (error) {
      console.error("Error reading user information:", error);
      setLoadingAttempt(false);
    }
  }, []);

  // Fetch the student's quiz history.
  const fetchQuizAttempt = async () => {
    if (!userId) {
      setLoadingAttempt(false);
      return;
    }

    try {
      setLoadingAttempt(true);

      const response = await api.get(`/api/quiz-scores/${userId}/`);

      const scores = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      const existingAttempt = scores.find(
        (item) => item.title?.trim() === LESSON_TITLE,
      );

      setQuizAttempt(existingAttempt || null);
    } catch (error) {
      console.error("Error fetching quiz history:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Load Quiz History",
        text: "Please check your connection and try again.",
        confirmButtonColor: "#2E9B59",
      });
    } finally {
      setLoadingAttempt(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchQuizAttempt();
    }
  }, [userId]);

  // Delete the previous quiz attempt.
  const handleDeleteAttempt = async () => {
    if (!userId || !quizAttempt) return;

    const result = await Swal.fire({
      title: "Delete Previous Attempt?",
      text: "Your saved Watering Technique quiz result will be deleted. You can take the quiz again afterward.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/api/quiz-scores/${userId}/`, {
        params: {
          title: LESSON_TITLE,
        },
      });

      setQuizAttempt(null);

      await Swal.fire({
        icon: "success",
        title: "Previous Attempt Deleted",
        text: "You can now take the Watering Technique quiz again.",
        confirmButtonColor: "#2E9B59",
      });
    } catch (error) {
      console.error("Error deleting quiz attempt:", error);

      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text:
          error.response?.data?.detail ||
          "Something went wrong while deleting your previous attempt.",
        confirmButtonColor: "#2E9B59",
      });
    }
  };

  // Format the quiz submission date.
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const skills = [
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
  ];

  const summaryItems = [
    "Newly planted seedlings need enough water.",
    "Water should be applied gently and evenly.",
    "Water around the base instead of directly hitting the leaves or stem.",
    "Avoid giving the seedling too much or too little water.",
  ];

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

          {/* Lesson Header */}
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
                  <strong className="text-[#2E9B59]">moisten the soil</strong>,
                  but avoid giving too much or too little.
                </p>

                <p>
                  Water gently around the{" "}
                  <strong className="text-[#2E9B59]">base of the plant</strong>{" "}
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
              {skills.map((item) => {
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
              {summaryItems.map((item) => (
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

          {/* Quiz History and Quiz Access */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-[#D5E8D9] bg-white shadow-sm">
            <div className="h-2 bg-[#2E9B59]" />

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <ClipboardCheck size={23} />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                    Knowledge Check
                  </p>

                  <h2 className="text-lg font-extrabold text-[#294735]">
                    Watering Technique Quiz
                  </h2>
                </div>
              </div>

              {loadingAttempt ? (
                <div className="flex items-center justify-center gap-2 py-8 text-sm font-semibold text-[#718078]">
                  <Loader2 size={19} className="animate-spin" />
                  Checking your quiz history...
                </div>
              ) : !userId ? (
                <div className="mt-5 rounded-2xl bg-[#FFF9E8] p-4">
                  <p className="text-sm font-bold text-[#85632B]">
                    Login Required
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8C7954]">
                    Please log in to access the quiz and save your results.
                  </p>

                  <Link
                    to="/login"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#2E9B59] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#25834A]"
                  >
                    Login to Continue
                  </Link>
                </div>
              ) : quizAttempt ? (
                <div className="mt-5">
                  <div className="rounded-2xl border border-[#D5E8D9] bg-[#F4FBF5] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Trophy size={19} className="text-[#D6A32E]" />

                        <span className="text-sm font-extrabold text-[#294735]">
                          Previous Quiz Attempt
                        </span>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${
                          quizAttempt.status === "Passed"
                            ? "bg-[#DDF5E5] text-[#25834A]"
                            : "bg-[#FFF0D5] text-[#A66A12]"
                        }`}
                      >
                        {quizAttempt.status || "Completed"}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7B8C80]">
                        Your Score
                      </p>

                      <p className="mt-1 text-3xl font-extrabold text-[#2E9B59]">
                        {quizAttempt.score}
                      </p>
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-xs text-[#718078]">
                      <CalendarDays
                        size={15}
                        className="mt-0.5 shrink-0 text-[#2E9B59]"
                      />

                      <span>
                        Submitted: {formatDate(quizAttempt.time_submitted)}
                      </span>
                    </div>

                    {quizAttempt.comment && (
                      <div className="mt-4 rounded-xl bg-white p-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                          Teacher's Comment
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#68796E]">
                          {quizAttempt.comment}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#F8F5EA] p-4">
                    <p className="text-xs font-bold text-[#856B36]">
                      You Already Took This Quiz
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#8C7954]">
                      Your previous result has been saved. To take the quiz
                      again, delete your previous attempt first.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDeleteAttempt}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-extrabold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete Previous Attempt
                  </button>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="rounded-2xl bg-[#F4FBF5] p-4">
                    <p className="text-sm font-bold text-[#294735]">
                      Ready to Test Your Knowledge?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#718078]">
                      Complete the Watering Technique quiz to check what you
                      have learned from this lesson. Your result will be saved
                      automatically.
                    </p>
                  </div>

                  {/* Hide Take Quiz button for superusers */}
                  {!isSuperuser && (
                    <Link
                      to={QUIZ_ROUTE}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2E9B59] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#25834A]"
                    >
                      <ClipboardCheck size={18} />
                      Take Watering Technique Quiz
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Bottom Navigation Buttons */}
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
