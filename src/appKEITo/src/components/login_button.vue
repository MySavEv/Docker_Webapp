<script setup>
import { ref } from 'vue';


import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

function logout(e) {
  localStorage.removeItem('token')
  router.push({name: "signin"})
}

</script>

<template>
    <button @click="logout" class="button-34" role="button">SignIn</button>
</template>

<style scoped>


/* CSS */
.button-34 {
  background: #C1855A;
  border-radius: 999px;
  box-shadow: #ffb570 0 10px 20px -10px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 21px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
}
</style>
