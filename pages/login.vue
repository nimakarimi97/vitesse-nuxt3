<script setup>
const { login, logout, currentUser } = useAppwriteAccount()

const email = ref('me@example.com')
const password = ref('testPassword')

onMounted(() => {
  if (currentUser.value)
    console.log('🚀 ~ //onMounted ~ currentUser.value:', currentUser.value)
    // doLogin(email.value, password.value)
})

async function doLogin(email, password) {
  const loginResp = await login(email, password)

  if (loginResp?.error)
    throw loginResp.error
}
</script>

<template>
  <div>
    <p py-4>
      {{ currentUser ? `Logged in as ${currentUser.name}` : 'Not logged in' }}
    </p>

    <form flex-center-col mb8>
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">

      <button v-if="!currentUser" btn type="button" @click="doLogin(email, password)">
        Login
      </button>

      <button v-else btn bg-red type="button" @click="logout">
        Logout
      </button>
    </form>

    <span>
      Haven't got an account?

      <NuxtLink to="/signup" underline>Sign up</NuxtLink>
    </span>
  </div>
</template>
