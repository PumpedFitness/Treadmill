import type { NavigationGuardReturn, RouteLocationNormalizedGeneric } from 'vue-router'
import { isBackendReachable } from '@/util/axios.ts'
import { useUserStore } from '@/stores/user-store.ts'

const requiresNetworkConnection = [ "home" ]
const requiresAuth = [ "home" ]

export const middleware = async (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric): Promise<NavigationGuardReturn> => {

  const routeTo = to.name?.toString() ?? ""

  if (requiresNetworkConnection.includes(routeTo)) {
    const hasBackendConnection = await isBackendReachable()

    if (!hasBackendConnection) {
      return { name: "maintenance" }
    }
  }

  if (requiresAuth.includes(routeTo)) {
    const user = await useUserStore().loadUser()

    if (user === null) {
     return { name: "login" }
    }
  }

}
