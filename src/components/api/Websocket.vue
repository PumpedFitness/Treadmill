<script setup lang="ts">

import { provide } from 'vue'
import { useWebsocket } from '@/util/websocket.ts'
import { isNotification } from '@/types/notification.ts'
import { notifyNow } from '@/util/notifications.ts'

const ws = useWebsocket()
ws.connect()
provide('websocket', ws)

ws.onReceive("root", (response) => {
  console.log("Received", response)
  if (isNotification(response)) {
    notifyNow(response.title, response.body)
  }
})

</script>

<template>
  <slot></slot>
</template>

<style scoped>

</style>
