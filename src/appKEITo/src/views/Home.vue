<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate ,RouterLink} from 'vue-router'

console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.VITE_API_NAMESERVER) // undefined

</script>

<template>
  <router-link to="signin">sadsdaasdasdasd</router-link>
</template>

<style scoped>


</style>
