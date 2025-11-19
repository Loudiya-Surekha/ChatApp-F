import Sidebar from "../Components/SideBar";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="d-flex w-100" style={{ height: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>

    </div>
  );    
}

export default HomePage;
