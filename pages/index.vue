<script setup>
import { useUserStore } from '~/store/user'

const online = useOnline()
const userStore = useUserStore()
console.log('🚀 ~ userStore:', userStore.currentUser)
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>

      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>

    <InputEntry />

    <div v-if="userStore.currentUser">
      Logged in as {{ userStore.currentUser.name
        || userStore.currentUser.email
        || userStore.currentUser.providerUid
      }}
    </div>
  </div>
</template>
