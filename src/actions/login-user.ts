import type { User } from '@/types/user.ts'
import { axiosInstance } from '@/util/axios.ts'
import { useUserStore } from '@/stores/user-store.ts'

export const loginUser = async (email: string, password: string): Promise<User | null> =>  {
  const result = await axiosInstance.post("/api/v1/user/login", { email, password })

  if (result.status !== 200) {
    return null
  }

  const user = result.data as User
  await useUserStore().storeUser(user)

  return result.data
}
