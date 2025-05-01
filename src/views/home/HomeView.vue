<script setup lang="ts">

import { useUser } from '@/hooks/useUser.ts'
import { onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'
import AppLayout from '@/layouts/AppLayout.vue'

const user = ref<User | null>(null)

onMounted(async () => {
  user.value = await useUser()
})

</script>

<template>
  <AppLayout>
    <p>this is the home</p>
    <p>Welcome back {{user?.username ?? "gooner"}}</p>
  </AppLayout>
</template>

<style scoped>

</style>
