<script setup>
const email = ref('me@example.com')
const password = ref('testPassword')
const name = ref('John Doe')
const error = ref('')
const { signup, login } = useAppwriteAccount()

async function submit() {
  const res = await signup(email.value, password.value, name.value)

  if (res?.error) {
    error.value = res.error
    throw res.error
  }

  await login(email.value, password.value)
  navigateTo('/')
}
</script>

<template>
  <div>
    <h1>Sign up</h1>

    <div v-if="error" text-red-500 text-sm my-2>
      <span font-bold>
        Error: {{ error }}</span>
    </div>

    <form flex-center-col>
      <input id="email" v-model="email" placeholder="Email" type="email">
      <input id="password" v-model="password" placeholder="Password" type="password">
      <input v-model="name" type="text" placeholder="Name">

      <button type="button" btn @click="submit">
        Sign up
      </button>
    </form>

    <form action="/api/oauth" method="post" btn my12>
      <input type="hidden" name="provider" value="github">
      <button type="button">
        Sign up with GitHub
      </button>
    </form>
  </div>
</template>
