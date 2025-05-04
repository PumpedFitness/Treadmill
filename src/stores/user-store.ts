import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { User } from '@/types/user.ts'
import { Preferences } from '@capacitor/preferences'

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)

  const loadUser = async (): Promise<User | null> => {
    const storedUser = await Preferences.get({ key: "user" })

    if (storedUser.value === null) {
      return null
    }

    return JSON.parse(storedUser.value)
  }

  const storeUser = async (user: User | null) => {
    await Preferences.set({ key: "user", value: JSON.stringify(user) })
  }

  watch(user, async (val) => {
    await storeUser(val)
  })

  return { loadUser, storeUser }
})
