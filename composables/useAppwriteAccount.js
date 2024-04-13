export function useAppwriteAccount() {
  const { account } = useAppwrite()
  const currentUser = ref(null)

  account.getSession('current').then((user) => {
    currentUser.value = user
  })

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

      // navigateTo('/tasks')

      return { error: undefined, data: res }
    }
    catch (err) {
      return { error: err.message, data: undefined }
    }
  }

  async function logout() {
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
