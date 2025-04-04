import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CoupleDatesPage from "./pages/CoupleDatesPage";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/couple-dates" element={<CoupleDatesPage />} />
          </Route>
        </Routes>
  );
}

export default App;
