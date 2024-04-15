<script setup>
import { useUserStore } from '~/store/user'

const userStore = useUserStore()

const email = ref('me@example.com')
const password = ref('testPassword')

onMounted(() => {
  if (userStore.currentUser)
    console.log('🚀 ~ //onMounted ~ currentUser.value:', userStore.currentUser)
    // doLogin(email.value, password.value)
})

async function doLogin(email, password) {
  const loginResp = await userStore.login(email, password)

  if (loginResp?.error)
    throw loginResp.error
}
</script>

<template>
  <div>
    <p py-4>
      {{ userStore.currentUser ? `Logged in as ${userStore.currentUser.name
        || userStore.currentUser.email}` : 'Not logged in' }}
    </p>

    <form v-if="!userStore.currentUser" flex-center-col mb8>
      <input v-model=" email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">

      <button v-if="!userStore.currentUser" btn type="button" @click="doLogin(email, password)">
        Login
      </button>

      <span>
        Haven't got an account?

        <NuxtLink to="/signup" underline>Sign up</NuxtLink>
      </span>
    </form>

    <button v-else mx-auto btn flex-center gap1 bg-red-8 hover:bg-red-9 type="button" @click="userStore.logout">
      <div i-carbon:logout />
      Logout
    </button>
  </div>
</template>
