import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 gap-3">
            <h1 className="mb-4">Welcome</h1>

            <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-lg px-4"
            >
                Go to Login
            </button>

            <button
                onClick={() => navigate("/signup")}
                className="btn btn-success btn-lg px-4"
            >
                Go to Signup
            </button>
        </div>
    );
}
