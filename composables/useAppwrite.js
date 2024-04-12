import { Account, Client, Databases } from 'appwrite'

const accountRef = ref()

export function useAppwrite() {
  const config = useRuntimeConfig()

  const client = new Client()

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(config.public.APPWRITE_PROJECT_ID)

  accountRef.value = new Account(client)

  return {
    account: accountRef.value,

  }
}
