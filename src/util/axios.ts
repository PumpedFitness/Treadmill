import { Axios } from 'axios'

const axios = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: () => true
})

export const isBackendReachable = async (): Promise<boolean> => {
  try {
    const res = await axios.get("/status")
    return res.status === 200
  } catch {
    return false
  }
}
