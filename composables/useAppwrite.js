import { Account, Client } from 'appwrite'

const accountRef = ref()

export function useAppwrite() {
  const config = useRuntimeConfig()

  const client = new Client()

  client
    .setEndpoint(config.public.APPWRITE_ENDPOINT)
    .setProject(config.public.APPWRITE_PROJECT_ID)

  accountRef.value = new Account(client)

  return {
    account: accountRef.value,
    client,
  }
}
