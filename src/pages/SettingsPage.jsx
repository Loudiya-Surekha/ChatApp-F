// import React, { useEffect, useState } from "react";
import { THEMES, themeColors } from "../constants/index";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  // Determine text color class based on theme
  const textClass = ["dark", "dracula", "black", "night"].includes(theme) ? "text-light" : "text-dark";

  return (
    <div
      className={`container-fluid min-vh-100 py-5 ${textClass}`} 
        style={{
    backgroundColor: themeColors[theme]?.bg,
    color: themeColors[theme]?.text,
    paddingLeft: "200px",
    paddingRight: "200px",
  }}
    >
      <div className="pt-5 px-10">
        {/* Theme Selector */}
        <div className="mb-4">
          <h2 className={`fw-semibold fs-4 ${textClass}`}>Theme</h2>
          <p className={`small ${textClass}`}>
            Choose a theme for your chat interface
          </p>
        </div>

        <div className={`row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3 mb-5 ${textClass}`}>
          {THEMES.map((t) => (
            <div className="col" key={t}>
              <button
                onClick={() => setTheme(t)}
                className={`btn w-100 border-0 rounded-3 p-2 d-flex flex-column align-items-center shadow-sm`}
                style={{
                  backgroundColor:
                    theme === t && ["dark", "dracula", "black", "night"].includes(t)
                      ? "#2c2c2c"
                      : undefined,
                  color:
                    theme === t && ["dark", "dracula", "black", "night"].includes(t)
                      ? "#ffffff"
                      : undefined,
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  className="position-relative w-100 rounded-2 overflow-hidden mb-2"
                  style={{ height: "32px" }}
                  data-theme={t}
                >
                  <div
                    className="d-grid"
                    style={{
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "2px",
                      padding: "2px",
                    }}
                  >
                    <div className="rounded bg-primary" style={{ height: "100%" }}></div>
                    <div className="rounded bg-secondary" style={{ height: "100%" }}></div>
                    <div className="rounded bg-info" style={{ height: "100%" }}></div>
                    <div className="rounded bg-dark" style={{ height: "100%" }}></div>
                  </div>
                </div>
                <span className="small fw-medium text-center text-truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className={`mb-3 fw-semibold ${textClass}`}>Preview</h3>
        <div
          className="rounded shadow border p-3 mx-auto"
          style={{
            maxWidth: "600px",
            backgroundColor: themeColors[theme]?.bg,
            color: themeColors[theme]?.text,
          }}
        >
          {/* Mock Chat UI */}
          <div className="rounded shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div
              className={`d-flex align-items-center gap-2 px-3 py-2 border-bottom ${textClass}`}
              style={{ backgroundColor: themeColors[theme]?.bg }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: themeColors[theme]?.text,
                  color: themeColors[theme]?.bg,
                  fontWeight: "bold",
                }}
              >
                J
              </div>
              <div>
                <h6 className="mb-0">John Doe</h6>
                <small className={textClass}>Online</small>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-3 overflow-auto" style={{ maxHeight: "200px" }}>
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex ${message.isSent ? "justify-content-end" : "justify-content-start"} mb-2`}
                >
                  <div
                    className={`p-2 rounded shadow-sm`}
                    style={{
                      maxWidth: "80%",
                      backgroundColor: message.isSent ? themeColors[theme]?.text : themeColors[theme]?.bg,
                      color: message.isSent ? themeColors[theme]?.bg : themeColors[theme]?.text,
                    }}
                  >
                    <p className="mb-1 small">{message.content}</p>
                    <p className="text-end mb-0 small">12:00 PM</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="d-flex border-top px-3 py-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type a message..."
                value="This is a preview"
                readOnly
                style={{
                  backgroundColor: themeColors[theme]?.bg,
                  color: themeColors[theme]?.text,
                  borderColor: "#ccc",
                }}
              />
              <button className="btn btn-primary">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
