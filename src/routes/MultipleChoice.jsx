/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import multipleChoiceQuestions from "../components/quizzes/multipleChoiceQuestions";
import BottomNav from "../components/BottomNav";
function MultipleChoice() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questionRefs = useRef({});

  // Handle answer selection
  const handleAnswer = (questionId, answer) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Get motivational message based on score
  const getMotivationalMessage = (score) => {
    const percentage = (score / multipleChoiceQuestions.length) * 100;

    if (percentage === 100) {
      return {
        title: "Perfect Score! 🌟",
        message:
          "Amazing work! You got everything correct. You really know a lot about planting!",
      };
    }

    if (percentage >= 90) {
      return {
        title: "Excellent Work! 🌱",
        message:
          "Great job! You have an excellent understanding of plants and planting.",
      };
    }

    if (percentage >= 80) {
      return {
        title: "Great Job! 🌿",
        message:
          "Well done! You have a strong understanding of planting. Keep learning and growing!",
      };
    }

    if (percentage >= 70) {
      return {
        title: "Good Work! 🌻",
        message:
          "Nice effort! You already know many important things about planting. Keep practicing!",
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
        "Don't give up! Every mistake is a chance to learn. Review the lessons and try again!",
    };
  };

  // Scroll to a specific question
  const scrollToQuestion = (questionId) => {
    const element = questionRefs.current[questionId];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Highlight the question briefly
      element.classList.add("ring-2", "ring-red-400");

      setTimeout(() => {
        element.classList.remove("ring-2", "ring-red-400");
      }, 2000);
    }
  };

  // Submit button
  const handleSubmit = async () => {
    if (submitted) return;

    // Find unanswered questions
    const unansweredQuestions = multipleChoiceQuestions.filter(
      (question) => !answers[question.id],
    );

    // If there are unanswered questions
    if (unansweredQuestions.length > 0) {
      const firstUnanswered = unansweredQuestions[0];

      await Swal.fire({
        icon: "warning",
        title: "Unanswered Question",
        html: `
          <p class="text-gray-600">
            You still have <strong>${unansweredQuestions.length}</strong>
            unanswered question${unansweredQuestions.length > 1 ? "s" : ""}.
          </p>
          <p class="mt-2 text-gray-500">
            Please answer all questions before submitting.
          </p>
        `,
        confirmButtonText: "Go to Question",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        showCancelButton: false,
      });

      // Scroll after Swal closes
      setTimeout(() => {
        scrollToQuestion(firstUnanswered.id);
      }, 150);

      return;
    }

    // Ask for confirmation
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

    multipleChoiceQuestions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    const motivation = getMotivationalMessage(calculatedScore);

    // Show result
    await Swal.fire({
      icon: calculatedScore >= 7 ? "success" : "info",
      title: motivation.title,
      html: `
        <div class="py-2">
          <div class="text-5xl font-bold text-[#2E9B59] mb-3">
            ${calculatedScore}/${multipleChoiceQuestions.length}
          </div>

          <p class="text-gray-700 font-medium mb-2">
            ${Math.round(
              (calculatedScore / multipleChoiceQuestions.length) * 100,
            )}%
          </p>

          <p class="text-gray-600">
            ${motivation.message}
          </p>
        </div>
      `,
      confirmButtonText: "View My Answers",
      confirmButtonColor: "#2E9B59",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    // Scroll back to top
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
      confirmButtonColor: "#2E9B59",
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
        <div className="bg-white border-b border-[#E1ECE4]">
          <div className="max-w-[700px] mx-auto px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2E9B59]">
                  Planting Quiz
                </p>

                <h1 className="text-2xl font-bold text-[#214C31] mt-1">
                  Multiple Choice
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Choose the best answer for each question.
                </p>
              </div>

              {submitted && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Your Score</p>

                  <p className="text-2xl font-bold text-[#2E9B59]">
                    {score}/{multipleChoiceQuestions.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Questions */}
        <main className="max-w-[700px] mx-auto px-4 py-6">
          <div className="space-y-5">
            {multipleChoiceQuestions.map((question, index) => {
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.answer;
              const isAnswered = Boolean(selectedAnswer);

              return (
                <div
                  key={question.id}
                  ref={(element) => {
                    questionRefs.current[question.id] = element;
                  }}
                  className={`bg-white rounded-2xl p-5 border transition-all duration-300 ${
                    submitted
                      ? isCorrect
                        ? "border-green-200"
                        : "border-red-200"
                      : "border-[#E1ECE4]"
                  }`}
                >
                  {/* Question number */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#2E9B59] flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h2 className="font-semibold text-[#214C31] leading-relaxed">
                        {question.question}
                      </h2>

                      {/* Choices */}
                      <div className="mt-4 space-y-3">
                        {question.choices.map((choice, choiceIndex) => {
                          const selected = selectedAnswer === choice;
                          const correct = question.answer === choice;

                          let choiceStyle =
                            "border-[#E3EAE5] bg-white hover:bg-[#F4FBF6]";

                          if (!submitted && selected) {
                            choiceStyle =
                              "border-[#2E9B59] bg-[#EAF7EE] ring-1 ring-[#2E9B59]";
                          }

                          if (submitted && correct) {
                            choiceStyle = "border-green-400 bg-green-50";
                          }

                          if (submitted && selected && !correct) {
                            choiceStyle = "border-red-400 bg-red-50";
                          }

                          return (
                            <label
                              key={choiceIndex}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${choiceStyle}`}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={choice}
                                checked={selected}
                                disabled={submitted}
                                onChange={() =>
                                  handleAnswer(question.id, choice)
                                }
                                className="accent-[#2E9B59] w-4 h-4 shrink-0"
                              />

                              <span className="text-sm text-gray-700 leading-relaxed">
                                {choice}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Result and explanation */}
                      {submitted && (
                        <div
                          className={`mt-4 p-4 rounded-xl ${
                            isCorrect ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <p
                            className={`font-semibold text-sm ${
                              isCorrect ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                          </p>

                          {!isCorrect && (
                            <p className="text-sm text-gray-700 mt-2">
                              <span className="font-semibold">
                                Correct answer:
                              </span>{" "}
                              {question.answer}
                            </p>
                          )}

                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
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

          {/* Bottom Action */}
          <div className="mt-7 pb-8">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="w-full bg-[#2E9B59] hover:bg-[#25834B] active:scale-[0.98] text-white font-semibold py-4 rounded-2xl shadow-sm transition"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="w-full bg-[#2E9B59] hover:bg-[#25834B] active:scale-[0.98] text-white font-semibold py-4 rounded-2xl shadow-sm transition"
              >
                Try Again
              </button>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}

export default MultipleChoice;
