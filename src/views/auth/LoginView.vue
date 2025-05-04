<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import router from '@/router'
import { useUnauthenticatedAPI } from '@/hooks/useAPI.ts'
import type { User } from '@/types/user.ts'
import { z } from 'zod'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { getSubmitFn } from '@/util/util.ts'
import InputField from '@/components/api/InputField.vue'
import Button from '@/components/common/Button.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user-store.ts'

const { isLoading, execute } = useUnauthenticatedAPI<User>('/api/v1/user/login', 'post', 200)
const error = ref("")

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const login = getSubmitFn(loginSchema, async (values) => {
  error.value = ""
  const result = await execute(values)

  if (result.code !== 200) {
    error.value = "The given credentials do not match our entries!"
    return
  }

  await useUserStore().storeUser(result.data!)

  await router.push("/home")

})
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col gap-4 max-w-3xs w-full">
      <p class="text-center font-thin text-xl">LOGIN</p>

      <Form
        :validation-schema="toTypedSchema(loginSchema)"
        class="flex flex-col gap-2"
        @submit="login"
      >
        <InputField name="email" label="Email" type="email" icon="solar:letter-linear" />
        <InputField
          name="password"
          label="Password"
          type="password"
          icon="solar:lock-password-linear"
        />

        <Button :is-loading="isLoading" type="submit" class="btn w-full btn-success">Login</Button>

        <div role="alert" class="alert alert-error" v-if="error.length > 0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ error }}</span>
        </div>
      </Form>

      <div class="divider">OR</div>

      <button @click="router.push('register')" class="btn">Create an account</button>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
