import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${import.meta.env.VITE_API_TJ_KEY}`,
  }
});

export const apiChat = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_CHAT_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${import.meta.env.VITE_API_TJ_KEY}`,
  }
})

export const apiChatQwen = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QWEN_DEEPBLUE_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_QWEN_DEEPBLUE_API_KEY}`
    // Authorization: `Bearer ${import.meta.env.VITE_API_TJ_KEY}`,
  }
})