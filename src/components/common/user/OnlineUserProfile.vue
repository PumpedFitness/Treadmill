<script setup lang="ts">
import type { OnlineUser } from '@/types/online-user.ts'
import DefaultAvatar from '@/components/common/user/DefaultAvatar.vue'
import { onMounted, ref } from 'vue'
import type { User } from '@/types/user.ts'
import { useUser } from '@/hooks/useUser.ts'

defineProps<{
  user: OnlineUser
}>()

const currentUser = ref<User>()
onMounted(async () => currentUser.value = await useUser())

</script>

<template>
  <div class="flex items-center">
    <img class="size-10 rounded-box" v-if="user.profilePicture" :src="user.profilePicture" :alt="user.username"/>
    <DefaultAvatar class="size-8" v-else/>

    <p class="text-xs">{{ user.username }}{{ currentUser?.username === user.username ? ' (You)' : '' }}</p>
    <p>{{ user.description }}</p>
  </div>
</template>

<style scoped>

</style>
