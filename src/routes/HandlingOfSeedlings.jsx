import React, { useEffect, useState } from "react";
import {
  Sprout,
  Leaf,
  Hand,
  ShieldCheck,
  Heart,
  CheckCircle2,
  ArrowLeft,
  PlayCircle,
  BookOpen,
  CircleCheck,
  Trophy,
  RotateCcw,
  Clock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../assets/api";
import BottomNav from "../components/BottomNav";

const LESSON_TITLE = "Handling of Seedlings";

function HandlingOfSeedlings() {
  const [userId, setUserId] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [checkingQuiz, setCheckingQuiz] = useState(true);
  const [deletingQuiz, setDeletingQuiz] = useState(false);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

      setIsSuperuser(userInfo?.is_superuser === true);

      if (!userInfo?.id) {
        setUserId(null);
        setCheckingQuiz(false);
        return;
      }

      setUserId(userInfo.id);
    } catch (error) {
      console.error("Unable to read user information:", error);
      setCheckingQuiz(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchQuizScore = async () => {
      setCheckingQuiz(true);

      try {
        const response = await api.get(`/api/quiz-scores/${userId}/`);
        const scores = Array.isArray(response.data) ? response.data : [];

        const existingScore = scores.find(
          (item) => item.title?.trim() === LESSON_TITLE,
        );

        setQuizScore(existingScore || null);
      } catch (error) {
        console.error("Unable to fetch quiz history:", error);

        Swal.fire({
          icon: "error",
          title: "Unable to Check Quiz",
          text:
            error.response?.data?.error ||
            "Could not retrieve your quiz history. Please try again.",
          confirmButtonColor: "#2E9B59",
        });
      } finally {
        setCheckingQuiz(false);
      }
    };

    fetchQuizScore();
  }, [userId]);

  const handleRetryQuiz = async () => {
    if (!userId || deletingQuiz) return;

    const confirmation = await Swal.fire({
      title: "Retry This Quiz?",
      text: "Your previous quiz attempt for Handling of Seedlings will be deleted. You will need to take the quiz again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete and Retry",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2E9B59",
      cancelButtonColor: "#9CA3AF",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    setDeletingQuiz(true);

    try {
      await api.delete(`/api/quiz-scores/${userId}/`, {
        params: { title: LESSON_TITLE },
      });

      setQuizScore(null);

      await Swal.fire({
        icon: "success",
        title: "Previous Attempt Deleted!",
        text: "You can now take the Handling of Seedlings quiz again.",
        confirmButtonColor: "#2E9B59",
      });
    } catch (error) {
      console.error("Unable to delete quiz attempt:", error);

      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text:
          error.response?.data?.error ||
          "Something went wrong while deleting your quiz attempt. Please try again.",
        confirmButtonColor: "#2E9B59",
      });
    } finally {
      setDeletingQuiz(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

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
                <Hand size={21} />
              </div>

              <span className="text-sm font-bold text-[#2E9B59]">
                LESSON 02 • PLANTING SKILLS
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Handling of Seedlings 🌱
            </h1>

            <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#66806E]">
              Learn how to carefully handle seedlings so their stems and roots
              stay healthy and undamaged.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-2 bg-[#2E9B59]" />

            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E3F5E8] text-[#2E9B59]">
                  <Sprout size={25} />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E9B59]">
                    Let's Learn
                  </span>

                  <h2 className="mt-1 text-xl font-extrabold text-[#294735]">
                    Handle Seedlings With Care
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#617368]">
                <p>
                  Seedlings are young and delicate plants. They need to be
                  handled carefully when they are moved from one place to
                  another.
                </p>

                <p>
                  Always hold the seedling{" "}
                  <strong className="text-[#2E9B59]">gently</strong> and avoid
                  pulling, squeezing, or damaging the stem and roots.
                </p>

                <p>
                  Careful handling helps the seedling remain healthy and
                  increases its chance of surviving after planting.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#F1E3D4] p-3 text-center">
                  <Hand size={19} className="mx-auto text-[#9A6842]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Gentle
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E3F5E8] p-3 text-center">
                  <ShieldCheck size={19} className="mx-auto text-[#2E9B59]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Protect
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF9E8] p-3 text-center">
                  <Heart size={19} className="mx-auto text-[#E4A72C]" />
                  <p className="mt-1 text-[10px] font-bold text-[#52705D]">
                    Care
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
                  Learn how to handle seedlings safely
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
                Safe Seedling Handling
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#718078]">
                Remember these important practices when moving a seedling.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Hold Gently",
                  text: "Handle the seedling gently to avoid unnecessary pressure or damage.",
                  icon: Hand,
                  bg: "bg-[#F1E3D4]",
                  color: "text-[#9A6842]",
                  border: "border-[#E7D5C3]",
                },
                {
                  title: "Protect the Stem",
                  text: "Do not pull or squeeze the stem because it can damage the young plant.",
                  icon: ShieldCheck,
                  bg: "bg-[#E3F5E8]",
                  color: "text-[#2E9B59]",
                  border: "border-[#D5E8D9]",
                },
                {
                  title: "Protect the Roots",
                  text: "Keep the roots safe while removing and carrying the seedling.",
                  icon: Sprout,
                  bg: "bg-[#FFF9E8]",
                  color: "text-[#E4A72C]",
                  border: "border-[#FFF0C7]",
                },
                {
                  title: "Carry Carefully",
                  text: "Move the seedling carefully from its original location to the planting hole.",
                  icon: CircleCheck,
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
                  Handle the Seedling Carefully
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Carefully remove the seedling and carry it to the planting
                  hole without damaging the stem or roots.
                </p>

                <div className="mt-4 rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-bold text-white/70">
                    Student Statement
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    “I will handle the seedling carefully to prevent damage.”
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
                "Seedlings are delicate and should be handled carefully.",
                "Avoid pulling or squeezing the stem.",
                "Protect the roots when removing and carrying the seedling.",
                "Careful handling increases the seedling's chance of survival.",
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

          {/* QUIZ HISTORY */}
          <div className="mt-8 border-t border-[#E8F0EA] pt-6">
            {checkingQuiz ? (
              <div className="flex flex-col items-center rounded-2xl bg-[#F4FBF5] p-6 text-center">
                <Loader2 size={28} className="animate-spin text-[#2E9B59]" />

                <p className="mt-3 text-sm font-bold text-[#477157]">
                  Checking your quiz history...
                </p>
              </div>
            ) : !userId ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                <p className="text-sm font-bold text-amber-800">
                  Please log in to take this quiz.
                </p>

                <Link
                  to="/login"
                  className="mt-3 inline-flex rounded-xl bg-[#2E9B59] px-5 py-2.5 text-xs font-extrabold text-white"
                >
                  Log In
                </Link>
              </div>
            ) : quizScore ? (
              <div className="rounded-2xl border border-green-200 bg-[#F1FAF3] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    <Trophy size={23} />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-green-700">
                      Quiz Already Completed
                    </p>

                    <h3 className="text-base font-extrabold text-[#294735]">
                      You Already Took This Quiz!
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Your Score
                    </p>

                    <p className="mt-1 break-words text-lg font-black text-[#2E9B59]">
                      {quizScore.score}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </p>

                    <p
                      className={`mt-1 text-sm font-extrabold ${
                        quizScore.status === "Passed"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {quizScore.status}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white p-3 text-xs text-gray-500">
                  <Clock size={15} className="shrink-0 text-[#2E9B59]" />
                  <span>Submitted: {formatDate(quizScore.time_submitted)}</span>
                </div>

                {quizScore.comment && (
                  <div className="mt-3 rounded-xl bg-white p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      Feedback
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {quizScore.comment}
                    </p>
                  </div>
                )}

                <div className="mt-5 rounded-xl bg-green-100/70 p-3 text-center">
                  <p className="text-xs font-semibold text-green-800">
                    Your previous result is saved. To take this quiz again,
                    delete your previous attempt first.
                  </p>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-gray-300 px-5 py-3.5 text-sm font-extrabold text-gray-600"
                >
                  <CheckCircle2 size={17} />
                  You Already Took the Quiz
                </button>

                <button
                  type="button"
                  onClick={handleRetryQuiz}
                  disabled={deletingQuiz}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#2E9B59] bg-white px-5 py-3.5 text-sm font-extrabold text-[#2E9B59] transition hover:bg-[#EAF7EE] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingQuiz ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Deleting Previous Attempt...
                    </>
                  ) : (
                    <>
                      <RotateCcw size={17} />
                      Delete Previous Attempt & Retry
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                {!isSuperuser && (
                  <>
                    <div className="mb-4 rounded-2xl bg-[#F1FAF3] p-4">
                      <p className="text-sm font-extrabold text-[#294735]">
                        Ready to test your knowledge? 🌱
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#718078]">
                        Complete the lesson quiz to check how well you
                        understand safe seedling handling.
                      </p>
                    </div>

                    <Link
                      to="/handling-of-seedlings-quiz"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2E9B59] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-1 hover:bg-[#247D46]"
                    >
                      <BookOpen size={17} />
                      Take Lesson Quiz
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

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

export default HandlingOfSeedlings;
