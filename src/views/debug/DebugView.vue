<script setup lang="ts">

import Button from '@/components/common/Button.vue'
import { sampleNotification } from '@/util/notifications.ts'
import { useUserStore } from '@/stores/user-store.ts'
import router from '@/router'
import { ref, watch } from 'vue'
import { useWebsocket } from '@/util/websocket.ts'

const websocketResponse = ref<string[]>([])
const websocketStatus = ref()

const sendNotification = () => {
  sampleNotification()
}

const logout = () => {
  useUserStore().storeUser(null)
  router.push({ name: "login" })
}

const connectWithWebsocket = () => {
  const { status } = useWebsocket()
  websocketStatus.value = status.value
}

</script>

<template>
  <div class="flex flex-col gap-2 flex-1 items-center">
    <p>Devins super duper debug menu</p>
    <Button @click="sendNotification">Create notification</Button>
    <Button @click="logout" class="btn-error">Logout</Button>
    <Button @click="connectWithWebsocket" class="btn-warning">Connect to websocket</Button>
    <span class="alert alert-warning">{{ websocketStatus }}</span>
    <p>Websocket response:</p>
    <span v-for="message in websocketResponse" :key="message" class="alert alert-warning">{{ message }}</span>

  </div>
</template>

<style scoped>

</style>
