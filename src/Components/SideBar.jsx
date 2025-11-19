import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import { themeColors } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function SideBar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    getUsers();
  }, []);

   const currentTheme = themeColors[theme.toLowerCase()] || {
    bg: "#ffffff",
    text: "#000000",
    bubbleMine: "#2563EB",
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
       className="border-end d-flex flex-column"
      style={{
        width: "270px",
        minHeight: "100vh",
        background: currentTheme.bg,
        paddingTop: "60px",
        color: currentTheme.text,
      }}
    >
      {/* Header */}
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users style={{ width: "20px", height: "20px", color: currentTheme.text }}  />
          <span className="fw-semibold" style={{ color: currentTheme.text }}>
            Contacts
          </span>
        </div>

        {/* Show Online Only */}
        <div
          className="mt-3 d-flex align-items-center gap-2"
           style={{ color: currentTheme.text }}
        >
          <label
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-check-input"
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                borderColor: "black",
              }}
            />

            <span className="small" style={{ color: currentTheme.text }}>
              Show online only
            </span>
          </label>

          <span className="small" style={{ color: currentTheme.text }}>
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* User List */}
      <div
        className="flex-grow-1 overflow-auto"
        style={{ maxHeight: "calc(100vh - 60px)" }}
      >
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`btn text-start w-100 d-flex align-items-center gap-3 py-3 
                ${
                  selectedUser?._id === user._id
                    ? "bg-light border border-primary"
                    : "border-0"
                }
              `}
              style={{ borderRadius: 0, transition: "0.2s" }}
            >
              {/* Avatar */}
              <div className="position-relative">
                <img
                  src={user.profilePic || "/images.png"}
                  alt={user.fullName}
                  className="rounded-circle"
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                  }}
                />

                {isOnline && (
                  <span
                    className="position-absolute bottom-0 end-0 rounded-circle border border-light"
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "green",
                    }}
                  />
                )}
              </div>

              {/* User Info */}
              <div className="d-flex flex-column">
                <div className="fw-semibold" style={{ color: currentTheme.text }}>{user.fullName}</div>
                <div className="text-muted small">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
        {filteredUsers.length === 0 && (
          <div className="py-4 text-center" style={{ color: currentTheme.text }}>No online users</div>
        )}
      </div>
    </aside>
  );
}
export default SideBar;
