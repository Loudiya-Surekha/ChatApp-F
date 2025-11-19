import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { themeColors } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  if (!selectedUser) return null;

   const currentTheme = themeColors[theme.toLowerCase()] || {
    bg: "#f8f9fa",
    text: "#000000",
  };

  return (
    <div className="p-2 border-bottom" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
      <div className="d-flex align-items-center justify-content-between">

        {/* Left Section */}
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle overflow-hidden"
            style={{ width: "45px", height: "45px" }}
          >
            <img
              src={selectedUser?.profilePic || "/images.png"}
              alt={selectedUser?.fullName || "User"}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* User Info */}
          <div>
            <h6 className="mb-0 fw-semibold" style={{ color: currentTheme.text }}>
              {selectedUser?.fullName || "Unknown User"}
            </h6>
            <small style={{ color: currentTheme.text }}>
              {onlineUsers?.includes(selectedUser?._id)
                ? "Online"
                : "Offline"}
            </small>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="btn btn-danger border"
          onClick={() => setSelectedUser(null)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
