<script setup lang="ts">

import AppBar from '@/components/AppBar.vue'
</script>

<template>
  <div class="flex flex-col flex-1 justify-between">
    <div class="p-2">
      <RouterView v-slot="{ Component }">
        <Transition name="slide-left" mode="out-in">
          <component :is="Component"/>
        </Transition>
      </RouterView>
    </div>
    <AppBar/>
  </div>
</template>

<style scoped>

</style>
