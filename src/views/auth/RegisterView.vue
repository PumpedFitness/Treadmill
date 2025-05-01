<script setup lang="ts">

import AuthLayout from '@/layouts/AuthLayout.vue'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { Field, Form } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import InputField from '@/components/InputField.vue'
import { getSubmitFn } from '@/util/util.ts'

const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.string().regex(RegExp("^[a-zA-Z0-9!@#$%^&()\-_=+\[\]\\{}|;:'.,<>/?]$")).min(8)
})

</script>

<template>
  <AuthLayout>
    <div class="flex flex-col gap-4">
      <p class="text-center font-thin text-xl">Create a new account</p>

      <Form :validation-schema="toTypedSchema(signUpSchema)" class="flex flex-col gap-2" >

        <InputField name="email" label="Email" type="email" icon="solar:letter-linear"/>

        <Field class="input input-lg" name="username" as="label" v-slot="{ value }">
          <Icon icon="solar:user-outline" class="size-5"/>
          <input v-bind="value" class="grow" required minlength="3" maxlength="32" type="text" placeholder="Username" autocomplete="email"/>
        </Field>

        <div></div>

        <Field class="input input-lg validator" name="password" as="label" v-slot="{ value }">
          <Icon icon="solar:lock-password-linear" class="size-5"/>
          <input v-bind="value" class="grow" type="password" required minlength="8" maxlength="50" pattern="" placeholder="Password" autocomplete="email"/>
        </Field>

      </Form>

      <button type="submit" class="btn btn-success">Create account</button>


      <div class="divider"/>

      <button @click="router.push('login')" class="btn">I already have an account</button>

    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
