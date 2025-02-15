"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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

    // Validate role
    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Redirect to login page after successful signup
      router.push("/home");
    } catch (err) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          <h1>Welcome</h1>
          <p>Sign up to continue</p>
        </div>

        <input
          className="input"
          name="name"
          placeholder="Username"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />

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

        {/* Role Selection */}
        <div className="roleContainer">
          <div className="titleText">Who are you?</div>
          <div className="subText">Please select your role to proceed.</div>
          <div className="buttonContainer">
            {["Researcher", "Entrepreneur", "Investor", "Mentor"].map(
              (r) => (
                <button
                  key={r}
                  type="button"
                  className={`roles ${
                    formData.role === r.toLowerCase().replace(" ", "_")
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: r.toLowerCase().replace(" ", "_"),
                    }))
                  }
                  disabled={loading}
                >
                  {r}
                </button>
              )
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="button-confirm" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
