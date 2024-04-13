<script setup>
const { signup, login, logout, currentUser } = useAppwriteAccount()

const email = ref('me@example.com')
const password = ref('testPassword')
const name = ref('John Doe')

// onMounted(() => {
//   if (currentUser.value)
//     doLogin(email.value, password.value)
// })

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

    <form flex-center-col>
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <input v-model="name" type="text" placeholder="Name">
      <button type="button" @click="doLogin(email, password)">
        Login
      </button>
      <button type="button" @click="navigateTo('/signup')">
        Register
      </button>
      <button type="button" @click="logout">
        Logout
      </button>
    </form>
  </div>
</template>
