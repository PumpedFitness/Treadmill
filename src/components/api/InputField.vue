<script setup lang="ts">
import { Field } from 'vee-validate'
import { Icon } from '@iconify/vue'

defineProps<{
  name: string
  label: string
  icon?: string
  type: string
}>()
</script>

<template>
  <Field class="flex flex-col w-full" :name="name" as="div" v-slot="{ field, errorMessage }">
    <label :class="['input input-lg', { 'input-error': errorMessage }]">
      <template v-if="icon !== undefined">
        <Icon :icon="icon" class="size-5" />
      </template>

      <input v-bind="field" class="grow" required :type="type" :placeholder="label" />
    </label>
    <template v-if="errorMessage">
      <p class="text-sm text-error">{{errorMessage}}</p>
    </template>
  </Field>

</template>

<style scoped>
label {
  transition: border 200ms ease-in-out;
}
</style>
