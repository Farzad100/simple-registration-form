<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
    <section
      class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
    >
      <div class="p-6 bg-sky-100 rounded">
        <RouterView />
      </div>
    </section>
  </div>
</template>
