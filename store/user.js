import { defineStore } from 'pinia'
import { useAppwrite } from '@/composables/useAppwrite'

export const useUserStore = defineStore('user', () => {
  const { account } = useAppwrite()
  const currentUser = ref(null)
  const error = ref(null)

  async function init() {
    try {
      // const session = await account.get()
      const user = await account.get()

      if (user)
        currentUser.value = user
    }
    catch (err) {
      error.value = `Failed to fetch current session: ${err.message}`
      throw err
    }
  }

  init()

  async function signup(email, password, name) {
    try {
      const res = await account.create(
        'unique()',
        email,
        password,
        name,
      )
      return res
    }
    catch (err) {
      error.value = `Signup failed: ${err.message}`
      throw err
    }
  }

  async function login(email, password) {
    try {
      const res = await account.createEmailSession(email, password)
      currentUser.value = await account.get()
      console.log('🚀 ~ login ~ currentUser.value:', currentUser.value)
      return res
    }
    catch (err) {
      error.value = `Logout failed: ${err.message}`
      throw err
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current')
      currentUser.value = null
    }
    catch (err) {
      error.value = `Logout failed: ${err.message}`
      throw err
    }
  }

  async function loginWithGoogle() {
    try {
      await account.createOAuth2Session('google', 'http://localhost:3000', 'http://localhost:3000/login')
    }
    catch (err) {
      console.error('Error signing in with Google:', err)
    }
  }

  async function loginWithGitHub() {
    try {
      await account.createOAuth2Session('github', 'http://localhost:3000', 'http://localhost:3000/login')
    }
    catch (err) {
      console.error('Error signing in with GitHub:', err)
    }
  }

  return {
    currentUser,
    init,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithGitHub,
  }
})
