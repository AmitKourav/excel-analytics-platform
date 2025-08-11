import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ParticleBackground from "../components/ParticleBackground";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";  

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post(`/api/auth/login`, data);
            toast.success("Login successful! 🎉");
            console.log(res.data);
        } catch (error) {
            const msg = error.response?.data?.message || "Invalid credentials!";
            toast.error(msg);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = {
        emailValidator: {
            required: { value: true, message: "*Please Enter This Field" },
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "*Enter a valid email",
            },
        },
        passwordValidator: {
            required: { value: true, message: "*Please Enter This Field" },
            minLength: { value: 6, message: "*Minimum password Length is 6" },
        },
    };

    return (
        <div>
            <ParticleBackground />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div
                    className="card p-4 shadow-lg"
                    style={{ maxWidth: "400px", width: "100%" }}
                >
                    <h3 className="text-center mb-4 fw-bold text-primary">
                        Login
                    </h3>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {/* Email */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                {...register(
                                    "email",
                                    validationSchema.emailValidator
                                )}
                            />
                            <span className="errormsg">
                                {errors.email?.message}
                            </span>
                            <label htmlFor="email">Email address</label>
                        </div>

                        {/* Password */}
                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                {...register(
                                    "password",
                                    validationSchema.passwordValidator
                                )}
                            />
                            <span className="errormsg">
                                {errors.password?.message}
                            </span>
                            <label htmlFor="password">Password</label>
                            <small
                                className="text-primary position-absolute"
                                style={{
                                    right: "15px",
                                    top: "15px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </small>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-center text-muted">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="fw-semibold text-primary">
                            Signup
                        </Link>
                    </p>

                    <div className="text-center mt-3">
                        <Link
                            to="/"
                            className="btn btn-outline-secondary btn-sm"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
