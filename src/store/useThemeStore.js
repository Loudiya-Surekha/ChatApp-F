import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark", // default theme
  setTheme: (newTheme) => {
    localStorage.setItem("chat-theme", newTheme);
    set({ theme: newTheme});
  },
}));


// import { create } from "zustand";

// export const useThemeStore = create((set) => ({
//   theme: "light", // default theme
//   setTheme: (newTheme) => set({ theme: newTheme }),
// }));
