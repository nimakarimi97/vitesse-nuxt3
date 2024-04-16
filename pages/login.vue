<script setup>
import { useUserStore } from '~/store/user'

const userStore = useUserStore()

const email = ref('me@example.com')
const password = ref('testPassword')

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

    <div v-if="!userStore.currentUser" flex-center-col mb8>
      <input v-model=" email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">

      <button v-if="!userStore.currentUser" btn type="button" @click="doLogin(email, password)">
        Login
      </button>

      <span>
        Haven't got an account?

        <NuxtLink to="/signup" underline>Sign up</NuxtLink>
      </span>

      <div flex-center-col>
        <button type="button" flex-center btn bg-white text-black @click="userStore.loginWithGoogle">
          <div i-carbon:logo-google />
          Sign in with Google
        </button>

        <button type="button" flex-center btn bg-white text-black @click="userStore.loginWithGitHub">
          <div i-carbon:logo-github />
          Sign in with GitHub
        </button>
      </div>
    </div>

    <button v-else mx-auto btn flex-center gap1 bg-red-8 hover:bg-red-9 type="button" @click="userStore.logout">
      <div i-carbon:logout />
      Logout
    </button>
  </div>
</template>
