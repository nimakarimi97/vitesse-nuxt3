<script setup>
const online = useOnline()

const currentUser = ref(null)
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

    <div v-if="currentUser">
      Logged in as {{ currentUser.name }}
    </div>
  </div>
</template>
