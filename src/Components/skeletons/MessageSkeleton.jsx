import React from "react";

function MessageSkeleton() {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div
      className="flex-grow-1 overflow-auto p-3"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`d-flex mb-4 ${
            idx % 2 === 0 ? "justify-content-start" : "justify-content-end"
          }`}
        >
          <div className="me-2">
            <div
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--border-color, #ccc)", 
                opacity: 0.25,
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                width: "80px",
                height: "12px",
                borderRadius: "4px",
                backgroundColor: "var(--border-color, #ccc)",
                opacity: 0.25,
                marginBottom: "0.5rem",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "var(--border-color, #ccc)",
                opacity: 0.25,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageSkeleton;
