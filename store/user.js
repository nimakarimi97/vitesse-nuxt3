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
      const res = await account.createOAuth2Session('google')
      currentUser.value = await account.get()
      return { error: undefined, data: res }
    }
    catch (err) {
      return { error: err.message, data: undefined }
    }
  }

  return {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
  }
})
