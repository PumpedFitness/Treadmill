<script setup lang="ts">

import Button from '@/components/common/Button.vue'
import { sampleNotification } from '@/util/notifications.ts'
import { useUserStore } from '@/stores/user-store.ts'
import router from '@/router'

const sendNotification = () => {
  sampleNotification()
}

const logout = () => {
  useUserStore().storeUser(null)
  router.push({ name: "login" })
}

</script>

<template>
  <div class="flex flex-col gap-2 flex-1 items-center">
    <p>Devins super duper debug menu</p>
    <Button @click="sendNotification">Create notification</Button>
    <Button @click="logout" class="btn-error">Logout</Button>
  </div>
</template>

<style scoped>

</style>
