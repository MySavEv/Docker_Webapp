<script setup>
import { ref } from 'vue';
import logout from './logout_button.vue'
</script>

<template>


    <div class="header">
        <img class="logo" src="../assets/asset/KEI_Tho_Black.png" alt="">
        <nav>
            <ul class="item2">
                <li >Menu</li>
                <li >Ingredient</li>
                <li >My Account</li>
            </ul>
        </nav>
        <p style="margin-left: 1.5rem; margin-right: 1.5rem;">
            <logout/>
        </p>
    </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-size: 20px;
}

.header{
    display:flex;
    justify-content: flex-end;
    background-color:#F5F5F5;
    height: 7rem;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
}

li {
    display: inline-block;
    padding: 0px 30px;
    transition: all 0.3s ease 0s;
}

li:hover{
    cursor: pointer;
    color: #C1855A;
    text-decoration: underline;
    text-decoration-color: #b37346;
}

.logo{
    margin-right: auto;
    height: 100%;
}

</style>
