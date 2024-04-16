import { Account, Client, Databases } from 'appwrite'

const accountRef = ref()

export function useAppwrite() {
  const config = useRuntimeConfig()

  const client = new Client()

  client
    .setEndpoint(config.public.APPWRITE_ENDPOINT)
    .setProject(config.public.APPWRITE_PROJECT_ID)

  accountRef.value = new Account(client)
  accountRef.value.updatePrefs({ darkTheme: true, language: 'en' })

  const databases = new Databases(client)

  return {
    account: accountRef.value,
    client,
    databases,
  }
}
