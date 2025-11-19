import React, { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef(null);

  const { sendMessage, selectedUser } = useChatStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!text || !text.trim()) && !file) return;

    if (!selectedUser?._id) {
      setToastMessage("No user selected");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
      setIsSending(true);

      await sendMessage(selectedUser._id, text.trim(), file);

      // reset UI
      setText("");
      removeFile();
    } catch (err) {
      console.error("Failed to send message:", err);
      setToastMessage("Failed to send message");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-3 w-100 border-top" style={{ background: "transparent" }}>
      {/* FILE PREVIEW */}
      {file && (
        <div className="mb-3 d-flex align-items-center gap-2">
          {/* Image thumbnail */}
          {file.type.startsWith("image/") && imagePreview && (
            <div className="position-relative">
              <img
                src={imagePreview}
                alt="preview"
                className="rounded border"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <button
                onClick={removeFile}
                type="button"
                className="position-absolute top-0 end-0 translate-middle btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                style={{ width: 20, height: 20 }}
                aria-label="Remove file"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Non-image preview: show icon + name */}
          {!file.type.startsWith("image/") && (
            <div className="d-flex align-items-center gap-2">
              <div className="p-3 border rounded bg-light text-dark d-flex align-items-center">
                {file.type === "application/pdf" && <span className="me-2">📄</span>}
                {file.type.startsWith("video/") && <span className="me-2">🎥</span>}
                {file.type.startsWith("audio/") && <span className="me-2">🎵</span>}
                {!(
                  file.type === "application/pdf" ||
                  file.type.startsWith("video/") ||
                  file.type.startsWith("audio/")
                ) && <span className="me-">📎</span>}
                <span style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
              </div>

              <button
                onClick={removeFile}
                type="button"
                className="btn btn-sm btn-danger rounded-circle p-1"
                aria-label="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="mb-2">
          <div className="alert alert-warning py-1 px-2 mb-0">{toastMessage}</div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-0">
        <div className="flex-grow-1 d-flex gap-1 align-items-center">
          <input
            type="text"
            className="form-control form-control-sm rounded"
            placeholder={selectedUser ? `Message ${selectedUser.fullName || "user"}` : "Select a user to message"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!selectedUser}
          />

          <input
            type="file"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
            className="d-none"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="btn btn-outline-secondary d-none d-sm-flex rounded-circle p-2"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
          >
            <Image size={18} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
          disabled={(!text || !text.trim()) && !file || isSending || !selectedUser}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
