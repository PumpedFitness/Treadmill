<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import { useUserStore } from '@/stores/user-store.ts'
import router from '@/router'
import type { BBWebsocket } from '@/util/websocket.ts'
import { inject, onMounted, ref } from 'vue'
import type { OnlineUser } from '@/types/online-user.ts'
import { buildAction } from '@/types/action.ts'
import type { ListUsersResponse } from '@/types/responses/user-responses.ts'
import OnlineUserProfile from '@/components/common/user/OnlineUserProfile.vue'

const websocket = inject<BBWebsocket>('websocket')
const onlineUsers = ref<OnlineUser[]>([])

const logout = () => {
  useUserStore().storeUser(null)
  router.push({ name: 'login' })
}

onMounted(() => {
  websocket?.sendWithReceive(buildAction({}, '/api/v1/list_users'), (response) => {
    onlineUsers.value = (response as ListUsersResponse).users
  })
})



const sendMessageToUser = (user: OnlineUser) => {
  websocket?.send(buildAction({ userID: user.id }, "/api/v1/notify_user"))
}

</script>

<template>
  <div class="flex flex-col gap-2 flex-1 items-center">
    <p>Devins super duper debug menu</p>
    <Button @click="logout" class="btn-error">Logout</Button>
    <span class="alert alert-warning">Websocket {{ websocket?.status }}</span>

    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">User currently online</li>

      <li class="flex list-row justify-between" v-for="user in onlineUsers" :key="user.id">
        <OnlineUserProfile :user="user"/>
        <button @click="sendMessageToUser(user)" class="btn btn-sm w-32">Send message</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
