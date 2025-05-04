<script setup lang="ts">

import { useUser } from '@/hooks/useUser.ts'
import { onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'

const user = ref<User | null>(null)

onMounted(async () => {
  user.value = await useUser()
})

</script>

<template>
  <p class="text-center">Willkommen {{ user?.username }}</p>
</template>

<style scoped>

</style>
