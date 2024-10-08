import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      toast.success(response.data.message);

      localStorage.setItem("authToken", response.data.token);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        error.response?.data?.message || "Error signing up. Please try again."
      );
    }
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div
        className="card p-3 shadow-lg form-background"
        style={{ width: "24rem" }}
      >
        <h2 className="mb-3 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.name ? "is-invalid" : ""
              }`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div className="text-danger small">{errors.name}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control form-control-sm ${
                errors.email ? "is-invalid" : ""
              }`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <div className="text-danger small">{errors.email}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control form-control-sm ${
                errors.password ? "is-invalid" : ""
              }`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <div className="text-danger small">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-dark w-100 btn-sm">
            Sign Up
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0">
            Do you have an account?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
