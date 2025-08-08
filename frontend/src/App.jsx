import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { HomePage } from "./components/HomePage";
import ParticleBackground from "./components/ParticleBackground";
import axios from "axios";

function App() {
    axios.defaults.baseURL = "http://localhost:3000";

    return (
        <>
            <ParticleBackground />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
