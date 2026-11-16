
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Lessons from "./routes/Lessons";
import Quiz from "./routes/Quiz";
import MultipleChoice from "./routes/MultipleChoice";
import FillInTheBlanks from "./routes/FillInTheBlanks";
import TrueOrFalse from "./routes/TrueOrFalse";
import Welcome from "./routes/Welcome";
import SoilPreparation from "./routes/SoilPreparation";
import HandlingOfSeedlings from "./routes/HandlingOfSeedlings";
import SeedlingDepth from "./routes/SeedingDepth";
import SpacingOfPlants from "./routes/SpacingOfPlants";
import WateringTechnique from "./routes/WateringTechnique";
import Profile from "./routes/Profile";
import Files from "./routes/Files";
import Students from "./routes/Students";

// Quiz Components
import SeedlingDepthQuiz from "./components/quizzes/SeedlingDepthQuiz";
import SoilPreparationQuiz from "./components/quizzes/SoilPreparationQuiz";
import HandlingOfSeedlingsQuiz from "./components/quizzes/HandlingOfSeedlingsQuiz";
import SpacingOfPlantsQuiz from "./components/quizzes/SpacingOfPlantsQuiz";
import WateringTechniqueQuiz from "./components/quizzes/WateringTechniquesQuiz";

// Bottom Navigation
import BottomNav from "./components/BottomNav";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

// Layout for all quiz pages
function QuizLayout({ children }) {
  return (
    <>
      <div className="pb-24">
        {children}
      </div>

      <BottomNav />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/files" element={<Files />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/students" element={<Students />} />

        {/* Quiz Selection Routes */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/multiple-choice" element={<MultipleChoice />} />
        <Route path="/fill-in-the-blanks" element={<FillInTheBlanks />} />
        <Route path="/true-or-false" element={<TrueOrFalse />} />

        {/* Lesson Routes */}
        <Route path="/soil-preparation" element={<SoilPreparation />} />
        <Route path="/handling-of-seedlings" element={<HandlingOfSeedlings />} />
        <Route path="/seeding-depth" element={<SeedlingDepth />} />
        <Route path="/spacing-of-plants" element={<SpacingOfPlants />} />
        <Route path="/watering-technique" element={<WateringTechnique />} />

        {/* Individual Quiz Routes - With BottomNav and Bottom Padding */}
        <Route
          path="/seedling-depth-quiz"
          element={
            <QuizLayout>
              <SeedlingDepthQuiz />
            </QuizLayout>
          }
        />

        <Route
          path="/soil-preparation-quiz"
          element={
            <QuizLayout>
              <SoilPreparationQuiz />
            </QuizLayout>
          }
        />

        <Route
          path="/handling-of-seedlings-quiz"
          element={
            <QuizLayout>
              <HandlingOfSeedlingsQuiz />
            </QuizLayout>
          }
        />

        <Route
          path="/spacing-of-plants-quiz"
          element={
            <QuizLayout>
              <SpacingOfPlantsQuiz />
            </QuizLayout>
          }
        />

        <Route
          path="/watering-technique-quiz"
          element={
            <QuizLayout>
              <WateringTechniqueQuiz />
            </QuizLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
