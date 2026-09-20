import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register({ darkMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-card">

          {/* Brand */}
          <div className="register-brand">

            <div className="register-logo">
              H
            </div>

            <span>HireTrack</span>

          </div>

          {/* Heading */}
          <div className="register-heading">

            <h1>Create Account</h1>

            <p>
              Create your HireTrack account and start managing your career.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="submit"
              className="create-account-button"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <div className="login-section">

            <span>
              Already have an account?
            </span>

            <Link to="/">
              Sign In
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;