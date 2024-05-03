<script setup>
import { ref } from 'vue'
import manager_nav  from '../components/nav/manager_nav.vue'
import homee  from '../components/employee/home.vue'
import meenu  from '../components/employee/menu.vue'
import acc  from '../components/employee/account.vue'
import ingredient  from '../components/manager/ingredient.vue'
import stock  from '../components/manager/stock.vue'


import { useRouter, useRoute } from 'vue-router'
import { swSuccess , swFail, swLoading} from '../util/sweetalert';

const apiurl = import.meta.env.VITE_API_NAMESERVER
const router = useRouter()
const route = useRoute()
const selectmenu = ref('home') // ['home','menu','point', 'myacc']
</script>

<template>
  <manager_nav @click="()=>{console.log(selectmenu)
  }" @clickmenu="(menu)=>{
    selectmenu = menu
  }" />

  <div class="container">
    <homee v-if="selectmenu == 'home'"/>
    <meenu v-if="selectmenu == 'menu'" />
    <acc v-if="selectmenu == 'myacc'" />
    <ingredient v-if="selectmenu == 'ingredient'" />
    <stock v-if="selectmenu == 'stock'" />
  </div>

</template>

<style scoped>
  .container {
    display: flex;
    height: fit-content;
    margin: 3rem;
    padding: 3rem;
    flex-direction: column;
  }
</style>
