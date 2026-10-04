import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import trueOrFalse from "../components/quizzes/trueOrFalse";
import BottomNav from "../components/BottomNav";

function TrueOrFalse() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questionRefs = useRef({});

  // Select True or False
  const handleAnswer = (questionId, answer) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Scroll to question
  const scrollToQuestion = (questionId) => {
    const element = questionRefs.current[questionId];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("ring-2", "ring-red-400", "ring-offset-2");

      setTimeout(() => {
        element.classList.remove("ring-2", "ring-red-400", "ring-offset-2");
      }, 2000);
    }
  };

  // Motivational message based on score
  const getMotivationalMessage = (score) => {
    const total = trueOrFalse.length;
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return {
        title: "Perfect Score! 🌟",
        message:
          "Amazing work! You got every statement correct. Your planting knowledge is growing beautifully!",
      };
    }

    if (percentage >= 90) {
      return {
        title: "Excellent Work! 🌱",
        message:
          "Fantastic! You have an excellent understanding of plants, gardening, and planting.",
      };
    }

    if (percentage >= 80) {
      return {
        title: "Great Job! 🌿",
        message:
          "Well done! You have a strong understanding of how plants grow and how to care for them.",
      };
    }

    if (percentage >= 70) {
      return {
        title: "Good Work! 🌻",
        message:
          "Nice job! Keep reviewing your lessons and continue growing your gardening knowledge.",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Keep Learning! 🌱",
        message:
          "You're making progress! Review the lessons and try again to improve your score.",
      };
    }

    return {
      title: "Keep Growing! 🌳",
      message:
        "Don't give up! Mistakes help us learn. Review your lessons and give the quiz another try!",
    };
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (submitted) return;

    // Find unanswered questions
    const unansweredQuestions = trueOrFalse.filter(
      (question) => answers[question.id] === undefined,
    );

    // Show warning if there are unanswered questions
    if (unansweredQuestions.length > 0) {
      const firstUnanswered = unansweredQuestions[0];

      await Swal.fire({
        icon: "warning",
        title: "Unanswered Question",
        html: `
          <p class="text-gray-600">
            You still have
            <strong>${unansweredQuestions.length}</strong>
            unanswered question${unansweredQuestions.length > 1 ? "s" : ""}.
          </p>

          <p class="mt-2 text-gray-500">
            Please answer all questions before submitting.
          </p>
        `,
        confirmButtonText: "Go to Question",
        confirmButtonColor: "#3484B5",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        showCancelButton: false,
      });

      setTimeout(() => {
        scrollToQuestion(firstUnanswered.id);
      }, 150);

      return;
    }

    // Confirmation
    const confirmation = await Swal.fire({
      icon: "question",
      title: "Submit Your Answers?",
      html: `
        <p class="text-gray-600">
          Are you sure you want to submit your answers?
        </p>

        <p class="mt-2 text-gray-500">
          You will not be able to change your answers after submitting.
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Go Back",
      confirmButtonColor: "#3484B5",
      cancelButtonColor: "#9CA3AF",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (!confirmation.isConfirmed) return;

    // Calculate score
    let calculatedScore = 0;

    trueOrFalse.forEach((question) => {
      if (answers[question.id] === question.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    const motivation = getMotivationalMessage(calculatedScore);

    // Result dialog
    await Swal.fire({
      icon: calculatedScore >= 10 ? "success" : "info",
      title: motivation.title,
      html: `
        <div class="py-2">
          <div class="text-5xl font-bold text-[#3484B5] mb-3">
            ${calculatedScore}/${trueOrFalse.length}
          </div>

          <p class="text-gray-700 font-medium mb-2">
            ${Math.round(
              (calculatedScore / trueOrFalse.length) * 100,
            )}%
          </p>

          <p class="text-gray-600">
            ${motivation.message}
          </p>
        </div>
      `,
      confirmButtonText: "View My Answers",
      confirmButtonColor: "#3484B5",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Restart quiz
  const handleRestart = () => {
    Swal.fire({
      icon: "question",
      title: "Try Again?",
      text: "Your current answers and score will be reset.",
      showCancelButton: true,
      confirmButtonText: "Yes, Try Again",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3484B5",
    }).then((result) => {
      if (result.isConfirmed) {
        setAnswers({});
        setScore(0);
        setSubmitted(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <>
      <div className="min-h-screen bg-[#EAF7EE]">
        {/* Header */}
        <div className="border-b border-[#E1ECE4] bg-white">
          <div className="mx-auto max-w-[700px] px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#3484B5]">
                  Planting Quiz
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#294A5F]">
                  True or False
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Read each statement carefully and choose True or False.
                </p>
              </div>

              {submitted && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Your Score</p>

                  <p className="text-2xl font-bold text-[#3484B5]">
                    {score}/{trueOrFalse.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <main className="mx-auto max-w-[700px] px-4 py-6">
          <div className="space-y-5">
            {trueOrFalse.map((question, index) => {
              const selectedAnswer = answers[question.id];

              const isCorrect = submitted && selectedAnswer === question.answer;

              return (
                <div
                  key={question.id}
                  ref={(element) => {
                    questionRefs.current[question.id] = element;
                  }}
                  className={`rounded-2xl border bg-white p-5 transition-all duration-300 ${
                    submitted
                      ? isCorrect
                        ? "border-green-200"
                        : "border-red-200"
                      : "border-[#E1ECE4]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Question number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2F0FA] text-sm font-bold text-[#3484B5]">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Statement */}
                      <h2 className="font-semibold leading-relaxed text-[#294A5F]">
                        {question.statement}
                      </h2>

                      {/* True / False buttons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {/* TRUE */}
                        <button
                          type="button"
                          disabled={submitted}
                          onClick={() => handleAnswer(question.id, true)}
                          className={`rounded-xl border px-4 py-4 text-sm font-bold transition ${
                            selectedAnswer === true
                              ? submitted
                                ? question.answer === true
                                  ? "border-green-400 bg-green-50 text-green-700"
                                  : "border-red-400 bg-red-50 text-red-700"
                                : "border-[#3484B5] bg-[#E2F0FA] text-[#3484B5]"
                              : "border-[#DCE7ED] bg-white text-gray-600 hover:border-[#3484B5] hover:bg-[#F4F9FD]"
                          }`}
                        >
                          ✓ True
                        </button>

                        {/* FALSE */}
                        <button
                          type="button"
                          disabled={submitted}
                          onClick={() => handleAnswer(question.id, false)}
                          className={`rounded-xl border px-4 py-4 text-sm font-bold transition ${
                            selectedAnswer === false
                              ? submitted
                                ? question.answer === false
                                  ? "border-green-400 bg-green-50 text-green-700"
                                  : "border-red-400 bg-red-50 text-red-700"
                                : "border-[#3484B5] bg-[#E2F0FA] text-[#3484B5]"
                              : "border-[#DCE7ED] bg-white text-gray-600 hover:border-[#3484B5] hover:bg-[#F4F9FD]"
                          }`}
                        >
                          ✕ False
                        </button>
                      </div>

                      {/* Result and explanation */}
                      {submitted && (
                        <div
                          className={`mt-4 rounded-xl p-4 ${
                            isCorrect ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-semibold ${
                              isCorrect ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                          </p>

                          {!isCorrect && (
                            <p className="mt-2 text-sm text-gray-700">
                              <span className="font-semibold">
                                Correct answer:
                              </span>{" "}
                              {question.answer ? "True" : "False"}
                            </p>
                          )}

                          <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            <span className="font-semibold">Explanation:</span>{" "}
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom button */}
          <div className="mt-7 pb-8">
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-2xl bg-[#3484B5] py-4 font-semibold text-white shadow-sm transition hover:bg-[#2A6E98] active:scale-[0.98]"
              >
                Submit Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                className="w-full rounded-2xl bg-[#3484B5] py-4 font-semibold text-white shadow-sm transition hover:bg-[#2A6E98] active:scale-[0.98]"
              >
                Try Again
              </button>
            )}
          </div>
        </main>
      </div>

      <BottomNav/>
    </>
  );
}

export default TrueOrFalse;
