import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import ParticleBackground from "../components/ParticleBackground";
import axios from "axios";
import { Link } from "react-router-dom";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        console.log(data); // Debug log
        setLoading(true);
        try {
            const res = await axios.post(`/api/auth/register`, data);
            console.log(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
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
                        Create Account
                    </h3>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {/* Name */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="John Doe"
                                {...register("name", { required: true })}
                            />
                            <label htmlFor="name">Full Name</label>
                        </div>

                        {/* Email */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                {...register("email", { required: true })}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>

                        {/* Role Selection */}
                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="role"
                                {...register("role", { required: true })}
                                defaultValue="user"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <label htmlFor="role">Select Role</label>
                        </div>

                        {/* Password */}
                        <div className="form-floating mb-3 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
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

                        {/* Error placeholder */}
                        <div
                            className="text-danger small mb-3"
                            style={{ minHeight: "18px" }}
                        >
                            {errors.role && "Please select a role."}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-center text-muted">
                        Already have an account?{" "}
                        <Link to="/login" className="fw-semibold text-primary">
                            Login
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
