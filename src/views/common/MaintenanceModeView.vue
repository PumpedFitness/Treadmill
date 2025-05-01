<script setup lang="ts">

import { isBackendReachable } from '@/util/axios.ts'
import router from '@/router'
import { onMounted } from 'vue'

const pingBackend = async () => {
  const backendReachable = await isBackendReachable()

  if (backendReachable) {
    await router.push("/")
  }
}

onMounted(() => {
  setInterval(pingBackend, 5000)
})
</script>

<template>
  <div class="flex flex-col flex-1 gap-2 content-center items-center justify-center">
    <span class="loading loading-spinner loading-xl"></span>
    <p class="px-4 text-center">Pumped is currently not reachable, please try again later</p>
  </div>
</template>

<style scoped>

</style>
