import type { User } from '@/types/user.ts'
import { useUserStore } from '@/stores/user-store.ts'

export const useUser = async (): Promise<User> => {
  const storedUser = await useUserStore().loadUser()

  if (storedUser === null) {
    throw Error("Only use this hook when the user is logged in!")
  }

  return storedUser
}
