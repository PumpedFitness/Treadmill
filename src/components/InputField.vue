<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
import { Icon } from '@iconify/vue'

defineProps<{
  name: string
  label: string
  icon?: string
  type: string
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <Field class="input input-lg" :name="name" as="label" v-slot="{ value }">
      <template v-if="icon !== undefined">
        <Icon :icon="icon" class="size-5" />
      </template>

      <input v-bind="value" class="grow" required :type="type" :placeholder="label" />

      <ErrorMessage :name="name" />
    </Field>
  </div>
</template>

<style scoped></style>
