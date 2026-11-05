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
} from "lucide-react";
import api from "../../assets/api";

// ======================================================
// QUIZ DATA — SPACING OF PLANTS
// 10 Multiple Choice, 10 Enumeration, 10 Fill in the Blanks
// No crop-specific measurements are used because the
// recommended distance depends on the crop being planted.
// ======================================================

export const spacingOfPlantsQuestions = [
  // MULTIPLE CHOICE — 10 QUESTIONS
  {
    id: 1,
    type: "multiple-choice",
    question: "Why should plants be given enough space when planting?",
    options: [
      "So they can get enough sunlight, water, and nutrients",
      "So their roots cannot grow",
      "So they will compete more with nearby plants",
      "So fewer plants can receive air",
    ],
    answer: "So they can get enough sunlight, water, and nutrients",
    explanation:
      "Proper spacing gives plants room to receive sunlight, water, nutrients, and air needed for healthy growth.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "What should a gardener do to maintain equal spacing between plants?",
    options: [
      "Estimate every distance without checking",
      "Measure the recommended distance before planting",
      "Place all seedlings close together",
      "Change the distance for every plant without a reason",
    ],
    answer: "Measure the recommended distance before planting",
    explanation:
      "Measuring the distance helps keep plants evenly spaced according to the recommended planting distance.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "What does uniform spacing mean?",
    options: [
      "Plants are placed at reasonably equal distances from one another",
      "Plants are placed randomly in one area",
      "All plants are placed in the same planting hole",
      "Plants are arranged without considering distance",
    ],
    answer: "Plants are placed at reasonably equal distances from one another",
    explanation:
      "Uniform spacing means maintaining consistent distances between plants rather than placing them randomly.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Which resource can plants receive more effectively when they are properly spaced?",
    options: ["Sunlight", "Plastic materials", "Artificial decorations", "Unused containers"],
    answer: "Sunlight",
    explanation:
      "Proper spacing helps prevent nearby plants from excessively shading one another, allowing better access to sunlight.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What may happen when plants are placed too close together?",
    options: [
      "They may compete for water and nutrients",
      "They will never need sunlight",
      "Their roots will stop needing space",
      "They will automatically grow at the same rate",
    ],
    answer: "They may compete for water and nutrients",
    explanation:
      "Plants growing too close together may compete for limited water, nutrients, sunlight, and growing space.",
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Why is enough space around plants important for air movement?",
    options: [
      "It allows air to move around the plants",
      "It prevents all air from reaching the leaves",
      "It makes plants completely independent of water",
      "It removes the need to care for the plants",
    ],
    answer: "It allows air to move around the plants",
    explanation:
      "Adequate spacing leaves room for air to move around the leaves and stems.",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "What should determine the recommended distance between plants?",
    options: [
      "The type of crop being planted",
      "The color of the planting tool",
      "The number of people watching",
      "The time of day alone",
    ],
    answer: "The type of crop being planted",
    explanation:
      "Different crops have different growth habits and space requirements, so spacing recommendations depend on the crop.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "What is a useful action before placing seedlings in a row?",
    options: [
      "Measure and mark the planting positions",
      "Scatter seedlings without checking distance",
      "Put several seedlings in every position",
      "Ignore the recommended spacing",
    ],
    answer: "Measure and mark the planting positions",
    explanation:
      "Measuring and marking positions helps the gardener maintain consistent spacing along the row.",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "How does proper spacing help plant roots?",
    options: [
      "It provides room for roots to grow",
      "It prevents roots from absorbing water",
      "It forces all roots into one small hole",
      "It removes the need for nutrients",
    ],
    answer: "It provides room for roots to grow",
    explanation:
      "Giving plants enough space also provides room for their root systems to develop.",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "Which practice best demonstrates proper plant spacing?",
    options: [
      "Following the recommended distance and keeping plants evenly arranged",
      "Planting every seedling as close as possible",
      "Leaving large random gaps without considering the crop",
      "Placing seedlings wherever there is an empty spot",
    ],
    answer: "Following the recommended distance and keeping plants evenly arranged",
    explanation:
      "Proper spacing means following the crop's recommended distance and arranging plants uniformly.",
  },

  // ENUMERATION — 10 QUESTIONS
  {
    id: 11,
    type: "enumeration",
    question: "Name four things plants need enough access to when properly spaced.",
    answer: ["sunlight", "water", "nutrients", "air"],
    explanation:
      "Proper spacing helps plants access sunlight, water, nutrients, and air.",
  },
  {
    id: 12,
    type: "enumeration",
    question: "Give two actions that help maintain uniform spacing when planting.",
    answer: ["measure the distance", "mark the planting positions"],
    explanation:
      "Measuring distances and marking planting positions help keep plants evenly arranged.",
  },
  {
    id: 13,
    type: "enumeration",
    question: "Name three things plants may compete for when planted too close together.",
    answer: ["sunlight", "water", "nutrients"],
    explanation:
      "Crowded plants may compete for sunlight, water, and nutrients. They also compete for physical growing space.",
  },
  {
    id: 14,
    type: "enumeration",
    question: "Give two reasons why plants should not be crowded together.",
    answer: ["reduce competition", "allow air movement"],
    explanation:
      "Avoiding overcrowding reduces competition for resources and allows air to move around plants.",
  },
  {
    id: 15,
    type: "enumeration",
    question: "Name two plant parts or systems that benefit from having enough growing space.",
    answer: ["roots", "leaves"],
    explanation:
      "Adequate spacing gives roots room to develop and gives leaves more access to light and air.",
  },
  {
    id: 16,
    type: "enumeration",
    question: "List three practices to follow when arranging plants in a row.",
    answer: ["measure distance", "mark positions", "place plants evenly"],
    explanation:
      "Measuring, marking, and placing plants evenly help maintain the recommended spacing in a row.",
  },
  {
    id: 17,
    type: "enumeration",
    question: "Name three resources or conditions that support healthy plant growth and are considered in spacing.",
    answer: ["sunlight", "water", "nutrients"],
    explanation:
      "Sunlight, water, and nutrients are essential resources that properly spaced plants can access more effectively.",
  },
  {
    id: 18,
    type: "enumeration",
    question: "Give two reasons the recommended spacing can differ from one crop to another.",
    answer: ["different plant size", "different growth habits"],
    explanation:
      "Crops differ in their mature size and growth habits, so they do not all require the same distance.",
  },
  {
    id: 19,
    type: "enumeration",
    question: "List three benefits of maintaining proper spacing between plants.",
    answer: ["better sunlight access", "less competition", "room for root growth"],
    explanation:
      "Proper spacing improves access to sunlight, reduces competition for resources, and provides room for roots to grow.",
  },
  {
    id: 20,
    type: "enumeration",
    question: "State four reminders when spacing plants before planting.",
    answer: ["know the crop", "follow recommended distance", "measure distance", "keep plants uniform"],
    explanation:
      "Identify the crop, follow its recommended distance, measure carefully, and keep the arrangement uniform.",
  },

  // FILL IN THE BLANKS — 10 QUESTIONS
  {
    id: 21,
    type: "fill-blank",
    question: "Giving plants enough space helps them receive sunlight, water, and _____.",
    answer: ["nutrients"],
    explanation:
      "Plants need nutrients along with sunlight and water for healthy growth.",
  },
  {
    id: 22,
    type: "fill-blank",
    question: "The practice of keeping plants at reasonably equal distances is called _____ spacing.",
    answer: ["uniform"],
    explanation:
      "Uniform spacing means keeping a consistent distance between plants.",
  },
  {
    id: 23,
    type: "fill-blank",
    question: "Before planting, measure the recommended _____ between plants.",
    answer: ["distance", "spacing"],
    explanation:
      "Measuring the recommended distance helps prevent plants from being placed too close or too far apart.",
  },
  {
    id: 24,
    type: "fill-blank",
    question: "Plants placed too close together may _____ for water and nutrients.",
    answer: ["compete"],
    explanation:
      "Crowded plants compete with nearby plants for limited resources such as water and nutrients.",
  },
  {
    id: 25,
    type: "fill-blank",
    question: "Proper spacing allows enough _____ to move around the plants.",
    answer: ["air"],
    explanation:
      "Adequate spacing allows air to move around leaves and stems.",
  },
  {
    id: 26,
    type: "fill-blank",
    question: "Different crops may require different spacing because they have different growth _____.",
    answer: ["habits"],
    explanation:
      "Crops differ in their growth habits and mature sizes, which affect their recommended spacing.",
  },
  {
    id: 27,
    type: "fill-blank",
    question: "Proper spacing gives plant _____ enough room to grow.",
    answer: ["roots", "root"],
    explanation:
      "Enough space helps roots develop without being unnecessarily crowded by neighboring plants.",
  },
  {
    id: 28,
    type: "fill-blank",
    question: "When planting in rows, keep the distance between plants _____.",
    answer: ["equal", "uniform", "consistent"],
    explanation:
      "Keeping distances equal or consistent helps create uniform spacing in rows.",
  },
  {
    id: 29,
    type: "fill-blank",
    question: "Recommended plant spacing depends on the type of _____.",
    answer: ["crop"],
    explanation:
      "The type of crop determines the recommended distance because plants have different space requirements.",
  },
  {
    id: 30,
    type: "fill-blank",
    question: "I will follow the recommended spacing between each _____.",
    answer: ["plant"],
    explanation:
      "Following the recommended spacing between each plant helps maintain an even arrangement and supports healthy growth.",
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

const formatAnswer = (question, answer) => {
  if (answer === undefined || answer === null || String(answer).trim() === "") {
    return "No answer provided";
  }

  if (question.type === "enumeration") {
    return String(answer)
      .split(/[\n;,]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }

  return String(answer);
};

const formatCorrectAnswer = (question) =>
  Array.isArray(question.answer) ? question.answer.join(", ") : question.answer;

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
            <h2 className="text-xl font-black sm:text-2xl">Review Your Answers</h2>
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
                  correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
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
                    const isSelected = normalize(answers[question.id]) === normalize(option);
                    const isAnswer = normalize(question.answer) === normalize(option);
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
                            isAnswer ? "text-green-800" : isSelected ? "text-red-700" : "text-gray-600"
                          }`}
                        >
                          {option}
                        </span>
                        {isAnswer && <CheckCircle2 size={19} className="shrink-0 text-green-600" />}
                        {!isAnswer && isSelected && <XCircle size={19} className="shrink-0 text-red-500" />}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div
                  className={`rounded-2xl border p-4 ${
                    correct ? "border-green-100 bg-green-50" : "border-red-100 bg-red-50"
                  }`}
                >
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                    <ClipboardCheck size={14} /> Your Answer
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
                    <CheckCircle2 size={14} /> Correct Answer
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
                <p className="text-sm leading-7 text-blue-900/80">{question.explanation}</p>
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

export default function SpacingOfPlantsQuiz({
  title = "Spacing of Plants",
  questions = spacingOfPlantsQuestions,
  onComplete,
  lessonPath = "/spacing-of-plants",
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
        (total, question) => total + (checkAnswer(question, answers[question.id]) ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const comment = getComment(percentage);
  const answeredCount = questions.filter(
    (question) => String(answers[question.id] ?? "").trim().length > 0
  ).length;
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const setAnswer = (value) => {
    if (!currentQuestion) return;
    setAnswers((previous) => ({ ...previous, [currentQuestion.id]: value }));
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const allAnswered = questions.every(
      (question) => String(answers[question.id] ?? "").trim().length > 0
    );

    if (!allAnswered) {
      window.alert("Please answer all questions before submitting.");
      return;
    }

    let userInfo;
    try {
      userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch {
      setSubmitError("Unable to read your account information. Please log in again.");
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
      const response = await api.post(`/api/quiz-scores/${userId}/`, finalScore);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError("Your quiz result was not saved. Please try again.");
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
        <Sprout className="mx-auto mb-3 text-green-500" size={36} />
        <p className="font-bold text-gray-700">No quiz questions are available.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-4xl pb-12">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px) scale(.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes pop {
            0% { transform: scale(.4) rotate(-15deg); opacity: 0; }
            70% { transform: scale(1.15) rotate(5deg); opacity: 1; }
            100% { transform: scale(1) rotate(0); }
          }
          @keyframes fall {
            0% { transform: translateY(-15vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .quiz-confetti {
            position: absolute; top: -20px; width: 9px; height: 14px;
            border-radius: 3px; animation: fall 3.5s linear forwards;
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
                  backgroundColor: ["#2E9B59", "#F5C542", "#60A5FA", "#F472B6", "#A78BFA"][index % 5],
                  animationDelay: `${(index % 12) * 0.12}s`,
                }}
              />
            ))}

          <div className="relative z-10 text-center">
            <div
              className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full ${
                percentage >= 70 ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-600"
              } animate-[pop_.7s_ease-out]`}
            >
              {percentage >= 70 ? <Trophy size={50} /> : <Sprout size={50} />}
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-green-700">
              <Sparkles size={14} /> Quiz Completed
            </span>
            <h2 className="mt-5 text-3xl font-black text-[#244C32] sm:text-4xl">
              {comment.emoji} {comment.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              {comment.message}
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-3xl bg-[#EAF7EE] p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-green-700">
                Your Final Score
              </p>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-[#2E9B59]">{score}</span>
                <span className="text-2xl font-bold text-green-700/50">/ {questions.length}</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-green-200">
                <div
                  className="h-full rounded-full bg-[#2E9B59] transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-3 text-2xl font-black text-[#244C32]">{percentage}%</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-3">
                  <CheckCircle2 className="mx-auto text-green-500" size={21} />
                  <p className="mt-1 text-xl font-black text-green-700">{score}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Correct</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <XCircle className="mx-auto text-red-400" size={21} />
                  <p className="mt-1 text-xl font-black text-red-500">{questions.length - score}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Incorrect</p>
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
              <BookOpen size={18} /> Scroll down to review all your answers.
            </div>
          </div>
        </div>

        <QuestionReview questions={questions} answers={answers} />

        <div className="mt-10 rounded-3xl border border-green-100 bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF7EE] text-[#2E9B59]">
            <Leaf size={29} />
          </div>
          <h3 className="text-xl font-black text-[#244C32]">Great Job Completing the Quiz!</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            You have finished reviewing all your answers. Continue learning and apply what you have learned in your next lesson.
          </p>
          <button
            type="button"
            onClick={handleBackToLesson}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2E9B59] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-[#247D46] active:scale-95 sm:w-auto"
          >
            <ArrowLeft size={18} /> Back to Lesson
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#DCEBDD] bg-white shadow-xl">
      <style>{`
        @keyframes questionEnter {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .question-enter { animation: questionEnter .35s ease-out; }
      `}</style>

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
            <p className="text-lg font-black">{currentIndex + 1}/{questions.length}</p>
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
                    <span className={`flex-1 text-sm font-bold ${selected ? "text-green-800" : "text-gray-600"}`}>
                      {option}
                    </span>
                    {selected && <CheckCircle2 size={20} className="shrink-0 text-[#2E9B59]" />}
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === "enumeration" && (
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-purple-600">
                <ClipboardCheck size={16} /> Separate each answer with a comma or a new line.
              </div>
              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(event) => setAnswer(event.target.value)}
                rows={5}
                placeholder={"First answer\nSecond answer\nThird answer"}
                className="w-full resize-none rounded-2xl border-2 border-purple-100 bg-purple-50/40 p-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />
              <p className="mt-2 text-xs text-gray-400">
                Enter all the required items. The order of your answers does not matter.
              </p>
            </div>
          )}

          {currentQuestion.type === "fill-blank" && (
            <div className="mt-7">
              <label className="mb-3 block text-xs font-bold text-amber-700">Your Answer</label>
              <input
                type="text"
                value={answers[currentQuestion.id] || ""}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && currentIndex < questions.length - 1) {
                    setCurrentIndex((previous) => previous + 1);
                  }
                }}
                placeholder="Type your answer here..."
                className="w-full rounded-2xl border-2 border-amber-100 bg-amber-50/40 p-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
              />
            </div>
          )}
        </div>

        <div className="mt-9 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => setCurrentIndex((previous) => previous - 1)}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-extrabold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={17} /> Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((previous) => previous + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2E9B59] px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-green-100 transition hover:-translate-y-0.5 hover:bg-[#247D46] active:scale-95"
            >
              Next Question <ChevronRight size={17} />
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
                  <Trophy size={17} /> Submit Quiz
                </>
              )}
            </button>
          )}
        </div>

        {submitError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            <div className="flex items-center gap-2">
              <XCircle size={18} /> <span>{submitError}</span>
            </div>
          </div>
        )}

        {answeredCount !== questions.length && currentIndex === questions.length - 1 && (
          <p className="mt-3 text-right text-xs font-semibold text-amber-600">
            Answer all questions to enable submission.
          </p>
        )}
      </div>
    </div>
  );
}
