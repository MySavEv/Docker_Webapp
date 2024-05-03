<script setup>
import { onBeforeMount, ref } from 'vue'
import member_nav  from '../components/nav/member_nav.vue'
import meenu  from '../components/member/menu.vue'
import point  from '../components/member/point.vue'
import acc  from '../components/member/account.vue'
import homee  from '../components/member/home.vue'
import Swal from 'sweetalert2'
import { useRouter, useRoute } from 'vue-router'
import { swSuccess , swFail, swLoading} from '../util/sweetalert';

const apiurl = import.meta.env.VITE_API_NAMESERVER
const router = useRouter()
const route = useRoute()
const selectmenu = ref('home') // ['home','menu','point', 'myacc']


onBeforeMount(()=>{
  const token = localStorage.getItem("token")
  if(!token){
    swFail("Plese Login")
                .then(v=>{
                    localStorage.removeItem('token')
                    router.push({name: 'signin'})
                })
    return
  }
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
  };

  fetch(`${apiurl}/api/verify`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
      if(result.status == 'Success'){
        
      }else{
        swFail("Plese Login")
                .then(v=>{
                    localStorage.removeItem('token')
                    router.push({name: 'signin'})
                })
      }
  })
  .catch((error) => console.error(error));
})



</script>

<template>
  <member_nav @click="()=>{console.log(selectmenu)
  }" @clickmenu="(menu)=>{
    selectmenu = menu
  }"/>

  <div class="container">
    <homee v-if="selectmenu == 'home'"/>
    <meenu v-if="selectmenu == 'menu'" />
    <point v-if="selectmenu == 'point'" />
    <acc v-if="selectmenu == 'myacc'" />

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
