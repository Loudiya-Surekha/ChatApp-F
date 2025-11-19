import {MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2} from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast, { Toaster } from "react-hot-toast";
import { useThemeStore } from "../store/useThemeStore";
import { themeColors } from "../constants";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useThemeStore(); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column flex-lg-row justify-content-center align-items-center p-0"
      style={{
        backgroundColor: themeColors[theme]?.bg,
        overflowX: "hidden",
        height: "calc(100vh - 80px)",
      }}
    >
      {/* Form Section */}
      <div
        className="row w-100 justify-content-center m-0"
        style={{ marginTop: "180px" }}
      >
        <div className="col-lg-6 col-md-8 col-sm-10 d-flex flex-column align-items-center">
          {/* Header Section */}
          <div className="text-center mb-2">
            {" "}
            {/* reduced margin-bottom */}
            <div className="d-flex flex-column align-items-center gap-1">
              {" "}
              {/* reduced gap */}
              <div
                className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                style={{
                  width: "45px", // slightly smaller icon container
                  height: "45px",
                  transition: "background-color 0.3s ease",
                }}
              >
                <MessageSquare size={22} className="text-primary" />{" "}
                {/* slightly smaller icon */}
              </div>
              <h1 className="h5 fw-bold mt-2 text-black">Create Account</h1>{" "}
              {/* smaller heading */}
              <p style={{ color: "#000000", marginBottom: "5px" }}>
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 rounded shadow-sm w-100" // reduced padding
            style={{
              maxWidth: "350px", // smaller form width
              backgroundColor: themeColors[theme]?.bg,
              color: "#000000",
            }}
          >
            {/* Full Name */}
            <div className="mb-3">
              {" "}
              {/* reduced margin */}
              <label
                className="form-label fw-medium"
                style={{ color: "#000000" }}
              >
                Full Name
              </label>
              <div className="position-relative">
                <span
                  className="position-absolute top-50 start-0 translate-middle-y ps-3 text-black"
                  style={{ pointerEvents: "none", color: "#000000" }}
                >
                  <User size={16} /> {/* smaller icon */}
                </span>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  style={{
                    backgroundColor: themeColors[theme]?.bg,
                    color: "#000000",
                    borderColor: "#000000",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label fw-medium"
                style={{ color: "#000000" }}
              >
                Email
              </label>
              <div className="position-relative">
                <span
                  className="position-absolute top-50 start-0 translate-middle-y ps-3 text-black"
                  style={{ pointerEvents: "none", color: "#000000" }}
                >
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  className="form-control ps-5"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    backgroundColor: themeColors[theme]?.bg,
                    color: "#000000",
                    borderColor: "#000000",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                className="form-label fw-medium"
                style={{ color: "#000000" }}
              >
                Password
              </label>
              <div className="position-relative">
                <span
                  className="position-absolute top-50 start-0 translate-middle-y ps-3 text-black"
                  style={{ pointerEvents: "none", color: "#000000" }}
                >
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control ps-5 pe-5"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  style={{
                    backgroundColor: themeColors[theme]?.bg,
                    color: "#000000",
                    borderColor: "#000000",
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-black" />
                  ) : (
                    <Eye size={16} className="text-black" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Already have account */}
            <div className="text-center mt-2">
              <p style={{ color: "#000000" }} className="mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* AuthImagePattern */}
      <div className="d-none d-lg-flex w-50 align-items-center justify-content-center p-3 text-black">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>

      <Toaster />
    </div>
  );
}

export default SignUpPage;
