import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Sprout,
  ClipboardCheck,
  ArrowLeft,
  BookOpen,
  Leaf,
  Hand,
  ShieldCheck,
} from "lucide-react";
import api from "../../assets/api";

// ======================================================
// QUIZ DATA — HANDLING OF SEEDLINGS
// 10 Multiple Choice
// 10 Enumeration
// 10 Fill in the Blanks
// ======================================================

export const handlingOfSeedlingsQuestions = [
  // ====================================================
  // MULTIPLE CHOICE — 10 QUESTIONS
  // ====================================================
  {
    id: 1,
    type: "multiple-choice",
    question: "Why should seedlings be handled carefully?",
    options: [
      "They are young and delicate plants",
      "They do not need roots to survive",
      "Their stems become stronger when squeezed",
      "They should be moved as quickly as possible",
    ],
    answer: "They are young and delicate plants",
    explanation:
      "Seedlings are young and delicate, so careful handling helps prevent damage to their stems and roots.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "How should you hold a seedling when handling it?",
    options: [
      "Tightly, to keep it from moving",
      "Gently, to avoid damaging it",
      "By pulling its stem upward",
      "By squeezing its roots",
    ],
    answer: "Gently, to avoid damaging it",
    explanation:
      "The lesson emphasizes holding seedlings gently and avoiding unnecessary pressure that could cause damage.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Which action should you avoid when handling a seedling?",
    options: [
      "Moving it carefully",
      "Protecting its roots",
      "Pulling or squeezing its stem",
      "Carrying it to the planting hole",
    ],
    answer: "Pulling or squeezing its stem",
    explanation:
      "Pulling or squeezing the stem can damage the young plant. Handle the seedling gently instead.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Which parts of the seedling does the lesson say must be protected?",
    options: ["Leaves and flowers", "Stem and roots", "Fruits and branches", "Buds and seeds"],
    answer: "Stem and roots",
    explanation:
      "The lesson specifically instructs learners to avoid damaging the stem and to keep the roots safe.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What should you do while removing a seedling from its original location?",
    options: [
      "Pull it quickly by the stem",
      "Squeeze the stem to get a firm grip",
      "Keep the roots safe",
      "Leave the roots exposed to damage",
    ],
    answer: "Keep the roots safe",
    explanation:
      "The roots should be protected while the seedling is being removed and carried.",
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Where should the seedling be carried after it is removed?",
    options: [
      "To the planting hole",
      "To a storage cabinet",
      "Back to the same place immediately",
      "To an unrelated planting area",
    ],
    answer: "To the planting hole",
    explanation:
      "The student action in the lesson is to carefully carry the seedling from its original location to the planting hole.",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "What can happen if the stem is squeezed during handling?",
    options: [
      "The seedling is guaranteed to grow faster",
      "The young plant can be damaged",
      "The roots become unnecessary",
      "The seedling no longer needs care",
    ],
    answer: "The young plant can be damaged",
    explanation:
      "Squeezing the stem places unnecessary pressure on a delicate part of the plant and can cause damage.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "How should you move a seedling from one place to another?",
    options: [
      "Carefully, while protecting its stem and roots",
      "By dragging it across the ground",
      "By holding and pulling its stem",
      "By squeezing the plant firmly",
    ],
    answer: "Carefully, while protecting its stem and roots",
    explanation:
      "Careful movement protects the delicate stem and roots while the seedling is transferred.",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "What is one benefit of careful seedling handling?",
    options: [
      "It removes the need for planting",
      "It increases the seedling's chance of surviving after planting",
      "It prevents the seedling from developing roots",
      "It makes pulling the stem safe",
    ],
    answer: "It increases the seedling's chance of surviving after planting",
    explanation:
      "The lesson explains that careful handling helps the seedling remain healthy and increases its chance of survival after planting.",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "Which sequence best describes the handling practice taught in the lesson?",
    options: [
      "Pull the stem, squeeze the roots, and move quickly",
      "Remove carefully, protect the roots, and carry to the planting hole",
      "Squeeze the seedling, expose the roots, and leave it behind",
      "Drag the seedling and place it wherever convenient",
    ],
    answer:
      "Remove carefully, protect the roots, and carry to the planting hole",
    explanation:
      "The lesson teaches learners to remove the seedling carefully, protect its roots, and carry it to the planting hole without damaging the stem or roots.",
  },

  // ====================================================
  // ENUMERATION — 10 QUESTIONS
  // Answers are checked without requiring exact order.
  // ====================================================
  {
    id: 11,
    type: "enumeration",
    question:
      "Name the two important plant parts that must be protected when handling a seedling.",
    answer: ["stem", "roots"],
    explanation:
      "The stem and roots must be protected because the lesson warns against damaging either part.",
  },
  {
    id: 12,
    type: "enumeration",
    question:
      "Enumerate two actions you should avoid when handling a seedling.",
    answer: ["pulling the stem", "squeezing the stem"],
    explanation:
      "The lesson specifically says to avoid pulling and squeezing the stem.",
  },
  {
    id: 13,
    type: "enumeration",
    question:
      "Give three practices that demonstrate careful seedling handling.",
    answer: ["hold gently", "protect the stem", "protect the roots"],
    explanation:
      "Careful handling means holding the seedling gently and protecting both its stem and roots.",
  },
  {
    id: 14,
    type: "enumeration",
    question:
      "Name two places or points involved in transferring a seedling as described in the lesson.",
    answer: ["original location", "planting hole"],
    explanation:
      "The seedling is moved from its original location to the planting hole.",
  },
  {
    id: 15,
    type: "enumeration",
    question:
      "List three actions involved in safely moving a seedling.",
    answer: ["remove carefully", "carry carefully", "protect the roots"],
    explanation:
      "The lesson teaches learners to remove the seedling carefully, protect its roots, and carry it carefully to the planting hole.",
  },
  {
    id: 16,
    type: "enumeration",
    question:
      "Give two examples of rough handling that can harm a seedling.",
    answer: ["pulling", "squeezing"],
    explanation:
      "Pulling and squeezing are specifically identified as actions to avoid because they can damage the stem and roots.",
  },
  {
    id: 17,
    type: "enumeration",
    question:
      "Name three qualities or actions emphasized by the lesson when handling seedlings.",
    answer: ["gentle", "careful", "protective"],
    explanation:
      "The lesson emphasizes gentle handling, careful movement, and protecting the seedling from damage.",
  },
  {
    id: 18,
    type: "enumeration",
    question:
      "Enumerate the two delicate plant parts mentioned in the instruction not to damage the seedling.",
    answer: ["stem", "roots"],
    explanation:
      "Learners are instructed to avoid damaging the stem and roots while handling the seedling.",
  },
  {
    id: 19,
    type: "enumeration",
    question:
      "Give three outcomes or purposes of handling seedlings carefully, based on the lesson.",
    answer: [
      "prevent damage",
      "remain healthy",
      "increase chance of survival",
    ],
    explanation:
      "Careful handling prevents damage, helps the seedling remain healthy, and increases its chance of surviving after planting.",
  },
  {
    id: 20,
    type: "enumeration",
    question:
      "List four important reminders when transferring a seedling.",
    answer: [
      "hold gently",
      "avoid pulling the stem",
      "protect the roots",
      "carry to the planting hole carefully",
    ],
    explanation:
      "These reminders summarize the lesson: hold gently, do not pull or squeeze the stem, protect the roots, and carry the seedling carefully to the planting hole.",
  },

  // ====================================================
  // FILL IN THE BLANKS — 10 QUESTIONS
  // ====================================================
  {
    id: 21,
    type: "fill-blank",
    question: "Seedlings are young and ______ plants.",
    answer: ["delicate"],
    explanation:
      "Seedlings are delicate because they are young plants that can be damaged by rough handling.",
  },
  {
    id: 22,
    type: "fill-blank",
    question: "Always hold the seedling ______ to avoid causing damage.",
    answer: ["gently", "carefully"],
    explanation:
      "The lesson instructs learners to hold seedlings gently and avoid unnecessary pressure.",
  },
  {
    id: 23,
    type: "fill-blank",
    question: "Avoid pulling or squeezing the ______ of a seedling.",
    answer: ["stem"],
    explanation:
      "Pulling or squeezing the stem can damage the young plant.",
  },
  {
    id: 24,
    type: "fill-blank",
    question: "When removing and carrying a seedling, keep its ______ safe.",
    answer: ["roots", "root"],
    explanation:
      "The roots must be protected while the seedling is removed and carried.",
  },
  {
    id: 25,
    type: "fill-blank",
    question: "Careful handling helps the seedling remain ______.",
    answer: ["healthy"],
    explanation:
      "Careful handling helps prevent damage and allows the seedling to remain healthy.",
  },
  {
    id: 26,
    type: "fill-blank",
    question: "Move the seedling from its original location to the planting ______.",
    answer: ["hole"],
    explanation:
      "The lesson says to carry the seedling carefully from its original location to the planting hole.",
  },
  {
    id: 27,
    type: "fill-blank",
    question: "Do not ______ the stem when handling a seedling.",
    answer: ["pull", "squeeze"],
    explanation:
      "Pulling or squeezing the stem can damage the young plant.",
  },
  {
    id: 28,
    type: "fill-blank",
    question: "Careful handling increases the seedling's chance of ______ after planting.",
    answer: ["surviving", "survival"],
    explanation:
      "The lesson explains that careful handling increases the seedling's chance of surviving after planting.",
  },
  {
    id: 29,
    type: "fill-blank",
    question: "Protect both the stem and the ______ when moving a seedling.",
    answer: ["roots", "root"],
    explanation:
      "Both the stem and roots are identified in the lesson as parts that should not be damaged.",
  },
  {
    id: 30,
    type: "fill-blank",
    question: "The student should carry the seedling ______ to the planting hole.",
    answer: ["carefully", "gently"],
    explanation:
      "The lesson's student action is to carefully remove and carry the seedling to the planting hole without damaging its stem or roots.",
  },
];

