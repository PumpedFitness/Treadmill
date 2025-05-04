<script setup lang="ts">

import { Icon } from '@iconify/vue'
import type { AppRoute } from '@/types/app-route.ts'
import router from '@/router'
import { computed } from 'vue'
import { toTitleCase } from '../util/util.ts'

const routes = [
  {
    name: "training",
    icon: "solar:dumbbell-large-minimalistic-linear"
  },
  {
    name: "home",
    icon: "solar:home-2-linear"
  },
  {
    name: "debug",
    icon: "solar:bug-line-duotone"
  },
] as AppRoute[]

const activeRoute = computed(() => router.currentRoute.value.name?.toString())

</script>

<template>
  <div class="w-full appbar pb-2 bg-base-300">
    <div class="flex gap-12 items-center justify-center px-12 w-full p-4">
      <div @click="router.push({name: route.name})" class="flex flex-col items-center" :class="{ 'text-primary': activeRoute === route.name }" v-for="route in routes" :key="route.name" >
        <Icon :icon="route.icon" class="size-7"/>
        <p class="text-xs">{{ toTitleCase(route.name) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appbar {
 box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)
}

</style>
