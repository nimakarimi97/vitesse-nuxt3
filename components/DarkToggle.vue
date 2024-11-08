<script setup>
const color = useColorMode()
const { account } = useAppwrite()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

onMounted(() => {
  account.getPrefs().then(res => color.preference = res?.theme)
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'

  account.updatePrefs({ theme: color.preference })
}

// onMounted(async () => {
//   const promise = account.getPrefs()

//   promise.then((res) => {
//     color.preference = res?.theme
//   }, (error) => {
//     console.error(error)
//   })
// })
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>
