<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col flex-1 bg-base-100 w-screen">
    <RouterView v-slot="{ Component }">
      <Transition name="slide-left" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.slide-left-enter-from {
  transform: translateX(-30%);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>
