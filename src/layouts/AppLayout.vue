<script setup lang="ts">

import AppBar from '@/components/AppBar.vue'
</script>

<template>
  <div class="flex flex-col p-2 flex-1 justify-between">
    <div>
      <slot/>
    </div>
    <AppBar/>
  </div>
</template>

<style scoped>

</style>
