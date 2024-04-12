// import { Account, Client, Databases, ID } from 'appwrite'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // const databases = new Databases(client)

  // Access public variables
  //   const result = await $fetch(`/task`, {
  //     baseURL: config.public.apiBase,
  //   })

  return config
})
