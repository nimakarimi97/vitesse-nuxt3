<template>
  <div text="xl gray4" m-5 flex="~ gap3" justify-center>
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/nimakarimi97/vitesse-nuxt3" target="_blank" />
    <DarkToggle />

    <NuxtLink i-carbon:task to="/tasks" />
    <NuxtLink i-carbon-login to="/login" />
  </div>
</template>
