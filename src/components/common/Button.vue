<script setup lang="ts">

defineProps<{
  isDisabled?: boolean
  isLoading?: boolean
}>()

</script>

<template>
  <template v-if="isLoading">
    <button class="btn">
      <span class="loading loading-spinner"/>
      <slot/>
    </button>
  </template>
  <template v-else>
    <button :class="['btn', { 'btn-disabled': isDisabled }]">
      <slot/>
    </button>
  </template>
</template>

<style scoped>

</style>
