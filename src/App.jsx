import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./themes.css";
import { useThemeStore } from "./store/useThemeStore";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Route, Routes } from "react-router-dom";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

// if (themeColors[theme.toLowerCase()]) {
//   document.body.style.backgroundColor = themeColors[theme.toLowerCase()].bg;
//   document.body.style.color = themeColors[theme.toLowerCase()].text;
// }

document.body.setAttribute(
  "data-bs-theme",
  localStorage.getItem("chat-theme") || "dark"
);


function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    const { theme} = useThemeStore();
    console.log({onlineUsers})
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div data-theme= {theme}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/"  element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
