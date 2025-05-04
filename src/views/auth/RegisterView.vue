<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import router from '@/router'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import InputField from '@/components/api/InputField.vue'
import { getSubmitFn, transformFieldErrors } from '@/util/util.ts'
import { useUnauthenticatedAPI } from '@/hooks/useAPI.ts'
import type { User } from '@/types/user.ts'
import Button from '@/components/common/Button.vue'
import { loginUser } from '@/actions/login-user.ts'

const { isLoading, execute } = useUnauthenticatedAPI<User>('/api/v1/user/register', 'post', 201)

const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.string().min(8),
})

const onSubmit = getSubmitFn(signUpSchema, async (values, ctx) => {
  const res = await execute(values)

  if (res.fields.length > 0) {
    ctx.setErrors(transformFieldErrors(res.fields))
  }

  const result = await loginUser(values.email, values.password)

  if (result !== null) {
    await router.push("/")
  }
})
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col gap-4 max-w-3xs w-full">
      <p class="text-center font-thin text-xl">Create a new account</p>

      <Form
        :validation-schema="toTypedSchema(signUpSchema)"
        class="flex flex-col gap-2 items-center"
        @submit="onSubmit"
      >
        <InputField name="email" label="Email" type="email" icon="solar:letter-linear" />
        <InputField name="username" label="Username" type="text" icon="solar:user-outline" />
        <InputField
          name="password"
          label="Password"
          type="password"
          icon="solar:lock-password-linear"
        />

        <Button :is-loading="isLoading" type="submit" class="btn w-full btn-success">Create account</Button>
      </Form>
      <div class="divider" />

      <Button @click="router.push('login')" class="btn">I already have an account</Button>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
