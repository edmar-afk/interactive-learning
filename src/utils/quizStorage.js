
const QUIZ_SCORES_KEY = "quizScores";

export function getQuizScores() {
  try {
    return JSON.parse(
      localStorage.getItem(QUIZ_SCORES_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveQuizScore({
  quizType,
  score,
  totalQuestions,
}) {
  const percentage =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 10000) / 100
      : 0;

  const quizScores = getQuizScores();

  const existingIndex = quizScores.findIndex(
    (quiz) => quiz.quizType === quizType
  );

  const updatedRecord = {
    quizType,
    score,
    totalQuestions,
    percentage,
    date: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    // Update the existing quiz record
    quizScores[existingIndex] = updatedRecord;
  } else {
    // Create a record if this quiz type doesn't exist
    quizScores.push(updatedRecord);
  }

  localStorage.setItem(
    QUIZ_SCORES_KEY,
    JSON.stringify(quizScores)
  );

  return updatedRecord;
}
