import type { NavigationGuardReturn, RouteLocationNormalizedGeneric } from 'vue-router'
import { isBackendReachable } from '@/util/axios.ts'

const requiresNetworkConnection = [ "home" ]

export const middleware = async (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric): Promise<NavigationGuardReturn> => {

  if (requiresNetworkConnection.includes(to.name?.toString() ?? "")) {
    const hasBackendConnection = await isBackendReachable()

    if (!hasBackendConnection) {
      return { name: "maintenance" }
    }
  }



}
