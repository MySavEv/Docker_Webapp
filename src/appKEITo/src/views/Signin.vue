<script setup>
import { computed, ref } from 'vue'
import { swSuccess , swFail, swLoading} from '../util/sweetalert';
import Swal from 'sweetalert2'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const apiurl = import.meta.env.VITE_API_NAMESERVER


const username = ref('');
const password = ref('');

let timerInterval;

const login = async (event)=>{
    event.preventDefault();

    console.log(event.target);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username : username.value,
        password : password.value
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try {
        const resmember = await fetch(`${apiurl}/api/login/member`, requestOptions);
        
        if(resmember.status == 400){
            const resemployee = await fetch(`${apiurl}/api/login/employee`, requestOptions);
            if(resemployee.status == 400){
                swFail()
            }else{
            const result = await resemployee.json();
            if(result.status == 'Success'){
                const token = result.data.token
                localStorage.setItem('token',token)
                swSuccess('Login Success!!').then(value=>{
                    swLoading(1000).then(v=>{
                        console.log(result);
                        if(result.data.managerflag){
                            router.push({name: 'manager'})
                        }else{
                            router.push({name: result.data.type})
                        }
                    })
                    
                })
            }else{
                swFail()
            }
        }
        }else{
            const result = await resmember.json();
            if(result.status == 'Success'){
                const token = result.data.token
                localStorage.setItem('token',token)
                swSuccess('Login Success!!').then(value=>{
                    swLoading(1000).then(v=>{
                        console.log(result);
                        router.push({name: result.data.type})
                    })
                    
                })
            }else{
                swFail()
            }
            }
    } catch (error) {
        swFail()
    }
    }
    
</script>

<template>
    <div class="login-page">
        <div class="item1">
        </div>

        <div class="item2">
            <p id="topic-line-1">Sign In</p>
            <p id="topic-line-2">To Your Account</p>
            <form @submit.prevent="login" class="input-box">
                <label id="input-1-text">Email/Phone</label>
                <input v-model="username" type="text" id="studentId" class="input-1" placeholder="NatEiEi">
                <label id="input-2-text">Password</label>
                <input v-model="password" type="password" id="password" class="input-2" placeholder="******">
                <button type="submit" class="button-18" role="button">SignIn</button>
            </form>
            <router-link to="signup" class="button-18">Signup</router-link>
        </div>
        
    </div>
</template>

<style scoped>

/* CSS */
    .input-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #topic-line-1 {
        font-weight: bolder;
        color: #614f3b;
        font-size: 40px;
        white-space: nowrap;
        font-family: 'DelmonDelicate';
        text-align: center;
        letter-spacing: 0;
        line-height: normal;
        cursor: pointer;
    }

    .input-1 , .input-2{
        font-family: 'DelmonDelicate';
        font-weight: normal;
        font-size: 0.9em;
        background: #fff;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .1);
        color: #000000;
        padding: 10px;
        border: none;
        width: 100%;
        height: 3.5rem;
    }


    #topic-line-2 {
        top: 65px;
        font-weight: 700;
        color: #c6a98a;
        font-size: 20px;
        white-space: nowrap;
        font-family: 'DelmonDelicate';
        text-align: center;
        letter-spacing: 0;
        line-height: normal;
        cursor: pointer;
        margin-bottom: 1.5rem;
    }

    #input-1-text {
        font-weight: 400;
        color: #000000;
        font-size: 18px;
        font-family: 'DelmonDelicate';
        margin-bottom: 0.5rem;
    }


    #input-2-text {
        font-weight: 400;
        color: #000000;
        font-size: 18px;
        font-family: 'DelmonDelicate';
        margin-bottom: 0.5rem;
    }

    .item2 input{
        display: block;
        width: 95%;
        margin-bottom: 1rem;
    }

    .item2 {
        padding: 1rem;
    }

    .item1{
        background-image: url('../assets/asset/ad0.png');
        background-size: cover;
    }

    .button-18 {
        width: 100%;
        margin-top: 1rem;
        align-items: center;
        background-color: rgb(223, 175, 94);
        border: 0;
        border-radius: 100px;
        box-sizing: border-box;
        color: #ffffff;
        cursor: pointer;
        display: inline-flex;
        font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
        line-height: 20px;

        min-height: 40px;
        min-width: 0px;
        overflow: hidden;
        padding: 0px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        touch-action: manipulation;
        transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        user-select: none;
        -webkit-user-select: none;
        vertical-align: middle;
    }

    .button-18:hover,
    .button-18:focus { 
        background-color: rgb(230, 169, 65);
        color: #ffffff;
    }

    .button-18:active {
    background: #09223b;
    color: rgb(255, 255, 255, .7);
    }

    .button-18:disabled { 
    cursor: not-allowed;
    background: rgba(0, 0, 0, .08);
    color: rgba(0, 0, 0, .3);
    }

    .login-page {
        background-color: #f1f1f3;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 100vh;
        padding: 5rem;
    }

    .login-page div{
        width: 100%
    }

    .login-page .item1{
        width: 75%;
        background-color: antiquewhite;
    }

    .login-page .item2{
        background-color: white;
        min-width: 300px;
        width: 25%;
        position: relative;
    }



</style>
