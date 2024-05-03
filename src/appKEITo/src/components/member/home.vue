<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
const apiurl = import.meta.env.VITE_API_NAMESERVER

</script>

<template>
    <div>
        <img src="@assets/asset/ad0.png" alt="">
        <img src="@assets/asset/ad1.png" alt="">
        <img src="@assets/asset/ad2.png" alt="">
        <img src="@assets/asset/ad3.png" alt="">
        <img src="@assets/asset/ad4.png" alt="">
    </div>
</template>

<style scoped>

div{
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    width: 75%;
    margin-bottom: 1rem;
}

</style>
