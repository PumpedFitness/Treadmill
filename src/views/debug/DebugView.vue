<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import { notifyNow } from '@/util/notifications.ts'
import { useUserStore } from '@/stores/user-store.ts'
import router from '@/router'
import type { BBWebsocket } from '@/util/websocket.ts'
import { inject } from 'vue'
import { buildAction } from '@/types/action.ts'


const websocket = inject<BBWebsocket>('websocket')

const sendNotification = () => {
  notifyNow("Yippiii!", "this is working")
}

const logout = () => {
  useUserStore().storeUser(null)
  router.push({ name: 'login' })
}

const sendActionToWS = () => {
  console.log("sending action now!")
  websocket?.sendWithReceive(buildAction({}, "/api/v1/me"), (notification) => {
    console.log("Received", notification)
    notifyNow("Yippiii!", JSON.stringify(notification))
  })
}

websocket?.onReceive("debug", () => {
  console.log("here")
  notifyNow("Yippiii!", "This has worked")
})



</script>

<template>
  <div class="flex flex-col gap-2 flex-1 items-center">
    <p>Devins super duper debug menu</p>
    <Button @click="sendNotification">Create notification</Button>
    <Button @click="logout" class="btn-error">Logout</Button>
    <span class="alert alert-warning">Websocket {{ websocket?.status }}</span>
    <Button @click="sendActionToWS">Send sample Action to Websocket</Button>

  </div>
</template>

<style scoped></style>
