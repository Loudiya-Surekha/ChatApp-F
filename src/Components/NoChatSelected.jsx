import { MessageSquare } from 'lucide-react';
import '../NoChatSelected.css';
import { themeColors } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function NoChatSelected() {
  const { theme } = useThemeStore();

   const currentTheme = themeColors[theme.toLowerCase()] || {
    bg: '#f8f9fa',
    text: '#000000',
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
      <div className="text-center p-4" style={{ maxWidth: '400px' }}>
        {/* Icon Display */}
        <div className="d-flex justify-content-center mb-4">
          <div className="position-relative">
            <div  className="popup-icon rounded-3 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: currentTheme.bubbleMine || '#2563EB' }}>
              <MessageSquare className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="fw-bold mb-3">Welcome to Chatty!</h2>
        <p className="text-black" >
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
