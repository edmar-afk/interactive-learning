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
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/lessons" element={<Lessons />} />

        <Route path="/quiz" element={<Quiz />} />
        <Route path="/multiple-choice" element={<MultipleChoice />} />
        <Route path="/fill-in-the-blanks" element={<FillInTheBlanks />} />
        <Route path="/true-or-false" element={<TrueOrFalse/>} />


       <Route path="/soil-preparation" element={<SoilPreparation/>} />
       <Route path="/handling-of-seedlings" element={<HandlingOfSeedlings/>} />
       <Route path="/seeding-depth" element={<SeedlingDepth/>} />
       <Route path="/spacing-of-plants" element={<SpacingOfPlants/>} />
       <Route path="/watering-technique" element={<WateringTechnique/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
