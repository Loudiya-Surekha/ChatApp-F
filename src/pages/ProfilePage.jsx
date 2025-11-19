import React, { useState } from "react";
import { Camera, User, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { themeColors } from "../constants/index";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const { theme } = useThemeStore(); // current theme

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        if (typeof updateProfile === "function") {
          await updateProfile({ profilePic: base64Image });
        } else {
          const res = await fetch("/api/user/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profilePic: base64Image }),
          });
          if (!res.ok) throw new Error(`Update failed: ${res.status}`);
          const data = await res.json();
          useAuthStore.getState().set({ authUser: data.user });
        }
      } catch (err) {
        console.error("Profile update failed:", err);
      }
    };
  };

  return (
    <div
      style={{
        backgroundColor: themeColors[theme]?.bg,
        color: themeColors[theme]?.text,
        color: "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="min-vh-100 pt-5">
        <div className="container py-5">
          <div
            className="card mx-auto shadow rounded-4"
            style={{
              maxWidth: "650px",
              backgroundColor: themeColors[theme]?.bg,
              color: themeColors[theme]?.text,
              borderColor: themeColors[theme]?.text,
            }}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-semibold mb-2">Profile</h2>
                <p className="text-black mb-4">Your profile information</p>
              </div>

              {/* Avatar Upload Section */}
              <div className="d-flex flex-column align-items-center gap-3 mb-4">
                <div className="position-relative">
                  <img
                    src={selectedImg || authUser?.profilePic || "/images.png"}
                    alt="Profile"
                    className="rounded-circle border border-3 border-primary"
                    style={{ width: "130px", height: "130px", objectFit: "cover" }}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`position-absolute bottom-0 end-0 bg-primary text-white d-flex align-items-center justify-content-center rounded-circle p-2 shadow ${
                      isUpdatingProfile ? "opacity-50 pointer-events-none" : "cursor-pointer"
                    }`}
                    style={{ transform: "translate(25%, -25%)", transition: "all 0.2s ease" }}
                  >
                    <Camera size={18} />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                <p className="text-black small mb-0">
                  {isUpdatingProfile
                    ? "Uploading..."
                    : "Click the camera icon to update your photo"}
                </p>
              </div>

              {/* User Info Section */}
              <div className="mb-5">
                <div className="mb-3">
                  <div className="small text-secondary d-flex align-items-center gap-2 mb-1">
                    <User size={16} />
                    Full Name
                  </div>
                  <p
                    className="form-control"
                    style={{
                      backgroundColor: themeColors[theme]?.bg,
                      color: themeColors[theme]?.text,
                      borderColor: themeColors[theme]?.text,
                    }}
                  >
                    {authUser?.fullName}
                  </p>
                </div>

                <div>
                  <div className="small text-secondary d-flex align-items-center gap-2 mb-1">
                    <Mail size={16} />
                    Email Address
                  </div>
                  <p
                    className="form-control"
                    style={{
                      backgroundColor: themeColors[theme]?.bg,
                      color: themeColors[theme]?.text,
                      borderColor: themeColors[theme]?.text,
                    }}
                  >
                    {authUser?.email}
                  </p>
                </div>
              </div>

              {/* Account Information Section */}
              <div
                className="rounded-3 p-4 border"
                style={{
                  backgroundColor: themeColors[theme]?.bg,
                  color: themeColors[theme]?.text,
                  borderColor: themeColors[theme]?.text,
                }}
              >
                <h5 className="fw-medium mb-3">Account Information</h5>
                <div className="small">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span>Member Since</span>
                    <span>{authUser?.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span>Account Status</span>
                    <span className="text-success fw-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
