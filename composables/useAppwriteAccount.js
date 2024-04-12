export function useAppwriteAccount() {
  const { account } = useAppwrite()
  const currentUser = ref(null)

  async function signup(email, password, name) {
    try {
      const res = await account.create(
        'unique()',
        email,
        password,
        name,
      )
      return { error: undefined, data: res }
    }
    catch (err) {
      return { error: err.message, data: undefined }
    }
  }

  async function login(email, password) {
    try {
      const res = await account.createEmailSession(email, password)
      currentUser.value = await account.get()

      return { error: undefined, data: res }
    }
    catch (err) {
      return { error: err.message, data: undefined }
    }
  }

  async function logout(email, password) {
    try {
      await account.deleteSession('current')

      currentUser.value = null
      
      return { error: undefined, data: response }
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
  }
}
