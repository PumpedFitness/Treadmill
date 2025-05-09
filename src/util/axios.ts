import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: () => true,
  withCredentials: true,
})

export const isBackendReachable = async (): Promise<boolean> => {
  try {
    const res = await axiosInstance.get("/status")
    return res.status === 200
  } catch {
    return false
  }
}
