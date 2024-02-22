import axios from "axios"

console.log(import.meta.env.VITE_BASE_URL)
export const requestApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

export const naverApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    "X-Naver-Client-Id": "kpKG4p3MgYHXqYMe_ADZ",
    "X-Naver-Client-Secret": "wUX73RWX7R"
  }
})

