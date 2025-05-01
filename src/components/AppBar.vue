<script setup lang="ts">

import { Icon } from '@iconify/vue'
import type { AppRoute } from '@/types/app-route.ts'
import router from '@/router'

const routes = [
  {
    name: "home",
    icon: "solar:home-2-linear"
  }
] as AppRoute[]

const isActive = (route: string): boolean => {
  const currentRoute = router.currentRoute.value

  return currentRoute.name === route
}

</script>

<template>
  <div class="w-full px-4">
    <div class="flex items-center justify-center shadow-md max-h-12 w-full p-4 bg-base-300 rounded-full">
      <div v-for="route in routes" :key="route.name" >
        <Icon :icon="route.icon" class="size-7" :class="{ 'text-success': isActive(route.name) }"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