// ======================================================
// HELPER FUNCTIONS
// ======================================================

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");

const normalizeList = (value) =>
  String(value ?? "")
    .split(/[,\n;]/)
    .map(normalize)
    .filter(Boolean)
    .sort();

const typeLabels = {
  "multiple-choice": "Multiple Choice",
  enumeration: "Enumeration",
  "fill-blank": "Fill in the Blanks",
};

const typeColors = {
  "multiple-choice": "bg-blue-100 text-blue-700",
  enumeration: "bg-purple-100 text-purple-700",
  "fill-blank": "bg-amber-100 text-amber-700",
};

// ======================================================
// RESULT FEEDBACK
// ======================================================

const getComment = (percentage) => {
  if (percentage === 100) {
    return {
      title: "Perfect Score!",
      message:
        "Outstanding work! You have mastered this lesson. Keep growing your knowledge!",
      emoji: "🏆",
    };
  }

  if (percentage >= 90) {
    return {
      title: "Excellent Work!",
      message:
        "Amazing performance! You understand the lesson very well. Keep it up!",
      emoji: "🌟",
    };
  }

  if (percentage >= 80) {
    return {
      title: "Great Job!",
      message:
        "You have a strong understanding of the lesson. Review a few details to reach perfection!",
      emoji: "🎉",
    };
  }

  if (percentage >= 70) {
    return {
      title: "Good Effort!",
      message:
        "You're doing well! Review the lesson again to strengthen your understanding.",
      emoji: "🌱",
    };
  }

  if (percentage >= 50) {
    return {
      title: "Keep Practicing!",
      message:
        "You are making progress. Revisit the important concepts and try again!",
      emoji: "💪",
    };
  }

  return {
    title: "Don't Give Up!",
    message:
      "Every attempt is a chance to learn. Review the lesson carefully and give it another try!",
    emoji: "📚",
  };
};

