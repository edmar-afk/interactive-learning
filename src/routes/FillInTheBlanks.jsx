import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import fillInTheBlanksQuestions from "../components/quizzes/fill-in-the-blanks";
import BottomNav from "../components/BottomNav";

function FillInTheBlanks() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questionRefs = useRef({});

  // Normalize student input before checking the answer
  const normalizeAnswer = (value) => {
    return value.trim().replace(/\s+/g, " ").toLowerCase();
  };

  // Handle typing
  const handleAnswer = (questionId, value) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Check whether the student's answer matches
  const isAnswerCorrect = (question, studentAnswer) => {
    const normalizedStudentAnswer = normalizeAnswer(studentAnswer);

    return question.answers.some(
      (answer) => normalizeAnswer(answer) === normalizedStudentAnswer,
    );
  };

  // Scroll to a question
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

  // Motivational message
  const getMotivationalMessage = (score) => {
    const total = fillInTheBlanksQuestions.length;
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return {
        title: "Perfect Score! 🌟",
        message:
          "Amazing! You answered every question correctly. You really know how to grow your knowledge!",
      };
    }

    if (percentage >= 90) {
      return {
        title: "Excellent Work! 🌱",
        message:
          "Fantastic job! You have an excellent understanding of gardening and planting.",
      };
    }

    if (percentage >= 80) {
      return {
        title: "Great Job! 🌿",
        message:
          "Well done! You have a strong understanding of planting and garden care.",
      };
    }

    if (percentage >= 70) {
      return {
        title: "Good Work! 🌻",
        message:
          "Nice effort! Keep practicing and you will continue to grow your gardening knowledge.",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Keep Learning! 🌱",
        message:
          "You're making progress! Review your lessons and try again to improve your score.",
      };
    }

    return {
      title: "Keep Growing! 🌳",
      message:
        "Don't give up! Every mistake is a chance to learn. Review the lessons and try again!",
    };
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (submitted) return;

    // Find unanswered questions
    const unansweredQuestions = fillInTheBlanksQuestions.filter((question) => {
      const answer = answers[question.id];

      return !answer || !answer.trim();
    });

    // If there are unanswered questions
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
        confirmButtonColor: "#2E9B59",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
      });

      setTimeout(() => {
        scrollToQuestion(firstUnanswered.id);
      }, 150);

      return;
    }

    // Confirmation dialog
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
      confirmButtonColor: "#2E9B59",
      cancelButtonColor: "#9CA3AF",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (!confirmation.isConfirmed) return;

    // Calculate score
    let calculatedScore = 0;

    fillInTheBlanksQuestions.forEach((question) => {
      const studentAnswer = answers[question.id] || "";

      if (isAnswerCorrect(question, studentAnswer)) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    const motivation = getMotivationalMessage(calculatedScore);

    // Result dialog
    await Swal.fire({
      icon: calculatedScore >= 7 ? "success" : "info",
      title: motivation.title,
      html: `
        <div class="py-2">
          <div class="text-5xl font-bold text-[#9A6842] mb-3">
            ${calculatedScore}/${fillInTheBlanksQuestions.length}
          </div>

          <p class="text-gray-700 font-medium mb-2">
            ${Math.round(
              (calculatedScore / fillInTheBlanksQuestions.length) * 100,
            )}%
          </p>

          <p class="text-gray-600">
            ${motivation.message}
          </p>
        </div>
      `,
      confirmButtonText: "View My Answers",
      confirmButtonColor: "#9A6842",
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
      confirmButtonColor: "#9A6842",
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
                <p className="text-sm font-medium text-[#9A6842]">
                  Planting Quiz
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#4C3829]">
                  Fill in the Blanks
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Type the correct word in each blank.
                </p>
              </div>

              {submitted && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Your Score</p>

                  <p className="text-2xl font-bold text-[#9A6842]">
                    {score}/{fillInTheBlanksQuestions.length}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#F3D9A6] bg-[#FFF9EA] px-3 py-2.5">
              <span className="mt-0.5 text-sm">💡</span>

              <p className="text-xs font-medium leading-5 text-[#9A6A20]">
                Please type your answer carefully. Extra spaces or invalid
                characters are not allowed.
              </p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <main className="mx-auto max-w-[700px] px-4 py-6">
          <div className="space-y-5">
            {fillInTheBlanksQuestions.map((question, index) => {
              const studentAnswer = answers[question.id] || "";

              const correct =
                submitted && isAnswerCorrect(question, studentAnswer);

              return (
                <div
                  key={question.id}
                  ref={(element) => {
                    questionRefs.current[question.id] = element;
                  }}
                  className={`rounded-2xl border bg-white p-5 transition-all duration-300 ${
                    submitted
                      ? correct
                        ? "border-green-200"
                        : "border-red-200"
                      : "border-[#E1ECE4]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3E7DA] text-sm font-bold text-[#9A6842]">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Question */}
                      <h2 className="font-semibold leading-relaxed text-[#4C3829]">
                        {question.question}
                      </h2>

                      {/* Input */}
                      <div className="mt-4">
                        <input
                          type="text"
                          value={studentAnswer}
                          disabled={submitted}
                          onChange={(e) =>
                            handleAnswer(question.id, e.target.value)
                          }
                          placeholder="Type your answer..."
                          autoComplete="off"
                          spellCheck="false"
                          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                            submitted
                              ? correct
                                ? "border-green-400 bg-green-50 text-green-800"
                                : "border-red-400 bg-red-50 text-red-800"
                              : "border-[#DED6CE] bg-white text-gray-700 focus:border-[#9A6842] focus:ring-2 focus:ring-[#F3E7DA]"
                          }`}
                        />
                      </div>

                      {/* Result */}
                      {submitted && (
                        <div
                          className={`mt-4 rounded-xl p-4 ${
                            correct ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-semibold ${
                              correct ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {correct ? "✓ Correct!" : "✗ Incorrect"}
                          </p>

                          {!correct && (
                            <p className="mt-2 text-sm text-gray-700">
                              <span className="font-semibold">
                                Correct answer:
                              </span>{" "}
                              {question.answer}
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
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#F3D9A6] bg-[#FFF9EA] px-3 py-2.5">
            <span className="mt-0.5 text-sm">💡</span>

            <p className="text-xs font-medium leading-5 text-[#9A6A20]">
              Please type your answer carefully. Extra spaces or invalid
              characters are not allowed.
            </p>
          </div>
          {/* Bottom Button */}
          <div className="mt-7 pb-8">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="w-full rounded-2xl bg-[#9A6842] py-4 font-semibold text-white shadow-sm transition hover:bg-[#815435] active:scale-[0.98]"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="w-full rounded-2xl bg-[#9A6842] py-4 font-semibold text-white shadow-sm transition hover:bg-[#815435] active:scale-[0.98]"
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

export default FillInTheBlanks;
