
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
  Droplets,
} from "lucide-react";
import api from "../../assets/api";

// ======================================================
// QUIZ DATA — WATERING TECHNIQUE
// 10 Multiple Choice, 10 Enumeration, 10 Fill in the Blanks
// ======================================================

export const wateringTechniqueQuestions = [
  // ====================================================
  // MULTIPLE CHOICE — 10 QUESTIONS
  // ====================================================

  {
    id: 1,
    type: "multiple-choice",
    question: "Why do newly planted seedlings need water?",
    options: [
      "To help them adjust to their new environment and grow",
      "To prevent their roots from developing",
      "To make their leaves change color",
      "To stop them from receiving sunlight",
    ],
    answer: "To help them adjust to their new environment and grow",
    explanation:
      "Newly planted seedlings need water to help them adjust to their new environment and support their growth.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Where should water be directed when watering a seedling?",
    options: [
      "Directly onto the leaves",
      "Around the base of the plant",
      "Only onto the stem",
      "Away from the plant",
    ],
    answer: "Around the base of the plant",
    explanation:
      "Water should be directed around the base of the plant so that moisture reaches the soil near the roots.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "What kind of water flow should be used when watering seedlings?",
    options: [
      "A strong and forceful stream",
      "A powerful spray that moves the soil",
      "A gentle flow of water",
      "An uncontrolled flow of water",
    ],
    answer: "A gentle flow of water",
    explanation:
      "A gentle flow prevents the soil from being disturbed and protects delicate newly planted seedlings.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "What is the main goal of proper watering?",
    options: [
      "To flood the entire planting area",
      "To keep the soil completely dry",
      "To maintain proper soil moisture",
      "To water only the leaves",
    ],
    answer: "To maintain proper soil moisture",
    explanation:
      "Proper watering provides enough moisture for the seedling without causing excessively wet or dry soil conditions.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What may happen when a seedling receives too much water?",
    options: [
      "The soil may become waterlogged",
      "The plant will never need sunlight",
      "The roots will grow without oxygen",
      "The seedling will automatically grow faster",
    ],
    answer: "The soil may become waterlogged",
    explanation:
      "Overwatering can cause waterlogged soil, which limits oxygen available to roots and can damage the plant.",
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Why should you avoid using a strong stream of water?",
    options: [
      "It makes the soil more nutritious",
      "It can disturb the soil and damage the seedling",
      "It prevents the roots from absorbing water",
      "It makes watering unnecessary",
    ],
    answer: "It can disturb the soil and damage the seedling",
    explanation:
      "A strong stream can wash away soil around the seedling and physically damage its delicate parts.",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Which part of the plant should receive attention when watering?",
    options: [
      "The flowers only",
      "The upper leaves only",
      "The soil around the plant's base",
      "The top of the stem only",
    ],
    answer: "The soil around the plant's base",
    explanation:
      "Watering the soil around the base helps provide moisture where the roots can absorb it.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "What is underwatering?",
    options: [
      "Giving a plant too much water",
      "Providing insufficient water to a plant",
      "Watering the soil evenly",
      "Applying water gently",
    ],
    answer: "Providing insufficient water to a plant",
    explanation:
      "Underwatering happens when a plant does not receive enough water to maintain the moisture it needs.",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "Which watering practice helps protect newly planted seedlings?",
    options: [
      "Pouring water forcefully onto the stem",
      "Flooding the planting area",
      "Applying water gently and evenly",
      "Avoiding water after planting",
    ],
    answer: "Applying water gently and evenly",
    explanation:
      "Gentle and even watering helps moisten the soil while minimizing disturbance to the seedling.",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "Which statement best describes proper watering technique?",
    options: [
      "Give too much water to keep the soil flooded",
      "Water the leaves and ignore the soil",
      "Use a strong stream to wash the soil",
      "Give enough water gently around the base of the plant",
    ],
    answer: "Give enough water gently around the base of the plant",
    explanation:
      "Proper watering involves providing sufficient moisture, using a gentle flow, and directing water around the plant's base.",
  },

  // ====================================================
  // ENUMERATION — 10 QUESTIONS
  // ====================================================

  {
    id: 11,
    type: "enumeration",
    question: "Name four important practices when watering newly planted seedlings.",
    answer: [
      "give enough water",
      "water gently",
      "water around the base",
      "maintain proper soil moisture",
    ],
    explanation:
      "Newly planted seedlings need enough water, gentle application, watering around the base, and proper soil moisture.",
  },
  {
    id: 12,
    type: "enumeration",
    question: "Give two things that should be avoided when watering seedlings.",
    answer: [
      "overwatering",
      "underwatering",
    ],
    explanation:
      "Overwatering and underwatering should be avoided because both can negatively affect seedling growth.",
  },
  {
    id: 13,
    type: "enumeration",
    question: "Name three things that gentle watering helps protect.",
    answer: [
      "soil",
      "seedling",
      "roots",
    ],
    explanation:
      "Gentle watering helps prevent soil displacement and protects the delicate seedling and its developing roots.",
  },
  {
    id: 14,
    type: "enumeration",
    question: "Give three characteristics of proper watering.",
    answer: [
      "gentle application",
      "even distribution",
      "proper soil moisture",
    ],
    explanation:
      "Proper watering should be gentle, evenly distributed, and sufficient to maintain appropriate soil moisture.",
  },
  {
    id: 15,
    type: "enumeration",
    question: "Name two plant parts or areas that should be protected from forceful watering.",
    answer: [
      "leaves",
      "stem",
    ],
    explanation:
      "Water should not forcefully hit the leaves or stem because delicate plant parts can be damaged.",
  },
  {
    id: 16,
    type: "enumeration",
    question: "List three watering mistakes that can negatively affect newly planted seedlings.",
    answer: [
      "overwatering",
      "underwatering",
      "using a strong stream of water",
    ],
    explanation:
      "Giving too much water, giving insufficient water, and using a forceful stream are common watering mistakes.",
  },
  {
    id: 17,
    type: "enumeration",
    question: "Name three benefits of watering seedlings properly.",
    answer: [
      "supports plant growth",
      "maintains soil moisture",
      "helps seedlings adjust",
    ],
    explanation:
      "Proper watering supports growth, maintains the moisture needed by the roots, and helps newly planted seedlings adjust to their environment.",
  },
  {
    id: 18,
    type: "enumeration",
    question: "Give three reminders when applying water to a newly planted seedling.",
    answer: [
      "use a gentle flow",
      "direct water around the base",
      "avoid excessive water",
    ],
    explanation:
      "Use a gentle flow, direct water around the base, and avoid excessive watering to protect the seedling.",
  },
  {
    id: 19,
    type: "enumeration",
    question: "List three conditions that should be maintained when watering plants.",
    answer: [
      "sufficient water",
      "even soil moisture",
      "healthy soil condition",
    ],
    explanation:
      "Plants need sufficient water, evenly distributed moisture, and healthy soil conditions for proper growth.",
  },
  {
    id: 20,
    type: "enumeration",
    question: "State four important reminders for proper seedling watering.",
    answer: [
      "give enough water",
      "water gently",
      "water around the base",
      "avoid overwatering",
    ],
    explanation:
      "Remember to provide enough water, apply it gently, direct it around the base, and avoid overwatering.",
  },

  // ====================================================
  // FILL IN THE BLANKS — 10 QUESTIONS
  // ====================================================

  {
    id: 21,
    type: "fill-blank",
    question: "Newly planted seedlings need _____ to help them adjust and grow.",
    answer: ["water"],
    explanation:
      "Water is essential for newly planted seedlings as they adjust to their new environment and begin growing.",
  },
  {
    id: 22,
    type: "fill-blank",
    question: "Water should be directed around the _____ of the plant.",
    answer: ["base"],
    explanation:
      "Watering around the base helps moisture reach the soil near the plant's roots.",
  },
  {
    id: 23,
    type: "fill-blank",
    question: "When watering seedlings, always use a _____ flow of water.",
    answer: ["gentle"],
    explanation:
      "A gentle flow protects the seedling and prevents the surrounding soil from being disturbed.",
  },
  {
    id: 24,
    type: "fill-blank",
    question: "Proper watering helps maintain the right amount of _____ in the soil.",
    answer: ["moisture"],
    explanation:
      "Maintaining proper soil moisture provides the water needed by the seedling without excessively flooding the soil.",
  },
  {
    id: 25,
    type: "fill-blank",
    question: "Giving a plant too much water is called _____.",
    answer: ["overwatering"],
    explanation:
      "Overwatering occurs when a plant receives more water than it needs.",
  },
  {
    id: 26,
    type: "fill-blank",
    question: "Providing insufficient water to a plant is called _____.",
    answer: ["underwatering"],
    explanation:
      "Underwatering occurs when a plant does not receive enough water to maintain proper moisture.",
  },
  {
    id: 27,
    type: "fill-blank",
    question: "A strong stream of water may disturb the _____ around a seedling.",
    answer: ["soil"],
    explanation:
      "Forceful watering can displace the soil surrounding the seedling and expose or disturb its roots.",
  },
  {
    id: 28,
    type: "fill-blank",
    question: "Avoid directly hitting the plant's leaves or _____.",
    answer: ["stem"],
    explanation:
      "Directing water around the base instead of forcefully hitting the leaves or stem helps protect the plant.",
  },
  {
    id: 29,
    type: "fill-blank",
    question: "Water should be applied gently and _____.",
    answer: ["evenly"],
    explanation:
      "Even watering helps distribute moisture throughout the soil around the seedling.",
  },
  {
    id: 30,
    type: "fill-blank",
    question: "The goal of proper watering is to avoid giving plants too much or too little _____.",
    answer: ["water"],
    explanation:
      "Proper watering means providing sufficient water while avoiding both overwatering and underwatering.",
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

const checkAnswer = (question, userAnswer) => {
  if (question.type === "multiple-choice") {
    return normalize(userAnswer) === normalize(question.answer);
  }

  if (question.type === "fill-blank") {
    return question.answer
      .map(normalize)
      .includes(normalize(userAnswer));
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

const formatCorrectAnswer = (question) =>
  Array.isArray(question.answer)
    ? question.answer.join(", ")
    : question.answer;

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
        const userAnswer = formatAnswer(
          question,
          answers[question.id]
        );

        return (
          <article
            key={question.id}
            className={`overflow-hidden rounded-3xl border-2 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
              correct
                ? "border-green-100"
                : "border-red-100"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7EE] text-sm font-black text-[#2E9B59]">
                  {index + 1}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    typeColors[question.type] ||
                    "bg-gray-100 text-gray-700"
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
                {correct ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <XCircle size={15} />
                )}

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
                      normalize(answers[question.id]) ===
                      normalize(option);

                    const isAnswer =
                      normalize(question.answer) ===
                      normalize(option);

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
                      correct
                        ? "text-green-800"
                        : "text-red-700"
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

export default function WateringTechniqueQuiz({
  title = "Watering Technique",
  questions = wateringTechniqueQuestions,
  onComplete,
  lessonPath = "/watering-technique",
}) {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentQuestion = questions[currentIndex];

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question) =>
          total +
          (checkAnswer(question, answers[question.id]) ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const comment = getComment(percentage);

  const answeredCount = questions.filter(
    (question) =>
      String(answers[question.id] ?? "").trim().length > 0
  ).length;

  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  const setAnswer = (value) => {
    if (!currentQuestion) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const allAnswered = questions.every(
      (question) =>
        String(answers[question.id] ?? "").trim().length > 0
    );

    if (!allAnswered) {
      window.alert(
        "Please answer all questions before submitting."
      );
      return;
    }

    let userInfo;

    try {
      userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "null"
      );
    } catch {
      setSubmitError(
        "Unable to read your account information. Please log in again."
      );
      return;
    }

    const userId = userInfo?.id;

    if (!userId) {
      setSubmitError(
        "User ID not found. Please log in again."
      );
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

  const handleBackToLesson = () => {
    navigate(lessonPath || -1);
  };

  if (!questions.length) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <Sprout
          className="mx-auto mb-3 text-green-500"
          size={36}
        />

        <p className="font-bold text-gray-700">
          No quiz questions are available.
        </p>
      </div>
    );
  }

  // ====================================================
  // RESULTS AND ANSWER REVIEW
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

        {/* Results Summary */}
        <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-xl animate-[fadeIn_.5s_ease-out] sm:p-10">
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
              className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full animate-[pop_.7s_ease-out] ${
                percentage >= 70
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-100 text-green-600"
              }`}
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

            {/* Score */}
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
                  <XCircle
                    className="mx-auto text-red-400"
                    size={21}
                  />

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
                    {percentage >= 75
                      ? "Passed"
                      : "Needs Improvement"}
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

        {/* Complete Answer Review */}
        <QuestionReview
          questions={questions}
          answers={answers}
        />

        {/* Back to Lesson - Last Section */}
        <div className="mt-10 rounded-3xl border border-green-100 bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EE] text-[#2E9B59]">
            <Droplets size={29} />
          </div>

          <h3 className="text-xl font-black text-[#244C32]">
            Great Job Completing the Quiz!
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            You have finished reviewing all your answers.
            Continue learning and apply proper watering techniques
            to your newly planted seedlings.
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
  // QUIZ INTERFACE
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

      {/* Header */}
      <div className="bg-[#2E9B59] px-5 py-6 text-white sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Droplets size={23} />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/70">
                Test Your Knowledge
              </p>

              <h2 className="text-lg font-black">
                {title}
              </h2>
            </div>
          </div>

          <div className="rounded-xl bg-white/15 px-3 py-2 text-center">
            <p className="text-[10px] font-bold text-white/70">
              QUESTION
            </p>

            <p className="text-lg font-black">
              {currentIndex + 1}/{questions.length}
            </p>
          </div>
        </div>

        {/* Progress */}
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

      {/* Question Content */}
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
              typeColors[currentQuestion.type] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {typeLabels[currentQuestion.type] ||
              currentQuestion.type}
          </span>

          <span className="text-xs font-bold text-gray-400">
            {answeredCount} of {questions.length} answered
          </span>
        </div>

        <div
          key={currentQuestion.id}
          className="question-enter"
        >
          <h3 className="text-xl font-extrabold leading-relaxed text-[#294735] sm:text-2xl">
            {currentQuestion.question}
          </h3>

          {/* Multiple Choice */}
          {currentQuestion.type === "multiple-choice" && (
            <div className="mt-7 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected =
                  answers[currentQuestion.id] === option;

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
                        selected
                          ? "text-green-800"
                          : "text-gray-600"
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

          {/* Enumeration */}
          {currentQuestion.type === "enumeration" && (
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-purple-600">
                <ClipboardCheck size={16} />
                Separate each answer with a comma or a new line.
              </div>

              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
                rows={5}
                placeholder={
                  "First answer\nSecond answer\nThird answer"
                }
                className="w-full resize-none rounded-2xl border-2 border-purple-100 bg-purple-50/40 p-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Enter all the required items. The order of your
                answers does not matter.
              </p>
            </div>
          )}

          {/* Fill in the Blanks */}
          {currentQuestion.type === "fill-blank" && (
            <div className="mt-7">
              <label className="mb-3 block text-xs font-bold text-amber-700">
                Your Answer
              </label>

              <input
                type="text"
                value={answers[currentQuestion.id] || ""}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
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

        {/* Navigation */}
        <div className="mt-9 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((previous) => previous - 1)
            }
            disabled={currentIndex === 0 || submitting}
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
              disabled={
                answeredCount !== questions.length || submitting
              }
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

        {/* Submission Error */}
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
