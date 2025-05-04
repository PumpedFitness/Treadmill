<script setup lang="ts">

import AuthLayout from '@/layouts/AuthLayout.vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col gap-4">
      <p class="text-center font-thin text-xl">LOGIN</p>

      <div class="flex flex-col gap-2">
        <label class="input input-lg">
          <Icon icon="solar:letter-linear" class="size-5"/>
          <input class="grow" type="text" placeholder="Email" autocomplete="email"/>
        </label>

        <label class="input input-lg">
          <Icon icon="solar:lock-password-linear" class="size-5"/>
          <input class="grow" type="text" placeholder="Password" autocomplete="email"/>
        </label>
      </div>

      <button class="btn btn-success">Login</button>

      <div class="divider">OR</div>

      <button @click="router.push('register')" class="btn">Create an account</button>

    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