// ======================================================
// ANSWER VALIDATION
// ======================================================

const checkAnswer = (question, userAnswer) => {
  if (question.type === "multiple-choice") {
    return normalize(userAnswer) === normalize(question.answer);
  }

  if (question.type === "fill-blank") {
    return question.answer.map(normalize).includes(normalize(userAnswer));
  }

  if (question.type === "enumeration") {
    const expected = question.answer.map(normalize).sort();
    const actual = normalizeList(userAnswer);

    return (
      expected.length === actual.length &&
      expected.every((item, index) => item === actual[index])
    );
  }

  return false;
};

// ======================================================
// DISPLAY ANSWERS
// ======================================================

const formatAnswer = (question, answer) => {
  if (
    answer === undefined ||
    answer === null ||
    String(answer).trim() === ""
  ) {
    return "No answer provided";
  }

  if (question.type === "enumeration") {
    return String(answer)
      .split(/[,\n;]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }

  return String(answer);
};

const formatCorrectAnswer = (question) => {
  if (question.type === "enumeration") {
    return question.answer.join(", ");
  }

  if (question.type === "fill-blank") {
    return question.answer.join(" / ");
  }

  return question.answer;
};

// ======================================================
// QUESTION REVIEW
// ======================================================

function QuestionReview({ questions, answers }) {
  return (
    <section className="mt-10 space-y-6 animate-[fadeIn_.6s_ease-out]">
      <div className="rounded-3xl bg-[#244C32] p-6 text-white sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <BookOpen size={25} />
          </div>

          <div>
            <h2 className="text-xl font-black sm:text-2xl">
              Review Your Answers
            </h2>
            <p className="mt-1 text-xs font-medium text-white/70">
              Review every question, your answer, and the correct explanation.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold">
          <span className="rounded-full bg-white/15 px-4 py-2">
            {questions.length} Questions
          </span>
          <span className="rounded-full bg-green-400/20 px-4 py-2 text-green-200">
            Correct answers highlighted
          </span>
        </div>
      </div>

      {questions.map((question, index) => {
        const correct = checkAnswer(question, answers[question.id]);
        const userAnswer = formatAnswer(question, answers[question.id]);

        return (
          <article
            key={question.id}
            className={`overflow-hidden rounded-3xl border-2 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
              correct ? "border-green-100" : "border-red-100"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7EE] text-sm font-black text-[#2E9B59]">
                  {index + 1}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    typeColors[question.type] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {typeLabels[question.type] || question.type}
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold ${
                  correct
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {correct ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                {correct ? "Correct" : "Incorrect"}
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <h3 className="text-base font-extrabold leading-relaxed text-[#294735] sm:text-lg">
                {question.question}
              </h3>

              {question.type === "multiple-choice" && (
                <div className="mt-5 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected =
                      normalize(answers[question.id]) === normalize(option);
                    const isAnswer =
                      normalize(question.answer) === normalize(option);

                    return (
                      <div
                        key={optionIndex}
                        className={`flex items-center gap-3 rounded-xl border p-3 ${
                          isAnswer
                            ? "border-green-300 bg-green-50"
                            : isSelected
                              ? "border-red-300 bg-red-50"
                              : "border-gray-100 bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                            isAnswer
                              ? "bg-green-500 text-white"
                              : isSelected
                                ? "bg-red-400 text-white"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </span>

                        <span
                          className={`flex-1 text-sm font-semibold ${
                            isAnswer
                              ? "text-green-800"
                              : isSelected
                                ? "text-red-700"
                                : "text-gray-600"
                          }`}
                        >
                          {option}
                        </span>

                        {isAnswer && (
                          <CheckCircle2
                            size={19}
                            className="shrink-0 text-green-600"
                          />
                        )}

                        {!isAnswer && isSelected && (
                          <XCircle
                            size={19}
                            className="shrink-0 text-red-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div
                  className={`rounded-2xl border p-4 ${
                    correct
                      ? "border-green-100 bg-green-50"
                      : "border-red-100 bg-red-50"
                  }`}
                >
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                    <ClipboardCheck size={14} />
                    Your Answer
                  </p>
                  <p
                    className={`break-words text-sm font-bold leading-relaxed ${
                      correct ? "text-green-800" : "text-red-700"
                    }`}
                  >
                    {userAnswer}
                  </p>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-green-700">
                    <CheckCircle2 size={14} />
                    Correct Answer
                  </p>
                  <p className="break-words text-sm font-bold leading-relaxed text-green-800">
                    {formatCorrectAnswer(question)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <BookOpen size={15} />
                  </div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-blue-800">
                    Explanation
                  </p>
                </div>
                <p className="text-sm leading-7 text-blue-900/80">
                  {question.explanation}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

// ======================================================
// MAIN QUIZ COMPONENT
// ======================================================

export default function HandlingOfSeedlingsQuiz({
  title = "Handling of Seedlings",
  questions = handlingOfSeedlingsQuestions,
  onComplete,
  lessonPath = "/handling-of-seedlings",
}) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentQuestion = questions[currentIndex];

  // ====================================================
  // SCORE
  // ====================================================

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      return total + (checkAnswer(question, answers[question.id]) ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const comment = getComment(percentage);

  const answeredCount = questions.filter((question) => {
    return String(answers[question.id] ?? "").trim().length > 0;
  }).length;

  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  // ====================================================
  // SET ANSWER
  // ====================================================

  const setAnswer = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  // ====================================================
  // SUBMIT QUIZ
  // ====================================================

  const handleSubmit = async () => {
    if (submitting) return;

    const allAnswered = questions.every((question) => {
      return String(answers[question.id] ?? "").trim().length > 0;
    });

    if (!allAnswered) {
      window.alert("Please answer all questions before submitting.");
      return;
    }

    let userInfo;

    try {
      userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch {
      setSubmitError(
        "Unable to read your account information. Please log in again."
      );
      return;
    }

    const userId = userInfo?.id;

    if (!userId) {
      setSubmitError("User ID not found. Please log in again.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const finalScore = {
      title,
      score: `${score}/${questions.length} (${percentage}%)`,
      status: percentage >= 75 ? "Passed" : "Needs Improvement",
      comment: comment.message,
    };

    try {
      const response = await api.post(
        `/api/quiz-scores/${userId}/`,
        finalScore
      );

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);

        onComplete?.({
          title,
          score,
          total: questions.length,
          percentage,
          status: finalScore.status,
          comment: comment.message,
          saved: true,
          data: response.data?.data,
        });

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        setSubmitError(
          "Your quiz result was not saved. Please try again."
        );
      }
    } catch (error) {
      console.error("Quiz submission failed:", error);

      setSubmitError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Unable to submit your quiz. Please check your internet connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ====================================================
  // BACK TO LESSON
  // ====================================================

  const handleBackToLesson = () => {
    navigate(lessonPath || -1);
  };

  // ====================================================
  // EMPTY QUESTIONS
  // ====================================================

  if (!questions.length) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <Sprout className="mx-auto mb-3 text-green-500" size={36} />
        <p className="font-bold text-gray-700">
          No quiz questions are available.
        </p>
      </div>
    );
  }

  // ====================================================
  // RESULTS + COMPLETE QUESTION REVIEW
  // ====================================================

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-4xl pb-12">
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes pop {
            0% {
              transform: scale(.4) rotate(-15deg);
              opacity: 0;
            }
            70% {
              transform: scale(1.15) rotate(5deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(0);
            }
          }

          @keyframes fall {
            0% {
              transform: translateY(-15vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }

          .quiz-confetti {
            position: absolute;
            top: -20px;
            width: 9px;
            height: 14px;
            border-radius: 3px;
            animation: fall 3.5s linear forwards;
            pointer-events: none;
          }
        `}</style>

        <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-xl sm:p-10 animate-[fadeIn_.5s_ease-out]">
          {percentage >= 70 &&
            Array.from({ length: 45 }).map((_, index) => (
              <span
                key={index}
                className="quiz-confetti"
                style={{
                  left: `${(index * 37) % 100}%`,
                  backgroundColor: [
                    "#2E9B59",
                    "#F5C542",
                    "#60A5FA",
                    "#F472B6",
                    "#A78BFA",
                  ][index % 5],
                  animationDelay: `${(index % 12) * 0.12}s`,
                }}
              />
            ))}

          <div className="relative z-10 text-center">
            <div
              className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full ${
                percentage >= 70
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-100 text-green-600"
              } animate-[pop_.7s_ease-out]`}
            >
              {percentage >= 70 ? (
                <Trophy size={50} />
              ) : (
                <Sprout size={50} />
              )}
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-green-700">
              <Sparkles size={14} />
              Quiz Completed
            </span>

            <h2 className="mt-5 text-3xl font-black text-[#244C32] sm:text-4xl">
              {comment.emoji} {comment.title}
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              {comment.message}
            </p>

            {/* SCORE */}
            <div className="mx-auto mt-8 max-w-md rounded-3xl bg-[#EAF7EE] p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-green-700">
                Your Final Score
              </p>

              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-[#2E9B59]">
                  {score}
                </span>
                <span className="text-2xl font-bold text-green-700/50">
                  / {questions.length}
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-green-200">
                <div
                  className="h-full rounded-full bg-[#2E9B59] transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-3 text-2xl font-black text-[#244C32]">
                {percentage}%
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-3">
                  <CheckCircle2
                    className="mx-auto text-green-500"
                    size={21}
                  />
                  <p className="mt-1 text-xl font-black text-green-700">
                    {score}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">
                    Correct
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3">
                  <XCircle className="mx-auto text-red-400" size={21} />
                  <p className="mt-1 text-xl font-black text-red-500">
                    {questions.length - score}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">
                    Incorrect
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4">
                <div className="flex items-center justify-center gap-2">
                  <Award size={18} className="text-yellow-500" />
                  <span className="text-sm font-extrabold text-[#294735]">
                    {percentage >= 75 ? "Passed" : "Needs Improvement"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 text-sm font-bold text-green-700">
              <BookOpen size={18} />
              Scroll down to review all your answers.
            </div>
          </div>
        </div>

        {/* COMPLETE QUESTION REVIEW */}
        <QuestionReview questions={questions} answers={answers} />

        {/* BACK TO LESSON — ALWAYS LAST */}
        <div className="mt-10 rounded-3xl border border-green-100 bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EE] text-[#2E9B59]">
            <Leaf size={29} />
          </div>

          <h3 className="text-xl font-black text-[#244C32]">
            Great Job Completing the Quiz!
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            You have finished reviewing all your answers. Continue learning
            and apply what you have learned in your next lesson.
          </p>

          <button
            type="button"
            onClick={handleBackToLesson}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2E9B59] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-[#247D46] active:scale-95 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Back to Lesson
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // ACTIVE QUIZ
  // ====================================================

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#DCEBDD] bg-white shadow-xl">
      <style>{`
        @keyframes questionEnter {
          from {
            opacity: 0;
            transform: translateX(18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .question-enter {
          animation: questionEnter .35s ease-out;
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-[#2E9B59] px-5 py-6 text-white sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <ClipboardCheck size={23} />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/70">
                Test Your Knowledge
              </p>
              <h2 className="text-lg font-black">{title}</h2>
            </div>
          </div>

          <div className="rounded-xl bg-white/15 px-3 py-2 text-center">
            <p className="text-[10px] font-bold text-white/70">QUESTION</p>
            <p className="text-lg font-black">
              {currentIndex + 1}/{questions.length}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/80">
            <span>Quiz Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUIZ BODY */}
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
              typeColors[currentQuestion.type] || "bg-gray-100 text-gray-700"
            }`}
          >
            {typeLabels[currentQuestion.type] || currentQuestion.type}
          </span>

          <span className="text-xs font-bold text-gray-400">
            {answeredCount} of {questions.length} answered
          </span>
        </div>

        <div key={currentQuestion.id} className="question-enter">
          <h3 className="text-xl font-extrabold leading-relaxed text-[#294735] sm:text-2xl">
            {currentQuestion.question}
          </h3>

          {/* MULTIPLE CHOICE */}
          {currentQuestion.type === "multiple-choice" && (
            <div className="mt-7 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected = answers[currentQuestion.id] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option)}
                    className={`group flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      selected
                        ? "border-[#2E9B59] bg-[#EAF7EE] shadow-sm"
                        : "border-gray-100 bg-white hover:border-green-200"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black transition ${
                        selected
                          ? "bg-[#2E9B59] text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span
                      className={`flex-1 text-sm font-bold ${
                        selected ? "text-green-800" : "text-gray-600"
                      }`}
                    >
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-[#2E9B59]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ENUMERATION */}
          {currentQuestion.type === "enumeration" && (
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-purple-600">
                <ClipboardCheck size={16} />
                Separate each answer with a comma or a new line.
              </div>

              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(event) => setAnswer(event.target.value)}
                rows={5}
                placeholder={"First answer\nSecond answer\nThird answer"}
                className="w-full resize-none rounded-2xl border-2 border-purple-100 bg-purple-50/40 p-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Enter all the required items. The order of your answers does
                not matter.
              </p>
            </div>
          )}

          {/* FILL IN THE BLANKS */}
          {currentQuestion.type === "fill-blank" && (
            <div className="mt-7">
              <label className="mb-3 block text-xs font-bold text-amber-700">
                Your Answer
              </label>

              <input
                type="text"
                value={answers[currentQuestion.id] || ""}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    currentIndex < questions.length - 1
                  ) {
                    setCurrentIndex((previous) => previous + 1);
                  }
                }}
                placeholder="Type your answer here..."
                className="w-full rounded-2xl border-2 border-amber-100 bg-amber-50/40 p-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
              />
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="mt-9 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((previous) => previous - 1)
            }
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-extrabold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={17} />
            Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((previous) => previous + 1)
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#2E9B59] px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-green-100 transition hover:-translate-y-0.5 hover:bg-[#247D46] active:scale-95"
            >
              Next Question
              <ChevronRight size={17} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={answeredCount !== questions.length || submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2E9B59] px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-green-100 transition hover:-translate-y-0.5 hover:bg-[#247D46] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving Result...
                </>
              ) : (
                <>
                  <Trophy size={17} />
                  Submit Quiz
                </>
              )}
            </button>
          )}
        </div>

        {/* SUBMISSION ERROR */}
        {submitError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            <div className="flex items-center gap-2">
              <XCircle size={18} />
              <span>{submitError}</span>
            </div>
          </div>
        )}

        {answeredCount !== questions.length &&
          currentIndex === questions.length - 1 && (
            <p className="mt-3 text-right text-xs font-semibold text-amber-600">
              Answer all questions to enable submission.
            </p>
          )}
      </div>
    </div>
  );
}