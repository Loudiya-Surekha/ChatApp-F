import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // const { text } = req.body;

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // sendMessage: async (messageData) => {
  //   const { selectedUser, messages } = get();
  //   try {
  //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
  //     set({ messages: [...messages, res.data] });
  //   } catch (error) {
  //     console.log("Error in sendMessage:", error);
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   }
  // },

 sendMessage: async (receiverId, textMessage, file) => {
    try {
      const { messages } = get();

      const formData = new FormData();
      formData.append("text", textMessage);   

      if (file) {
        formData.append("file", file);
        formData.append("fileType", file.type);        
      }

      const res = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      set({ messages: [...messages, res.data] });

      return res.data;
    } catch (error) {
      console.log("Error in sendMessage:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },


  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


  //todo: optimize this one later
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
