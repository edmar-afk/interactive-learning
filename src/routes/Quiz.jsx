import React, { useEffect, useState } from "react";
import {
  Trophy,
  CheckCircle2,
  Target,
  Brain,
  ListChecks,
  PenLine,
  CircleCheck,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { getQuizScores } from "../utils/quizStorage";

const quizTypes = [
  {
    id: 1,
    title: "Multiple Choice",
    description:
      "Choose the best answer from the choices given. Test what you know about plants and planting.",
    icon: ListChecks,
    color: "green",
    questions: 10,
    link: "/multiple-choice",
  },
  {
    id: 2,
    title: "Fill in the Blanks",
    description:
      "Complete each sentence with the correct word to show what you have learned.",
    icon: PenLine,
    color: "brown",
    questions: 10,
    link: "/fill-in-the-blanks",
  },
  {
    id: 3,
    title: "True or False",
    description:
      "Read each statement carefully and decide whether it is true or false.",
    icon: CircleCheck,
    color: "blue",
    questions: 15,
    link: "/true-or-false",
  },
];

const colorStyles = {
  green: {
    card: "border-[#CDE8D4] bg-[#F5FBF6]",
    icon: "bg-[#DDF3E2] text-[#2E9B59]",
    badge: "bg-[#E3F5E8] text-[#2E9B59]",
    button: "bg-[#2E9B59] hover:bg-[#25844B]",
    progress: "bg-[#2E9B59]",
  },
  brown: {
    card: "border-[#E7D5C3] bg-[#FBF7F2]",
    icon: "bg-[#F1E3D4] text-[#9A6842]",
    badge: "bg-[#F3E7DA] text-[#8A5A38]",
    button: "bg-[#9A6842] hover:bg-[#815435]",
    progress: "bg-[#9A6842]",
  },
  blue: {
    card: "border-[#CFE2F2] bg-[#F4F9FD]",
    icon: "bg-[#DFEFFB] text-[#3484B5]",
    badge: "bg-[#E2F0FA] text-[#3484B5]",
    button: "bg-[#3484B5] hover:bg-[#2A6E98]",
    progress: "bg-[#3484B5]",
  },
};

function Quiz() {
  const [quizScores, setQuizScores] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadScores = () => {
      setQuizScores(getQuizScores());
    };

    loadScores();

    // Refresh scores when the browser tab regains focus
    window.addEventListener("focus", loadScores);

    return () => {
      window.removeEventListener("focus", loadScores);
    };
  }, [location.key]);

  // Match each quiz to its saved localStorage record
  const quizzesWithStats = quizTypes.map((quiz) => {
    const savedScore = quizScores.find((item) => item.quizType === quiz.title);

    return {
      ...quiz,
      savedScore: savedScore || null,
      hasScore: Boolean(savedScore),
      latestScore: savedScore ? Number(savedScore.percentage) || 0 : 0,
      correctAnswers: savedScore ? Number(savedScore.score) || 0 : 0,
      totalQuestions: savedScore
        ? Number(savedScore.totalQuestions) || quiz.questions
        : quiz.questions,
    };
  });

  // Overall progress based on completed quiz types
  const completedQuizzes = quizzesWithStats.filter((quiz) => quiz.hasScore);

  const overallProgress = Math.round(
    (completedQuizzes.length / quizTypes.length) * 100,
  );

  // Average of the latest percentages for completed quiz types
  const averageScore = completedQuizzes.length
    ? Math.round(
        completedQuizzes.reduce((total, quiz) => total + quiz.latestScore, 0) /
          completedQuizzes.length,
      )
    : 0;

  return (
    <>
      <div className="min-h-screen bg-[#EAF7EE] px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E9B59] text-white shadow-sm">
                <Brain size={21} strokeWidth={2.2} />
              </div>

              <span className="text-sm font-bold tracking-wide text-[#2E9B59]">
                QUIZ CENTER
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#244C32]">
              Test Your Knowledge 🌱
            </h1>

            <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#66806E]">
              Choose a quiz type and see how much you have learned about
              planting, plants, and caring for the environment.
            </p>
          </div>

          {/* Overall Stats */}
          <div className="mb-7 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-[#E8EFEA] px-5 py-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-[#2E9B59]" />

                <h2 className="text-sm font-extrabold text-[#294735]">
                  Your Quiz Performance
                </h2>
              </div>

              <p className="mt-1 text-xs text-[#829087]">
                Your latest saved results across all quiz types.
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-[#E8EFEA]">
              {/* Multiple Choice */}
              <div className="px-2 py-5 text-center sm:px-5">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E3F5E8] text-[#2E9B59]">
                  <ListChecks size={18} />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                  Multiple Choice
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#294735]">
                  {quizzesWithStats[0].hasScore
                    ? `${quizzesWithStats[0].latestScore}%`
                    : "—"}
                </p>

                <p className="mt-0.5 text-[10px] text-[#8A968E]">
                  {quizzesWithStats[0].hasScore
                    ? "Latest Score"
                    : "Not taken yet"}
                </p>
              </div>

              {/* Fill in the Blanks */}
              <div className="px-2 py-5 text-center sm:px-5">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E7DA] text-[#9A6842]">
                  <PenLine size={18} />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                  Fill in Blanks
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#294735]">
                  {quizzesWithStats[1].hasScore
                    ? `${quizzesWithStats[1].latestScore}%`
                    : "—"}
                </p>

                <p className="mt-0.5 text-[10px] text-[#8A968E]">
                  {quizzesWithStats[1].hasScore
                    ? "Latest Score"
                    : "Not taken yet"}
                </p>
              </div>

              {/* True or False */}
              <div className="px-2 py-5 text-center sm:px-5">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2F0FA] text-[#3484B5]">
                  <CircleCheck size={18} />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                  True or False
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#294735]">
                  {quizzesWithStats[2].hasScore
                    ? `${quizzesWithStats[2].latestScore}%`
                    : "—"}
                </p>

                <p className="mt-0.5 text-[10px] text-[#8A968E]">
                  {quizzesWithStats[2].hasScore
                    ? "Latest Score"
                    : "Not taken yet"}
                </p>
              </div>
            </div>

            {/* Overall progress */}
            <div className="border-t border-[#E8EFEA] px-5 py-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#65766A]">
                  Quiz Completion
                </span>

                <span className="text-xs font-extrabold text-[#2E9B59]">
                  {completedQuizzes.length}/{quizTypes.length} quizzes ·{" "}
                  {overallProgress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#E8EFEA]">
                <div
                  className="h-full rounded-full bg-[#2E9B59] transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>

              <p className="mt-2 text-[10px] text-[#829087]">
                {completedQuizzes.length > 0
                  ? `Average latest score: ${averageScore}%`
                  : "Complete a quiz to start tracking your performance."}
              </p>
            </div>
          </div>

          {/* Choose Quiz */}
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-[#294735]">
              Choose a Quiz
            </h2>

            <p className="mt-1 text-xs text-[#7A897F]">
              Pick a quiz type and show what you know.
            </p>
          </div>

          {/* Quiz Cards */}
          <div className="space-y-4">
            {quizzesWithStats.map((quiz) => {
              const Icon = quiz.icon;
              const styles = colorStyles[quiz.color];

              return (
                <div
                  key={quiz.id}
                  className={`group overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
                    >
                      <Icon size={27} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-extrabold text-[#294735]">
                            {quiz.title}
                          </h3>

                          <span
                            className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
                          >
                            {quiz.questions} Questions
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-[#78857D]">
                          {quiz.hasScore ? (
                            <>
                              <Trophy size={14} />
                              Latest: {quiz.latestScore}%
                            </>
                          ) : (
                            <>
                              <Target size={14} />
                              Not taken
                            </>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-5 text-[#6B7D70]">
                        {quiz.description}
                      </p>

                      {/* Saved result */}
                      {quiz.hasScore && (
                        <div className="mt-4">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#8A968E]">
                              Latest Result
                            </span>

                            <span className="text-[10px] font-bold text-[#65766A]">
                              {quiz.correctAnswers}/{quiz.totalQuestions}{" "}
                              correct
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/80">
                            <div
                              className={`h-full rounded-full ${styles.progress}`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(0, quiz.latestScore),
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Start Button */}
                      <Link
                        to={quiz.link}
                        className={`mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition ${styles.button}`}
                      >
                        {quiz.hasScore ? "Try Again" : "Start Quiz"}
                        <ChevronRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Encouragement */}
          <div className="mt-7 rounded-3xl border border-[#D5E8D9] bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E3F5E8] text-[#2E9B59]">
              <Trophy size={21} />
            </div>

            <h3 className="mt-3 text-base font-extrabold text-[#294735]">
              Keep learning, keep growing! 🌱
            </h3>

            <p className="mx-auto mt-1 max-w-[500px] text-xs leading-5 text-[#748278]">
              Try different quiz types to strengthen your knowledge and improve
              your scores.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default Quiz;
