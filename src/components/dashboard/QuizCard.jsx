/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
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
  Medal,
  Target,
  BookOpen,
  Star,
  Zap,
  PartyPopper,
  CalendarDays,
  UserRound,
  Award,
  TrendingUp,
  Lightbulb,
  Leaf,
  ClipboardCheck,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Clock,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../assets/api";

// ============================================================
// QUIZ CONFIGURATION
// ============================================================

const quizTypes = [
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    description:
      "Choose the best answer and test your knowledge of plants and planting.",
    quizType: "Multiple Choice",
    link: "/dashboard",
    icon: ListChecks,
    color: "#2E9B59",
    lightColor: "#E3F5E8",
  },
  {
    id: "fill-in-the-blanks",
    title: "Fill in the Blanks",
    description:
      "Complete each sentence with the correct word to show what you have learned.",
    quizType: "Fill in the Blanks",
    link: "/dashboard",
    icon: PenLine,
    color: "#C18A36",
    lightColor: "#F8EDD9",
  },
  {
    id: "true-or-false",
    title: "True or False",
    description:
      "Read each statement carefully and decide whether it is true or false.",
    quizType: "True or False",
    link: "/dashboard",
    icon: CircleCheck,
    color: "#6386C9",
    lightColor: "#E8EEFA",
  },
];

// ============================================================
// FRAMER MOTION ANIMATIONS
// ============================================================

