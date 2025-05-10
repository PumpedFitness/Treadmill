<script setup lang="ts">

import { provide } from 'vue'
import { useWebsocket } from '@/util/websocket.ts'

const ws = useWebsocket()
ws.connect()
provide('websocket', ws)


</script>

<template>
  <slot></slot>
</template>

<style scoped>

</style>
