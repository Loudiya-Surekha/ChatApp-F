// import React, { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import { useChatStore } from "../store/useChatStore";
// import MessageSkeleton from "../Components/skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils.js";
// import { themeColors } from "../constants/index.js";
// import { useThemeStore } from "../store/useThemeStore.js";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const { authUser } = useAuthStore();
//   const messagesEndRef = useRef(null);
//   const { theme } = useThemeStore();

//   const currentTheme = themeColors[theme.toLowerCase()] || {
//     bg: "#1c1c1c",
//     text: "#ffffff",
//     bubbleMine: "#2563EB",
//     bubbleOther: "#333333",
//   };

//   useEffect(() => {
//     if (selectedUser?._id) {
//       getMessages(selectedUser._id);
//     }
//     subscribeToMessages();
//     return () => unsubscribeFromMessages();
//   }, [selectedUser?._id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // FILE RENDERING (Images, Videos, PDF, Docs)
//   const renderFile = (message) => {
//     if (!message.media) return null;

//     const url = message.media;
//     const type = message.mediaType || "";

//     // IMAGE
//     if (type.startsWith("image/")) {
//       return (
//         <img
//           src={url}
//           alt="sent-img"
//           className="img-fluid rounded-3 mt-1"
//           style={{
//             maxWidth: "100%",
//             width: "auto",
//             display: "block",
//           }}
//         />
//       );
//     }

//     // VIDEO
//     if (type.startsWith("video/")) {
//       return (
//         <video
//           controls
//           className="mt-2 rounded"
//           style={{ width: "260px", borderRadius: "10px" }}
//         >
//           <source src={url} type={type} />
//         </video>
//       );
//     }

//     // PDF / DOC / DOCX / EXCEL etc — show inside same screen
//     return (
//       <iframe
//         src={url}
//         title="file-preview"
//         className="mt-2"
//         style={{
//           width: "100%",
//           height: "100%",
//           borderRadius: "10px",
//           border: "1px solid #ccc",
//           overflow: "hidden",
//         }}
//         scrolling="no"
//       />
//     );
//   };

//   if (isMessagesLoading) {
//     return (
//       <div
//         className="d-flex flex-column flex-grow-1 overflow-auto"
//         style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
//       >
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div
//       className="d-flex flex-column flex-grow-1 overflow-auto"
//       style={{
//         paddingTop: "60px",
//         backgroundColor: currentTheme.bg,
//         color: currentTheme.text,
//       }}
//     >
//       <ChatHeader />

//       <div className="flex-grow-1 overflow-auto p-3">
//         {messages.map((message, index) => {
//           const isMine = message.senderId === authUser._id;

//           return (
//             <div
//               key={message._id || index}
//               className={`d-flex mb-4 ${
//                 isMine ? "justify-content-end" : "justify-content-start"
//               }`}
//             >
//               {/* Other user's profile image */}
//               {!isMine && (
//                 <img
//                   src={selectedUser.profilePic || "/images.png"}
//                   alt="avatar"
//                   className="rounded-circle border me-2"
//                   style={{ width: "38px", height: "38px", objectFit: "cover" }}
//                 />
//               )}

//               <div className="d-flex flex-column" style={{ maxWidth: "70%" }}>
//                 <div
//                   className="p-2 rounded-4 shadow-sm"
//                   style={{
//                     backgroundColor: isMine
//                       ? currentTheme.bubbleMine
//                       : currentTheme.bubbleOther,
//                     color: currentTheme.text,
//                   }}
//                 >
//                   {/* TEXT MESSAGE */}
//                   {message.text && (
//                     <p className="mb-1" style={{ fontSize: "0.9rem" }}>
//                       {message.text}
//                     </p>
//                   )}

//                   {/* MEDIA INSIDE MESSAGE */}
//                   {renderFile(message)}
//                 </div>

//                 {/* Time */}
//                 <time
//                   className="small text-black mt-1"
//                   style={{ fontSize: "0.75rem" }}
//                 >
//                   {formatMessageTime(message.createdAt)}
//                 </time>
//               </div>

//               {/* My profile image (right side) */}
//               {isMine && (
//                 <img
//                   src={authUser.profilePic || "/images.png"}
//                   alt="avatar"
//                   className="rounded-circle border ms-1"
//                   style={{ width: "38px", height: "38px", objectFit: "cover" }}
//                 />
//               )}
//             </div>
//           );
//         })}

//         <div ref={messagesEndRef} />
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;




import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "../Components/skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils.js";
import { themeColors } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const { theme } = useThemeStore();

  const currentTheme = themeColors[theme.toLowerCase()] || {
    bg: "#1c1c1c",
    text: "#ffffff",
    bubbleMine: "#2563EB",
    bubbleOther: "#333333",
  };

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FIXED FILE RENDERING FOR IMAGES + BOOTSTRAP
  const renderFile = (message) => {
    if (!message.media) return null;

    const url = message.media;
    const type = message.mediaType || "";

    // IMAGE — FIXED (Bootstrap responsive)
    if (type.startsWith("image/")) {
      return (
        <div className="mt-2 w-100">
          <img
            src={url}
            alt="sent-img"
            className="img-fluid rounded-3 border"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      );
    }

    // VIDEO
    if (type.startsWith("video/")) {
      return (
        <video
          controls
          className="mt-2 rounded border"
          style={{ width: "260px", borderRadius: "10px" }}
        >
          <source src={url} type={type} />
        </video>
      );
    }

    // PDF / DOC — Removed scroller issue
    return (
      <iframe
        src={url}
        className="mt-2 w-100 border rounded"
        style={{
          height: "400px",
          overflow: "hidden",
        }}
      />
    );
  };

  if (isMessagesLoading) {
    return (
      <div
        className="d-flex flex-column flex-grow-1 overflow-auto"
        style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      >
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column flex-grow-1 overflow-auto"
      style={{
        paddingTop: "60px",
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
      }}
    >
      <ChatHeader />

      <div className="flex-grow-1 overflow-auto p-3">
        {messages.map((message, index) => {
          const isMine = message.senderId === authUser._id;

          return (
            <div
              key={message._id || index}
              className={`d-flex mb-4 ${
                isMine ? "justify-content-end" : "justify-content-start"
              }`}
            >
              {/* Other user's image */}
              {!isMine && (
                <img
                  src={selectedUser.profilePic || "/images.png"}
                  alt="avatar"
                  className="rounded-circle border me-2"
                  style={{ width: "38px", height: "38px", objectFit: "cover" }}
                />
              )}

              <div className="d-flex flex-column" style={{ maxWidth: "70%" }}>
                <div
                  className="p-2 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: isMine
                      ? currentTheme.bubbleMine
                      : currentTheme.bubbleOther,
                    color: currentTheme.text,
                  }}
                >
                  {/* TEXT */}
                  {message.text && (
                    <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                      {message.text}
                    </p>
                  )}

                  {/* MEDIA */}
                  {renderFile(message)}
                </div>

                {/* TIME */}
                <time
                  className="small text-black mt-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* My image */}
              {isMine && (
                <img
                  src={authUser.profilePic || "/images.png"}
                  alt="avatar"
                  className="rounded-circle border ms-1"
                  style={{ width: "38px", height: "38px", objectFit: "cover" }}
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