const entranceAnimations = [
  {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.92,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },
  {
    hidden: {
      opacity: 0,
      x: -65,
      rotate: -4,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
    },
  },
  {
    hidden: {
      opacity: 0,
      x: 65,
      rotate: 4,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
    },
  },
  {
    hidden: {
      opacity: 0,
      scale: 0.65,
      rotate: -12,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
  },
  {
    hidden: {
      opacity: 0,
      y: -35,
      scale: 1.08,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },
];

const getRandomEntrance = () => {
  return entranceAnimations[
    Math.floor(Math.random() * entranceAnimations.length)
  ];
};

const getRandomTransition = (index = 0) => ({
  duration: 0.65 + Math.random() * 0.65,
  delay: index * 0.09 + Math.random() * 0.2,
  ease: [0.22, 1, 0.36, 1],
});

const floatingAnimation = {
  animate: {
    y: [0, -12, 5, -8, 0],
    x: [0, 7, -5, 4, 0],
    rotate: [0, 4, -3, 2, 0],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const gentleBounce = {
  animate: {
    y: [0, -9, 0, -4, 0],
    rotate: [0, 3, -3, 0],
  },
  transition: {
    duration: 2.8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
  },
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// ============================================================
// USER INFORMATION
// ============================================================

const readUserInfo = () => {
  try {
    const savedUser = localStorage.getItem("userInfo");

    if (!savedUser) return null;

    const parsedUser = JSON.parse(savedUser);

    if (!parsedUser || !parsedUser.id) return null;

    return parsedUser;
  } catch (error) {
    console.error("Unable to read user information:", error);
    return null;
  }
};

// ============================================================
// SCORE HELPERS
// ============================================================

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getQuizCategory = (title) => {
  const normalized = normalizeText(title);

  if (
    normalized.includes("multiple choice") ||
    normalized.includes("multiplechoice")
  ) {
    return "multiple-choice";
  }

  if (
    normalized.includes("fill in the blanks") ||
    normalized.includes("fill in blanks") ||
    normalized.includes("fill blanks") ||
    normalized.includes("fill in the blank")
  ) {
    return "fill-in-the-blanks";
  }

  if (
    normalized.includes("true or false") ||
    normalized.includes("true false")
  ) {
    return "true-or-false";
  }

  return null;
};

// Supports:
// "8/10"
// "8 / 10"
// "80%"
// "80"
// 80
const parseScore = (scoreValue) => {
  const raw = String(scoreValue ?? "").trim();

  if (!raw) {
    return {
      correct: 0,
      total: 0,
      percentage: 0,
      display: "N/A",
    };
  }

  const fractionMatch = raw.match(
    /^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (fractionMatch) {
    const correct = Number(fractionMatch[1]);
    const total = Number(fractionMatch[2]);

    if (Number.isFinite(correct) && Number.isFinite(total) && total > 0) {
      return {
        correct,
        total,
        percentage: Math.min(
          100,
          Math.max(0, Math.round((correct / total) * 100)),
        ),
        display: `${correct}/${total}`,
      };
    }
  }

  const percentageMatch = raw.match(/^(-?\d+(?:\.\d+)?)\s*%$/);

  if (percentageMatch) {
    const percentage = Number(percentageMatch[1]);

    return {
      correct: 0,
      total: 0,
      percentage: Math.min(100, Math.max(0, Math.round(percentage))),
      display: `${percentage}%`,
    };
  }

  const numericScore = Number(raw);

  if (Number.isFinite(numericScore)) {
    return {
      correct: 0,
      total: 0,
      percentage: Math.min(100, Math.max(0, Math.round(numericScore))),
      display: `${numericScore}%`,
    };
  }

  return {
    correct: 0,
    total: 0,
    percentage: 0,
    display: raw,
  };
};

const formatDate = (dateValue) => {
  if (!dateValue) return "Date not available";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getScoreStatus = (percentage) => {
  if (percentage >= 90) {
    return {
      label: "Excellent",
      message: "Outstanding work! You're mastering this topic.",
      icon: Trophy,
      color: "#2E9B59",
      background: "#E3F5E8",
    };
  }

  if (percentage >= 75) {
    return {
      label: "Passed",
      message: "Great job! Keep building your knowledge.",
      icon: Award,
      color: "#2E9B59",
      background: "#E3F5E8",
    };
  }

  if (percentage >= 50) {
    return {
      label: "Keep Practicing",
      message: "You're making progress. A little more practice will help.",
      icon: TrendingUp,
      color: "#C18A36",
      background: "#F8EDD9",
    };
  }

  return {
    label: "Needs Improvement",
    message: "Review the lesson and try again.",
    icon: Lightbulb,
    color: "#C16A4A",
    background: "#FCEBE4",
  };
};

// ============================================================
// ANIMATED NUMBER
// ============================================================

function AnimatedNumber({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const startTime = performance.now();
    const duration = 1200;
    const target = Number(value) || 0;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyQuizState({ userName }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 35 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-[#E7DCCB] bg-[#F5EFE5] px-6 py-12 text-center shadow-sm sm:px-10"
    >
      <motion.div
        {...floatingAnimation}
        className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#D2B991]/20"
      />

      <motion.div
        {...floatingAnimation}
        transition={{
          ...floatingAnimation.transition,
          delay: 0.8,
        }}
        className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#2E9B59]/10"
      />

      <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full border-2 border-dashed border-[#D2B991]"
        />

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 12, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute left-2 top-5 text-[#C18A36]"
        >
          <Star size={19} fill="currentColor" />
        </motion.div>

        <motion.div
          {...pulseAnimation}
          className="absolute right-1 top-10 text-[#2E9B59]"
        >
          <Sparkles size={22} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute bottom-4 left-5 text-[#C18A36]"
        >
          <Sparkles size={17} />
        </motion.div>

        <motion.div
          {...gentleBounce}
          className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-[#E9DDCA] bg-[#FFF9F0] shadow-[0_12px_30px_rgba(73,60,41,0.10)]"
        >
          <BookOpen size={43} strokeWidth={1.7} className="text-[#896D45]" />
        </motion.div>
      </div>

      <div className="relative mt-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-3 flex items-center justify-center gap-2"
        >
          <Sparkles size={14} className="animate-pulse text-[#B08A51]" />

          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#97784C]">
            Your learning journey starts here
          </span>

          <Sparkles size={14} className="animate-pulse text-[#B08A51]" />
        </motion.div>

        <h3 className="text-2xl font-extrabold tracking-tight text-[#493C29]">
          No quiz scores yet!
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#776A57]">
          {userName ? `Hello, ${userName}! ` : ""}
          You haven't completed any quizzes yet. Start answering quizzes,
          collect points, and watch your learning progress grow.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {quizTypes.map((quiz, index) => {
            const Icon = quiz.icon;

            return (
              <motion.div
                key={quiz.id}
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.8,
                  rotate: Math.random() * 8 - 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.4 + index * 0.15,
                  duration: 0.65,
                  ease: "backOut",
                }}
                whileHover={{ y: -5, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={quiz.link}
                  className="flex items-center gap-2 rounded-full border border-[#E7DCCB] bg-[#FFF9F0] px-4 py-2.5 text-[11px] font-bold text-[#695438] shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon size={15} />
                  {quiz.title}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// LOADING STATE
// ============================================================

function QuizLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item * 0.12 }}
          className="overflow-hidden rounded-[24px] border border-[#E7DCCB] bg-[#F5EFE5] p-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-[#E8DDCC]" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 animate-pulse rounded bg-[#E8DDCC]" />
              <div className="h-4 w-40 animate-pulse rounded bg-[#E8DDCC]" />
            </div>
          </div>

          <div className="mt-5 h-16 animate-pulse rounded-2xl bg-[#E8DDCC]" />
          <div className="mt-4 h-10 animate-pulse rounded-xl bg-[#E8DDCC]" />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================
// ERROR STATE
// ============================================================

function QuizError({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-[#F0D0C8] bg-[#FCEBE4] p-6 text-center"
    >
      <AlertCircle size={30} className="mx-auto text-[#C16A4A]" />

      <h3 className="mt-3 font-extrabold text-[#493C29]">
        Unable to load quiz scores
      </h3>

      <p className="mt-2 text-sm text-[#776A57]">
        {message || "Something went wrong while retrieving your quiz results."}
      </p>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2E9B59] px-5 py-3 text-xs font-bold text-white"
      >
        <RefreshCw size={14} />
        Try Again
      </motion.button>
    </motion.div>
  );
}

// ============================================================
// MAIN QUIZ CARD
// ============================================================

function QuizCard() {
  const [quizScores, setQuizScores] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  // ==========================================================
  // FETCH SCORES FROM DJANGO DATABASE
  // ==========================================================

  const loadScores = async (isMounted = () => true) => {
    const currentUser = readUserInfo();

    if (!isMounted()) return;

    setUserInfo(currentUser);

    if (!currentUser?.id) {
      setQuizScores([]);
      setIsLoading(false);
      setErrorMessage("");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get(`/api/quiz-scores/${currentUser.id}/`);

      if (!isMounted()) return;

      const data = response?.data;

      if (!Array.isArray(data)) {
        throw new Error("The server returned an invalid quiz-score response.");
      }

      setQuizScores(data);
    } catch (error) {
      console.error("Unable to fetch quiz scores:", error);

      if (!isMounted()) return;

      setQuizScores([]);

      const serverMessage =
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        error?.message;

      setErrorMessage(
        serverMessage || "Please check your internet connection and try again.",
      );
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const isMounted = () => mounted;

    loadScores(isMounted);

    const handleFocus = () => {
      loadScores(isMounted);
    };

    const handleStorage = (event) => {
      if (!event || event.key === "userInfo") {
        loadScores(isMounted);
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      mounted = false;
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, [location.key]);

  // ==========================================================
  // NORMALIZE DATABASE RECORDS
  // ==========================================================

  const normalizedScores = useMemo(() => {
    return quizScores.map((item) => {
      const parsed = parseScore(item.score);

      return {
        ...item,
        parsedScore: parsed,
        percentage: parsed.percentage,
        submittedDate: item.time_submitted,
        category: getQuizCategory(item.title),
      };
    });
  }, [quizScores]);

  // ==========================================================
  // LATEST SCORE PER QUIZ CATEGORY
  // ==========================================================

  const completedScores = useMemo(() => {
    return quizTypes
      .map((quiz) => {
        const matchingScores = normalizedScores
          .filter((item) => item.category === quiz.id)
          .sort((a, b) => {
            return (
              new Date(b.time_submitted || 0).getTime() -
              new Date(a.time_submitted || 0).getTime()
            );
          });

        const latest = matchingScores[0];

        if (!latest) return null;

        return {
          ...quiz,
          savedScore: latest,
          percentage: latest.percentage,
          score: latest.parsedScore.correct,
          totalQuestions: latest.parsedScore.total,
          attempts: matchingScores.length,
        };
      })
      .filter(Boolean);
  }, [normalizedScores]);

  // ==========================================================
  // SCORE STATISTICS
  // ==========================================================

  const totalCompleted = completedScores.length;

  const averageScore =
    totalCompleted > 0
      ? Math.round(
          completedScores.reduce((total, item) => total + item.percentage, 0) /
            totalCompleted,
        )
      : 0;

  const totalCorrect = completedScores.reduce(
    (total, item) => total + item.score,
    0,
  );

  const totalQuestions = completedScores.reduce(
    (total, item) => total + item.totalQuestions,
    0,
  );

  const totalAttempts = normalizedScores.length;

  const latestScore = useMemo(() => {
    if (!normalizedScores.length) return null;

    return [...normalizedScores].sort((a, b) => {
      return (
        new Date(b.time_submitted || 0).getTime() -
        new Date(a.time_submitted || 0).getTime()
      );
    })[0];
  }, [normalizedScores]);

  const firstName =
    userInfo?.first_name ||
    userInfo?.username ||
    userInfo?.full_name ||
    "Learner";

  // ==========================================================
  // RENDER: LOADING
  // ==========================================================

  if (isLoading) {
    return <QuizLoading />;
  }

  // ==========================================================
  // RENDER: NO USER
  // ==========================================================

  if (!userInfo) {
    return <EmptyQuizState />;
  }

  // ==========================================================
  // RENDER: ERROR
  // ==========================================================

  if (errorMessage) {
    return <QuizError message={errorMessage} onRetry={() => loadScores()} />;
  }

  // ==========================================================
  // RENDER: EMPTY
  // ==========================================================

  if (quizScores.length === 0) {
    return <EmptyQuizState userName={firstName} />;
  }

  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6"
    >
      <style>{`
        @keyframes quizShine {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(450%) skewX(-20deg);
          }
        }

        .animate-quiz-shine {
          animation: quizShine 1.2s ease-in-out;
        }

        @keyframes quizSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .quiz-spin {
          animation: quizSpin 12s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .quiz-spin,
          .animate-quiz-shine,
          .animate-pulse,
          .animate-bounce {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          INDIVIDUAL QUIZ CARDS
      ===================================================== */}

      

      {/* =====================================================
          OTHER DATABASE RECORDS
      ===================================================== */}

      {normalizedScores.some((item) => !item.category) && (
        <motion.div
          variants={getRandomEntrance()}
          transition={getRandomTransition(11)}
          className="rounded-[22px] border border-[#E7DCCB] bg-[#FFF9F0] p-5"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={17} className="text-[#97784C]" />

            <h3 className="text-sm font-extrabold text-[#493C29]">
              Other Quiz Records
            </h3>
          </div>

          <p className="mt-1 text-[10px] text-[#8A7A64]">
            These saved records do not match the three quiz categories above.
          </p>

          <div className="mt-4 space-y-3">
            {normalizedScores
              .filter((item) => !item.category)
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#E7DCCB] bg-[#F5EFE5] p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-extrabold text-[#493C29]">
                      {item.title}
                    </p>

                    <span className="text-xs font-extrabold text-[#2E9B59]">
                      {item.parsedScore.display}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] text-[#776A57]">
                      {item.status}
                    </span>

                    <span className="flex items-center gap-1 text-[9px] text-[#8A7A64]">
                      <Clock size={11} />
                      {formatDate(item.time_submitted)}
                    </span>
                  </div>

                  {item.comment && (
                    <p className="mt-2 text-[10px] leading-5 text-[#776A57]">
                      {item.comment}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* =====================================================
          MOTIVATIONAL FOOTER
      ===================================================== */}

      <motion.div
        variants={getRandomEntrance()}
        transition={getRandomTransition(12)}
        whileHover={{ y: -3 }}
        className="flex items-center gap-3 rounded-[19px] border border-[#E7DCCB] bg-[#FFF9F0] p-4"
      >
        <motion.div
          {...gentleBounce}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F5E8]"
        >
          <Leaf size={20} className="text-[#2E9B59]" />
        </motion.div>

        <div>
          <p className="text-xs font-extrabold text-[#493C29]">
            Every quiz helps you grow!
          </p>

          <p className="mt-1 text-[10px] leading-4 text-[#776A57]">
            Keep practicing and improve your knowledge one lesson at a time.
          </p>
        </div>

        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="ml-auto shrink-0"
        >
          <PartyPopper size={19} className="text-[#C18A36]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default QuizCard;
