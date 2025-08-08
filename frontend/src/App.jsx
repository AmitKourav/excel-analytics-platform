import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { LandingPage } from "./components/LandingPage";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import ParticleBackground from "./components/ParticleBackground";
import axios from "axios";


function App() {
    axios.defaults.baseURL = "http://localhost:3000";

    return (
        <>
            <ParticleBackground />

            <Routes>
                {/* <Route path="/" element={<LandingPage></LandingPage>}></Route> */}
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </>
    );
}

export default App;
