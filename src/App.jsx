import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Lessons from "./routes/Lessons";
import Quiz from "./routes/Quiz";
import MultipleChoice from "./routes/MultipleChoice";
import FillInTheBlanks from "./routes/FillInTheBlanks";
import TrueOrFalse from "./routes/TrueOrFalse";
import WhatArePlants from "./routes/WhatArePlants";
import PartsOfPlants from "./routes/PartsOfPlants";
import WhatPlantsNeedToGrow from "./routes/WhatPlantsNeedToGrow";
import UnderstandingTheSoil from "./routes/UnderstandingTheSoil";
import Welcome from "./routes/Welcome";
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


        <Route path="/what-are-plants" element={<WhatArePlants/>} />
        <Route path="/parts-of-plant" element={<PartsOfPlants/>} />
        <Route path="/what-plants-need-to-grow" element={<WhatPlantsNeedToGrow/>} />
        <Route path="/understanding-the-soil" element={<UnderstandingTheSoil/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
