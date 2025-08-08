import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { HomePage } from "./components/HomePage";
import ParticleBackground from "./components/ParticleBackground";

function App() {
    const navigate = useNavigate();

    axios.defaults.baseURL = "http://localhost:3000";

    useEffect(() => {
        const handleBackButton = (event) => {
            event.preventDefault();
            navigate("/"); // Always redirect to HomePage
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);

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
