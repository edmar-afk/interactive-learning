import React, { useEffect, useState } from "react";
import {
  Brain,
  ArrowRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  RotateCcw,
  ListChecks,
  PenLine,
  CircleCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getQuizScores } from "../../utils/quizStorage";

const quizTypes = [
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    description:
      "Choose the best answer and test your knowledge of plants and planting.",
    quizType: "Multiple Choice",
    link: "/multiple-choice",
    icon: ListChecks,
  },
  {
    id: "fill-in-the-blanks",
    title: "Fill in the Blanks",
    description:
      "Complete each sentence with the correct word to show what you have learned.",
    quizType: "Fill in the Blanks",
    link: "/fill-in-the-blanks",
    icon: PenLine,
  },
  {
    id: "true-or-false",
    title: "True or False",
    description:
      "Read each statement carefully and decide whether it is true or false.",
    quizType: "True or False",
    link: "/true-or-false",
    icon: CircleCheck,
  },
];

function QuizCard() {
  const [quizScores, setQuizScores] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadScores = () => {
      setQuizScores(getQuizScores());
    };

    loadScores();

    window.addEventListener("focus", loadScores);

    return () => {
      window.removeEventListener("focus", loadScores);
    };
  }, [location.key]);

  return (
    <div className="space-y-4">
      {quizTypes.map((quiz) => {
        const Icon = quiz.icon;

        const savedScore = quizScores.find(
          (item) => item.quizType === quiz.quizType,
        );

        const hasScore = Boolean(savedScore);

        const percentage = savedScore ? Number(savedScore.percentage) || 0 : 0;

        return (
          <div
            key={quiz.id}
            className="
              relative overflow-hidden
              border border-[#E7DCCB] bg-[#F5EFE5]
              px-5 py-5 shadow-sm transition-shadow
              hover:shadow-md
            "
          >
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D2B991]/20" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3.5">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center
                    justify-center rounded-[16px]
                    border border-[#E9DDCA] bg-[#FFF9F0]
                  "
                >
                  <Icon size={22} strokeWidth={2} className="text-[#896D45]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#B08A51]" />

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#97784C]">
                      {hasScore ? "Your quiz progress" : "Quiz challenge"}
                    </p>
                  </div>

                  <h3 className="mt-1 text-[16px] font-extrabold tracking-tight text-[#493C29]">
                    {quiz.title}
                  </h3>
                </div>

                {hasScore && (
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#E3F5E8] px-2 py-1">
                    <CheckCircle2 size={11} className="text-[#2E9B59]" />
                    <span className="text-[9px] font-bold text-[#2E9B59]">
                      Completed
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-[11px] leading-[1.65] text-[#776A57]">
                {quiz.description}
              </p>

              {/* Score or first-time prompt */}
              {hasScore ? (
                <div className="mt-4 rounded-[17px] border border-[#E7DCCB] bg-[#FFF9F0]/90 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#97784C]">
                        Latest score
                      </p>

                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold tracking-tight text-[#2E9B59]">
                          {percentage}%
                        </span>

                        <span className="text-[11px] font-medium text-[#8A7A64]">
                          ({savedScore.score}/{savedScore.totalQuestions})
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E3F5E8]">
                      <Trophy size={21} className="text-[#2E9B59]" />
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8E0D3]">
                    <div
                      className="h-full rounded-full bg-[#2E9B59] transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, percentage))}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-[#776A57]">
                    Keep practicing to improve your score!
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-[#E7DCCB] bg-[#FFF9F0]/80 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EDE2CF]">
                    <Sparkles size={17} className="text-[#97784C]" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#493C29]">
                      Ready to test yourself?
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-[#776A57]">
                      Complete this quiz to see your score here.
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                to={quiz.link}
                className="
                  group mt-4 flex h-11 w-full items-center
                  justify-center gap-2 rounded-[13px]
                  bg-[#2E9B59] text-[12px] font-bold text-white
                  shadow-[0_5px_14px_rgba(46,155,89,0.16)]
                  transition-all hover:bg-[#25834B]
                  active:scale-[0.98]
                "
              >
                {hasScore ? (
                  <>
                    <RotateCcw size={14} strokeWidth={2.5} />
                    Try Again
                  </>
                ) : (
                  <>
                    Start Quiz
                    <ArrowRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuizCard;
