<script setup lang="ts">

import Button from '@/components/common/Button.vue'
import { sampleNotification } from '@/util/notifications.ts'

const sendNotification = () => {
  sampleNotification()
}

</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <p>Devins super duper debug menu</p>
    <Button @click="sendNotification">Create notification</Button>
  </div>
</template>

<style scoped>

</style>
