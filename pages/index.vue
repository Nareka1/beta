<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h1>ini home</h1>
  <!-- <div>
    <h1>home</h1>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank"
      >Learn more about Nuxt Routing</a
    >
  </div> -->
  <div class="flex flex-wrap">
    <NuxtLink class="border-2 border-zinc-700" to="/">home</NuxtLink>
    <NuxtLink class="border-2 border-zinc-700" to="/notes">notes</NuxtLink>
  </div>
</template>
