<script setup>
const email = ref('me@example.com')
const password = ref('testPassword')
const name = ref('John Doe')
const { signup, login } = useAppwriteAccount()

async function submit() {
  const res = await signup(email.value, password.value, name.value)

  if (res?.error)
    throw res.error

  await login(email.value, password.value)
}
</script>

<template>
  <div>
    <h1>Sign up</h1>

    <form flex-center-col :on-submit="submit">
      <input id="email" name="email" placeholder="Email" type="email">
      <input id="password" name="password" placeholder="Password" type="password">
      <button type="submit" btn>
        Sign up
      </button>
    </form>

    <form action="/api/oauth" method="post" btn my12>
      <input type="hidden" name="provider" value="github">
      <button type="submit">
        Sign up with GitHub
      </button>
    </form>
  </div>
</template>
