import React from "react";
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
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
const quizTypes = [
  {
    id: 1,
    title: "Multiple Choice",
    description:
      "Choose the best answer from the choices given. Test what you know about plants and planting.",
    icon: ListChecks,
    color: "green",
    questions: 10,
    bestScore: 90,
    attempts: 4,
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
    bestScore: 80,
    attempts: 3,
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
    bestScore: 100,
    attempts: 5,
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
            Choose a quiz type and see how much you have learned about planting,
            plants, and caring for the environment.
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
              Keep practicing to improve your scores!
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-[#E8EFEA]">
            {/* Multiple Choice */}
            <div className="px-3 py-5 text-center sm:px-5">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E3F5E8] text-[#2E9B59]">
                <ListChecks size={18} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                Multiple Choice
              </p>

              <p className="mt-1 text-2xl font-extrabold text-[#294735]">90%</p>

              <p className="mt-0.5 text-[10px] text-[#8A968E]">Best Score</p>
            </div>

            {/* Fill in the Blanks */}
            <div className="px-3 py-5 text-center sm:px-5">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E7DA] text-[#9A6842]">
                <PenLine size={18} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                Fill in Blanks
              </p>

              <p className="mt-1 text-2xl font-extrabold text-[#294735]">80%</p>

              <p className="mt-0.5 text-[10px] text-[#8A968E]">Best Score</p>
            </div>

            {/* True or False */}
            <div className="px-3 py-5 text-center sm:px-5">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2F0FA] text-[#3484B5]">
                <CircleCheck size={18} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
                True or False
              </p>

              <p className="mt-1 text-2xl font-extrabold text-[#294735]">
                100%
              </p>

              <p className="mt-0.5 text-[10px] text-[#8A968E]">Best Score</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="border-t border-[#E8EFEA] px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-[#65766A]">
                Overall Progress
              </span>

              <span className="text-xs font-extrabold text-[#2E9B59]">90%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E8EFEA]">
              <div className="h-full w-[90%] rounded-full bg-[#2E9B59]" />
            </div>
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
          {quizTypes.map((quiz) => {
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
                        <Trophy size={14} />
                        Best: {quiz.bestScore}%
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-5 text-[#6B7D70]">
                      {quiz.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Target size={14} className="text-[#839188]" />

                        <span className="text-[11px] font-medium text-[#748078]">
                          {quiz.attempts} attempts
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-[#2E9B59]" />

                        <span className="text-[11px] font-medium text-[#748078]">
                          Best: {quiz.bestScore}%
                        </span>
                      </div>
                    </div>

                    {/* Score Progress */}
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#8A968E]">
                          Personal Best
                        </span>

                        <span className="text-[10px] font-bold text-[#65766A]">
                          {quiz.bestScore} / 100
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/80">
                        <div
                          className={`h-full rounded-full ${styles.progress}`}
                          style={{
                            width: `${quiz.bestScore}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Start Button */}
                    <Link
                      to={quiz.link}
                      type="button"
                      className={`mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition ${styles.button}`}
                    >
                      Start Quiz
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
    <BottomNav/>
    </>
  );
}

export default Quiz;
