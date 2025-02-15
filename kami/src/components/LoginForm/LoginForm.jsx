"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store the token and role in localStorage
      localStorage.setItem("token", data.token);
      if (data.role) {
        localStorage.setItem("userRole", data.role);
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </div>

        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="button-confirm" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="footer-text">
          <p>
            Don't have an account?{" "}
            <span
              className="link-text"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
