import { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { LandingPage } from "./components/LandingPage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import ParticleBackground from "./components/ParticleBackground";
import axios from "axios";

function App() {
    axios.defaults.baseURL = "http://localhost:3000";
    const navigate = useNavigate();

    return (
        <>
            <ParticleBackground />

            {/* Landing buttons */}
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Welcome</h1>
                <button
                    onClick={() => navigate("/login")}
                    style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                    }}
                >
                    Go to Login
                </button>
                <button
                    onClick={() => navigate("/signup")}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                    }}
                >
                    Go to Signup
                </button>
            </div>

            <Routes>
                {/* <Route path="/" element={<LandingPage />} /> */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
